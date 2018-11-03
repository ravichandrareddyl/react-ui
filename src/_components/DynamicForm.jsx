import React from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Button } from 'antd';
import { PrepareForm } from '../_utils/AppUtils';

const FormItem = Form.Item;
const Option = Select.Option;

class DynamicForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    getFields() {
        const { getFieldDecorator } = this.props.form;
        const { metaData } = this.props;
        const { rows } = metaData;

        const formRows = PrepareForm(rows, getFieldDecorator);

        // const formRows = rows.map(row => {
        //     console.log('row '+ JSON.stringify(row));
        //     const cols = row.map(col => {
        //         console.log('col'+ JSON.stringify(col));
        //         const { key, width, type, props, name, placeholder } = col;
        //         let input;
        //         console.log(11111);
        //         if (type == 'select') {
        //             const { options } = col;
        //             const opts = options.map(opt => {
        //                 return <Option key={`opt-${opt.key}`} value={opt.key}>{opt.value}</Option>
        //             });

        //             input = <Select placeholder={placeholder}>{opts}</Select>;

        //         } else if (type == 'monthPicker') {
        //             const { MonthPicker } = DatePicker;
        //             input = <MonthPicker size={size} placeholder="Select Month" />
        //         }
        //         console.log(222222);
        //         return (
        //             <Col span={`${width}`} key={`col-${key}`}>
        //                 <FormItem label={`Field ${key}`}>
        //                     {getFieldDecorator(`${name}`, {
        //                         rules: [{
        //                             required: true,
        //                             message: 'Input something!',
        //                         }],
        //                         initialValue: 1
        //                     })(
        //                         { input }
        //                     )}
        //                 </FormItem>
        //             </Col>
        //         )
        //     });

        //     return (
        //         <Row>
        //             {cols}
        //         </Row>
        //     );
        // });

        console.log('formRows'+ JSON.stringify(formRows));  
        return formRows;
    }

    render() {
        const { metaData } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { rows, formTitle, submitName } = metaData;


        return (
            <div>
                <h2>{formTitle}</h2>
                <Form
                    className="dynamic-form"
                    onSubmit={this.props.handleSubmit}
                >
                    {this.getFields()}
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">{submitName}</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
const wrappedForm = Form.create()(DynamicForm);
export { wrappedForm as DynamicForm };