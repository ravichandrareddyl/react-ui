import { formConstants } from '../_constants';

export function forms(state = {}, action) {
  switch (action.type) {
    case formConstants.LOAD_FORM_REQUEST:
      return {
        isLoading: true
      };
    case formConstants.LOAD_FORM_SUCCESS:
      return {
        metaData: action.metaData
      };
    case formConstants.LOAD_FORM_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}