import { connect } from 'react-redux';
import PlayingVideo from '../components/playingVideo';

const mapStateToProps = (state) => {
  return { item: state.videos.playingVideo }
};

export default connect(
  mapStateToProps
)(PlayingVideo);
