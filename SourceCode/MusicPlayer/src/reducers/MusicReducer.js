import {
  FETCHING_MUSIC_REQUEST,
  FETCHING_MUSIC_SUCCESS,
  FETCHING_MUSIC_FAILURE
} from "../actions/Types";

const initialstate = {
  isFeching: false,
  errorMessage: null,
  data: []
};

const MusicReducer = (state = initialstate, action) => {
  switch (action.type) {
    case FETCHING_MUSIC_REQUEST:
      return { ...state, isFeching: true };
    case FETCHING_MUSIC_FAILURE:
      return { ...state, isFeching: false, errorMessage: action.payload };
    case FETCHING_MUSIC_SUCCESS:
      return { ...state, isFeching: false, data: action.payload };
    default:
      return state;
  }
};

export default MusicReducer;
