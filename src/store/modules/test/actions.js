export const actions = {
  updateState: value => {
    return dispatch => {
      dispatch({
        type: `${Math.random()}`,
        value,
      });
    };
  },
};