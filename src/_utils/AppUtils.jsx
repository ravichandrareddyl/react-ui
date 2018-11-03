import React from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const PrepareForm = (rows, getFieldDecorator) => {
    return rows.map(row => prepareRow(row, getFieldDecorator))
}

const prepareRow = (row, getFieldDecorator) => {
    const cols = row.map(col => prepareColumn(col, getFieldDecorator));

    return (
        <Row>
            {cols}
        </Row>
    );
}

const prepareColumn = (col, getFieldDecorator) => {
    // console.log('col' + JSON.stringify(col));
    const { key, width, type, props, name, placeholder } = col;
    let input;
    //console.log(11111);
    if (type == 'select') {
        const { options } = col;
        const opts = options.map(opt => {
            return <Option key={`opt-${opt.key}`} value={opt.key}>{opt.value}</Option>
        });

        input = <Select value="1" placeholder={placeholder}>{opts}</Select>;

    } else if (type == 'monthPicker') {
        const { MonthPicker } = DatePicker;
        input = <MonthPicker size={size} placeholder="Select Month" />
    }
    // console.log(222222);
    return (
        <Col span={`${width}`} key={`col-${key}`}>
            <FormItem label={`Field ${key}`}>
                {getFieldDecorator(`${name}`, {
                    rules: [{
                        required: true,
                        message: 'Input something!',
                    }]
                })(
                    { input }
                )}
            </FormItem>
        </Col>
    )
}

export { PrepareForm as PrepareForm };