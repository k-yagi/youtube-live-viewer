import React, { Component } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

class IndexComponent extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  componentDidMount() {
    const self = this;
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player = undefined;
    window.onYouTubeIframeAPIReady = function () {
      player = new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId: self.state.allContentsJson.edges[0].node.items[0].id.videoId,
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
  }

  render() {
    return (
      <Layout>
        <div id="player"></div>
      </Layout>
    )
  }
}

export default IndexComponent

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
              description
            }
          }
        }
      }
    }
  }
`
