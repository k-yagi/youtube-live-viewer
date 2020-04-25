import React, { useEffect, useCallback, useReducer } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import VideoList from '../components/videoList';
import PlayingVideo from '../components/playingVideo';

function reducer(state, action) {
  switch (action.type) {
    // action.playingVideoIndex で指定したインデックスの動画を再生
    case 'playVideo':
      return Object.assign({}, state, {
        playingVideoIndex: action.playingVideoIndex,
        playingVideo: state.videoList[action.playingVideoIndex],
      });
    case 'playNextVideo':
      const index = state.playingVideoIndex + 1;
      return Object.assign({}, state, {
        playingVideoIndex: index,
        playingVideo: state.videoList[index],
      });
    default:
      throw new Error();
  }
}

export default ({ data }) => {
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

  // プレイヤーの動画更新
  useEffect(() => {
    if (window.YT) {
      window.ytPlayer = new window.YT.Player('player', {
        height: '720',
        width: '100%',
        videoId: state.playingVideo.node.videoId,
        events: {
          onReady: event => {
            event.target.playVideo();
          },
          onStateChange: event => {
            if (window.YT && event.data === window.YT.PlayerState.ENDED) {
              if (state.videoList.length - 1 === state.playingVideoIndex) {
              } else {
                dispatch({ type: 'playNextVideo' });
              }
            }
          },
        },
      });
      return () => {
        window.ytPlayer.destroy();
      };
    }
  }, [state.videoList.length, state.playingVideo, state.playingVideoIndex]);

  const onClickVideoList = useCallback(index => {
    dispatch({ type: 'playVideo', playingVideoIndex: index });
  }, []);

  return (
    <Layout>
      <PlayingVideo item={state.playingVideo} />
      <VideoList
        videoList={state.videoList}
        onClick={data => onClickVideoList(data)}
      />
    </Layout>
  );
};

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
