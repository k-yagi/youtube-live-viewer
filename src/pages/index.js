import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { schedule } from 'node-cron';

import Layout from '../components/layout';
import VideoListContainer from '../containers/videoListContainer';
import PlayingVideoContainer from '../containers/playingVideoContainer';
import { contentsUpdated } from '../modules/contents';
import { playSelectedVideo } from '../modules/videos';

const Index = ({ playSelectedVideo, contentsUpdated, isContentsUpdated }) => {
  // ifame api 読み込み
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      playSelectedVideo(0);
    };
  }, [playSelectedVideo])

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
  { contentsUpdated, playSelectedVideo }
)(Index);
