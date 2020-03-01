import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import VideoList from "../components/videoList"
import PlayingVideo from "../components/playingVideo"

export default ({ data }) => {
  const [playerState, setPlayerState] = useState(99);
  const [playingVideoId, setPlayingVideoId] = useState(data.allContentsJson.edges[0].node.items[0].id.videoId);
  const [player, setPlayer] = useState(undefined);

  // プレイヤー初期化処理
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = initPlayer;
  }, [])

  useEffect(() => {
    if (player !== undefined) {
      player.destroy();
      initPlayer();
    }
  }, [playingVideoId])

  function initPlayer() {
    setPlayer(
      new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId: playingVideoId,
        events: {
          'onReady': (event) => { event.target.playVideo(); },
          'onStateChange': (event) => { setPlayerState(event.data); }
        }
      })
    );
  }

  function changePlayingVideo(videoId) {
    setPlayingVideoId(videoId);
  }

  return (
    <Layout>
      <PlayingVideo item={data.allContentsJson.edges[0].node.items[0]} />
      <ul>
        {data.allContentsJson.edges[0].node.items.map((item) => (
          <VideoList item={item} onClick={(data) => changePlayingVideo(data) } />
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentsJson {
      edges {
        node {
          items {
            id {
              videoId
            }
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
  }
`
