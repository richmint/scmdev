import * as actionTypes from "./centerActionType";
export const setMetaMask = (data) => {
    return (dispatch) => {
        dispatch(getCenterSuccess(data));
    };
};


export const getCenterSuccess = data => ({
  type: actionTypes.GET_CENTER_SUCCESS,
  payload: { data }
});
