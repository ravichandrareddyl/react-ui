import { formConstants } from '../_constants';
import { formService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const formActions = {
    loadForm
};

function loadForm(id) {
    return dispatch => {
        dispatch(request({ id }));
    
        formService.getById(id)
            .then(
                metadata => { 
                    dispatch(success(metadata));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: formConstants.LOAD_FORM_REQUEST, id } }
    function success(metaData) { return { type: formConstants.LOAD_FORM_SUCCESS, metaData } }
    function failure(error) { return { type: formConstants.LOAD_FORM_FAILURE, error } }
}