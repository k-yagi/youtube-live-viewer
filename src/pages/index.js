import React, { useEffect, useReducer } from 'react';
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import { schedule } from 'node-cron';

import Layout from '../components/layout';
import VideoListContainer from '../containers/videoListContainer';
import PlayingVideoContainer from '../containers/playingVideoContainer';
import { contentsUpdated } from '../modules/contents';

function reducer(state, action) {
  switch (action.type) {
    // action.playingVideoIndex で指定したインデックスの動画を再生
    case 'playVideo':
      return Object.assign({}, state, {
        playingVideoIndex: action.playingVideoIndex,
        playingVideo: state.videoList[action.playingVideoIndex],
      });
    default:
      throw new Error();
  }
}

const Index = ({ data, contentsUpdated, isContentsUpdated }) => {
  const [state, dispatch] = useReducer(reducer, {
    playingVideoIndex: 0,
    videoList: data.allContentsJson.edges,
    playingVideo: null,
  });

  // プレイヤー初期化処理
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      dispatch({ type: 'playVideo', playingVideoIndex: 0 });
    };
  }, []);

  // コンテンツ更新フラグ更新。毎時0分に更新される前提
  // 備考: search_youtube.js
  useEffect(() => {
    schedule('0 * * * *', () => {
      contentsUpdated();
    });

    schedule('2 * * * *', () => {
      if (isContentsUpdated && (window.ytPlayer.getPlayerState() !== window.YT.PlayerState.PLAYING) ) {
        window.location.reload();
      }
    });
  }, [contentsUpdated, isContentsUpdated]);

  return (
    <Layout>
      <PlayingVideoContainer />
      <VideoListContainer />
    </Layout>
  );
};

const mapStateToProps = state => {
  return { isContentsUpdated: state.contents.isContentsUpdated }
}

export default connect(
  mapStateToProps,
  { contentsUpdated }
)(Index);

export const query = graphql`
  query {
    allContentsJson(
      filter: {
        snippet: { liveBroadcastContent: { in: ["upcoming", "live"] } }
      }
    ) {
      edges {
        node {
          videoId
          snippet {
            title
            thumbnails {
              medium {
                height
                width
                url
              }
            }
          }
        }
      }
    }
  }
`;
