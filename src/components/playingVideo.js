import React, { useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  Typography: {
    marginTop: -theme.spacing(3),
    color: theme.palette.text.primary,
  },
}));

export default ({
  playingVideo,
  videoListLength,
  playingVideoIndex,
  isContentsUpdated,
  playNextVideo,
}) => {
  const classes = useStyles();

  // プレイヤーの動画更新
  useEffect(() => {
    if (window.YT && playingVideo) {
      window.ytPlayer = new window.YT.Player('player', {
        height: '720',
        width: '100%',
        videoId: playingVideo.node.videoId,
        events: {
          onReady: event => {
            event.target.playVideo();
          },
          onStateChange: event => {
            if (window.YT && event.data === window.YT.PlayerState.ENDED) {
              if (isContentsUpdated) {
                window.location.reload();
              } else if (videoListLength - 1 === playingVideoIndex) {
              } else {
                playNextVideo();
              }
            }
          },
        },
      });
      return () => {
        window.ytPlayer.destroy();
      };
    }
  }, [videoListLength, playingVideo, playingVideoIndex, isContentsUpdated, playNextVideo]);

  if (playingVideo) {
    return (
      <div className={classes.root}>
        <div id="player"></div>
        <Typography className={classes.Typography} variant="h6" gutterBottom>
          {playingVideo.node.snippet.title}
        </Typography>
      </div>
    );
  } else {
    return <div>動画はありません</div>;
  }
};
