import React from "react"

export default ({ item, onClick }) => (
  <React.Fragment>
    <li onClick={() => onClick(item.id.videoId)}>
      <img src={item.snippet.thumbnails.medium.url} />
    </li>
    <li>{item.id.videoId}</li>
    <li>{item.snippet.title}</li>
  </React.Fragment>
)
