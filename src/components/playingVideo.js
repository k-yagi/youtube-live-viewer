import React from "react"

export default ({ item }) => (
  <div>
    <div id="player"></div>
    Now playing - {item.snippet.title}
  </div>
)
