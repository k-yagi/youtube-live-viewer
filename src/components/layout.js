/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Container, Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import Header from './header';
import './layout.css';
import theme from '../gatsby-theme-material-ui-top-layout/theme';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="background.default">
        <Header siteTitle={data.site.siteMetadata.title} />
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
