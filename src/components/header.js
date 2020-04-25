import PropTypes from 'prop-types';
import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  AppBar: {
    marginBottom: theme.spacing(3),
    background: theme.palette.background.paper,
  },
}));

const Header = ({ siteTitle }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.AppBar}>
      <Toolbar>
        <Typography variant="h6">{siteTitle}</Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
