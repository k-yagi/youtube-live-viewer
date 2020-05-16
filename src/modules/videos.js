// action types
export const SET_VIDEO_LIST = 'SET_VIDEO_LIST';
export const PLAY_SELECTED_VIDEO = 'PLAY_SELECTED_VIDEO';
export const PLAY_NEXT_VIDEO = 'PLAY_NEXT_VIDEO';

// action
export const setVideoList = (videos) => ({
  type: SET_VIDEO_LIST,
  payload: { videos }
})

export const playSelectedVideo = (index) => ({
  type: PLAY_SELECTED_VIDEO,
  payload: { index }
})

export const playNextVideo = () => ({
  type: PLAY_NEXT_VIDEO,
})

// reducer
const initialState = {
  playingVideoIndex: 0,
  videoList: [],
  playingVideo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO_LIST: {
      const { videos } = action.payload;
      return {
        ...state,
        videoList: videos,
      }
    }
    case PLAY_SELECTED_VIDEO: {
      const { index } = action.payload;
      return {
        ...state,
        playingVideoIndex: index,
        playingVideo: state.videoList[index],
      }
    }
    case PLAY_NEXT_VIDEO: {
      const index = state.playingVideoIndex + 1
      return {
        ...state,
        playingVideoIndex: index,
        playingVideo: state.videoList[index],
      }
    }
    default: {
      return state;
    }
  }
}
