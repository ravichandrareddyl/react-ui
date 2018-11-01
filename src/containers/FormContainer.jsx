import React from 'react';
import { connect } from 'react-redux';
import { formActions } from '../_actions';
import { LoadingIndicator, CompFormOne } from '../_components';
import { createLoadingSelector } from '../_services';
import queryString from 'query-string';
import { Form } from 'antd';

class FormContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        const { formName, refNum, id } = values;
        const { loadForm } = this.props;
        loadForm(formName);
    }

    render() {
        const { metaData } = this.props.forms;
        
        if (this.props.isLoading) {
            return <LoadingIndicator />
        }

        return (
            <div className="form-container">
                { metaData && <CompFormOne formData={metaData} /> }
            </div>
        );
    }
}

const loadingSelector = createLoadingSelector(['LOAD_FORM']);
function mapStateToProps(state) {
    const { forms, loader } = state;
    return {
        forms,
        isLoading: loadingSelector(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadForm : (id) => dispatch(formActions.loadForm(id))
    }
}


const connectedFormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainer);
export { connectedFormContainer as FormContainer }; 