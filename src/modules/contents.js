// action types
export const CONTENTS_UPDATED = 'CONTENTS_UPDATED';

// action
export const contentsUpdated = () => ({
  type: CONTENTS_UPDATED
});

// reducer
const initialState = {
  isContentsUpdated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTENTS_UPDATED:
      return {
        ...state,
        isContentsUpdated: true
      }
    default:
      return state;
  }
}
