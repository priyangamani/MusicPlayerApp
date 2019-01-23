import {
  FETCHING_MUSIC_REQUEST,
  FETCHING_MUSIC_SUCCESS,
  FETCHING_MUSIC_FAILURE
} from "./Types";

export const fetchingMusicRequest = () => ({
  type: FETCHING_MUSIC_REQUEST
});

export const fetchingMusicSuccess = payload => ({
  type: FETCHING_MUSIC_SUCCESS,
  payload: { payload }
});

export const fetchingMusicFailure = errors => ({
  type: FETCHING_MUSIC_FAILURE,
  payload: { errors }
});

export const fetchMusic = () => {
  return async dispatch => {
    dispatch(fetchingMusicRequest());
    try {
      let response = await fetch(
        "https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallange/master/data/manifest.json"
      );
      let payload = await response.json();

      dispatch(fetchingMusicSuccess(payload.data));
    } catch (error) {
      dispatch(fetchingMusicFailure(error));
    }
  };
};
