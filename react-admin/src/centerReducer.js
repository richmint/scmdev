import * as actionType from "./centerActionType";

const initialState = {
  metaMaskHash: '',
};

export const centerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_CENTER:
      return state;
    case actionType.GET_CENTER_FAILURE:
      return {
        ...state,
        metaMaskHash: '',
      };
    case actionType.GET_CENTER_SUCCESS:
      return {
        ...state,
        metaMaskHash: action.payload.data.metaMaskHash,
      };
    default:
      return state;
  }
};