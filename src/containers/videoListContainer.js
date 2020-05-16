import { connect } from 'react-redux';

import VideoList from '../components/videoList';
import { setVideoList, playSelectedVideo } from '../modules/videos';

const mapStateToProps = (state) => {
  return { videoList: state.videos.videoList }
};

export default connect(
  mapStateToProps,
  { setVideoList, playSelectedVideo }
)(VideoList);
