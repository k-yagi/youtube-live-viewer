import { connect } from 'react-redux';
import PlayingVideo from '../components/playingVideo';
import { playNextVideo } from '../modules/videos';

const mapStateToProps = (state) => {
  return {
    playingVideo: state.videos.playingVideo,
    videoListLength: state.videos.videoList.length,
    playingVideoIndex: state.videos.playingVideoIndex,
    isContentsUpdated: state.contents.isContentsUpdated,
  }
};

export default connect(
  mapStateToProps,
  { playNextVideo }
)(PlayingVideo);
