import React, { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import {
  GridListTileBar,
  GridList,
  GridListTile,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
  },
  gridList: {
    width: '100%',
    margin: 0,
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListTile: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: theme.palette.text.secondary,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default ({ videoList, setVideoList, playSelectedVideo }) => {
  const classes = useStyles();
  const data = useStaticQuery(graphql`
    query {
      allContentsJson(
        filter: {
          snippet: { liveBroadcastContent: { in: ["upcoming", "live"] } }
        }
      ) {
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
  `)

  useEffect(() => {
    setVideoList(data.allContentsJson.edges);
  }, [setVideoList, data])

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.8}>
        {videoList.map((item, index) => (
          <GridListTile
            key={item.node.videoId}
            className={classes.gridListTile}
            onClick={() => playSelectedVideo(index)}
          >
            <img
              src={item.node.snippet.thumbnails.medium.url}
              alt={item.node.snippet.title}
            />
            <GridListTileBar
              title={item.node.snippet.title}
              classes={{ root: classes.titleBar, title: classes.title }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
