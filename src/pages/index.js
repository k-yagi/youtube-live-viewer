import React, { useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import VideoList from "../components/videoList"

export default ({ data }) => {
  useEffect(() => {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player = undefined;
    window.onYouTubeIframeAPIReady = function () {
      player = new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId: data.allContentsJson.edges[0].node.items[0].id.videoId,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    let done = false;
    function onPlayerStateChange(event) {
      if (event.data === window.YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      player.stopVideo();
    }
  }, []);

  return (
    <Layout>
      <div id="player"></div>
      <ul>
        {data.allContentsJson.edges[0].node.items.map((item) => (
          <VideoList item={item} />
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
