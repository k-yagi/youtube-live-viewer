import React from "react"
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  Typography: {
    marginTop: -theme.spacing(3),
    color: theme.palette.text.primary,
  },
}));

export default ({ item }) => {
  const classes = useStyles();

  if (item) {
    return (
      <div className={classes.root}>
        <div id="player"></div>
        <Typography className={classes.Typography} variant="h6" gutterBottom>{item.node.snippet.title}</Typography>
      </div>
    )
  } else {
    return <div>動画はありません</div>
  }
}
