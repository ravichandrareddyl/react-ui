import React from 'react';
import { Row, Input, Col, Button } from 'antd';
import './Form.css';

class CompFormOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.formData;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit(event) {
        console.log('state====>'+ JSON.stringify(this.state));      
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-header"> 
                    <Row>
                        <Col span={12}>Name of foreign Office:</Col>
                        <Col span={12}><Input onChange={this.handleChange} name='fon' id='fon' value={this.state.fon}></Input></Col>
                    </Row>
                    <Row>
                        <Col span={12}>Compliance Certificate for the month of:</Col>
                        <Col span={12}><Input onChange={this.handleChange} name='ccm' id='ccm' value={this.state.ccm}></Input></Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
                        </Col>
                    </Row>
                    </div>
                </form>
            </div>
        );
    }
}

export { CompFormOne as CompFormOne };

