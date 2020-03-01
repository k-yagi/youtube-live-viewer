import React from "react"

export default ({ item, index, onClick }) => (
  <React.Fragment>
    <li onClick={() => onClick(index)}>
      <img src={item.snippet.thumbnails.medium.url} />
    </li>
    <li>{item.id.videoId}</li>
    <li>{item.snippet.title}</li>
  </React.Fragment>
)
