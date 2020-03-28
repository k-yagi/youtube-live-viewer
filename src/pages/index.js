import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import VideoList from "../components/videoList"
import PlayingVideo from "../components/playingVideo"

export default ({ data }) => {
  const videoList = data.allContentsJson.edges;
  const [playerState, setPlayerState]             = useState(99);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(0);
  const [playingVideo, setPlayingVideo]           = useState(videoList[playingVideoIndex]);
  const [player, setPlayer]                       = useState(undefined);

  // プレイヤー初期化処理
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = initPlayer;
  }, [])

  // 再生中のvideo初期化
  useEffect(() => {
    if (player !== undefined) {
      player.destroy();
      initPlayer();
    }
  }, [playingVideo])

  // videoのインデックスと再生中のvideoを一致させる
  useEffect(() => {
    setPlayingVideo(videoList[playingVideoIndex]);
  }, [playingVideoIndex])

  // 動画が終了したら次の動画へ
  useEffect(() => {
    if (window.YT && playerState === window.YT.PlayerState.ENDED) {
      if (videoList.length - 1 == playingVideoIndex) {
      } else {
        setPlayingVideoIndex(playingVideoIndex + 1);
      }
    }
  }, [playerState])

  function initPlayer() {
    setPlayer(
      window.hoge = new window.YT.Player('player', {
        height: '720',
        width: '100%',
        videoId: playingVideo.node.videoId,
        events: {
          'onReady': (event) => { event.target.playVideo(); },
          'onStateChange': (event) => { setPlayerState(event.data); }
        }
      })
    );
  }

  // 動画リストをクリックしたときの処理
  function changePlayingVideo(index) {
    setPlayingVideoIndex(index);
  }

  return (
    <Layout>
      <PlayingVideo item={playingVideo} />
      <VideoList videoList={videoList} onClick={(data) => changePlayingVideo(data)} />
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentsJson(filter: {snippet: {liveBroadcastContent: {in: ["upcoming", "live"]}}}) {
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
`
