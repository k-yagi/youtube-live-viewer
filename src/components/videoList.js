import React from "react"

export default ({ item }) => (
  <React.Fragment>
    <li><img src={item.snippet.thumbnails.medium.url} /></li>
    <li>{item.id.videoId}</li>
    <li>{item.snippet.title}</li>
  </React.Fragment>
)
