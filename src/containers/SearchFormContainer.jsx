import React from 'react';
import { connect } from 'react-redux';
import { DynamicForm } from '../_components';

class SearchFormContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const formMetaData = {
            formTitle: 'New Certificate',
            submitName: 'Create',
            rows: [
                [
                    { key: 'certType', width: 20, type: 'select', 
                        formItemLayout: {
                            labelCol: { span: 6 },
                            wrapperCol: { span: 14 },
                        },
                      options: [
                          {key: 1, value: 'Cert1'},
                          {key: 2, value: 'Cert2'},
                          {key: 3, value: 'Cert3'},
                          {key: 4, value: 'Cert4'}
                        ],   
                      name: 'certType',
                      label: 'Certificate Type', 
                      value: '--select--', placeholder: 'Select certificate'},
                ],
                [
                    { key: 'month', width: 8, type: 'monthPicker', name: 'month', placeholder: 'Select Month'}
                ]
            ]
        };
        return (
            <DynamicForm metaData={formMetaData}/>
        )
    }
}

export { SearchFormContainer as SearchFormContainer };

