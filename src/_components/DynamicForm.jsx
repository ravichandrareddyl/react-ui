import React from 'react'; 
import { Row, Col, Form, Input, DatePicker } from 'antd';

const FormItem = Form.Item;

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
    
    render() {
        const { metaData } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { rows, formTitle, submitName } = metaData;

        const formComps = rows.map(row => {
            const cols = row.map(col => {
                const key = col.key;
                const width = col.width || 8;
                const type = col.type || "text";
                const props = col.props || {};
                const name = col.name;
                const value = col.value;
                const placeholder = col.placeholder || '';
                let input;

                if (type == 'select') {
                    const options = col.options;
                    input = <Select placeholder={placeholder}>
                            options.map(opt => {
                                <Option key={`opt-${opt.key}`} value={opt.key}>{opt.value}</Option>
                            })
                    </Select>;
                } else if (type == 'monthPicker') {
                    const { MonthPicker } = DatePicker;
                    input = <MonthPicker size={size} placeholder="Select Month" />
                }

                return (
                    <Col span={width} key={`col-${key}`}>
                        <FormItem label={`Field ${key}`}>
                            {getFieldDecorator(`deco-${name}`, {
                            rules: [{
                                required: true,
                                message: 'Input something!',
                            }],
                            })(
                           {input}
                            )}
                        </FormItem>
                    </Col>
                )
            });
            
            return (
                <Row>
                    {cols}
                </Row>
            )
        });

        return (
            <div>
                <h2>{formTitle}</h2>
                <Form 
                    className="dynamic-form"
                    onSubmit={this.props.handleSubmit}
                >
                {formComps}
                <Row>
                    <Col span={24} style={{ textAlign: 'right'}}>
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