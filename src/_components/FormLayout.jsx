import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Select, Checkbox, Radio } from 'antd';

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class FormLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};


    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderForm = this.renderForm.bind(this);

  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.defaultValues && Object.keys(nextProps.defaultValues).length) {
      return {
        ...nextProps.defaultValues
      }
    } else {
      // Assign default values of "" to our controlled input
      // If we don't do this, React will throw the error
      // that Input elements should not switch from uncontrolled to controlled 
      // or (vice versa)

      let initialState = nextProps.model.reduce((acc, m) => {
        acc[m.key] = m.value ? m.value : "";
        return acc;
      }, {});
      console.log("initialState: ", initialState);
      return {
        ...initialState
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  }

  onChange(e, key, type = "single") {
    console.log(`${key} changed ${e.target.value} type ${type}`);
    if (type === "single") {
      this.setState({
        [key]: e.target.value
      });
    } else {
      // Array of values (e.g. checkbox): TODO: Optimization needed.
      let found = this.state[key] ?
        this.state[key].find((d) => d === e.target.value) : false;

      if (found) {
        let data = this.state[key].filter((d) => {
          return d !== found;
        });
        this.setState({
          [key]: data
        });
      } else {
        this.setState({
          [key]: [e.target.value, ...this.state[key]]
        });
      }
    }
  }
//for (let i = 0; i < 10; i++) {
  // children.push(
  //   <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
  //     <FormItem label={`Field ${i}`}>
  //       {getFieldDecorator(`field-${i}`, {
  //         rules: [{
  //           required: true,
  //           message: 'Input something!',
  //         }],
  //       })(
  //         <Input placeholder="placeholder" />
  //       )}
  //     </FormItem>
  //   </Col>
  // );

  renderForm() {
    let model = this.props.model;
    let defaultValues = this.props.defaultValues;

    let formUI = model.map((m) => {
      let key = m.key;
      let type = m.type || "text";
      let props = m.props || {};
      let name = m.name;
      let value = m.value;

      let target = key;
      value = this.state[target];

      let input = <Input {...props}
        className="form-input"
        type={type}
        id={key}
        name={name}
        value={value}
        onChange={(e) => { this.onChange(e, target) }}
      />;

      if (type == "radio") {
        input = m.options.map((o) => {
          let checked = o.value == value;
          return (
            <React.Fragment key={'fr' + o.key}>
              <RadioButton {...props}
                type={type}
                key={o.key}
                name={o.name}
                checked={checked}
                value={o.value}
              >
              {o.label}
              </RadioButton>
            </React.Fragment>
          );
        });
        input = <RadioGroup onChange={(e) => { this.onChange(e, o.name) }} defaultValue={m.value}>{input}</RadioGroup>;
      }

      if (type == "select") {
        input = m.options.map((o) => {
          let checked = o.value == value;
          console.log("select: ", o.value, value);
          return (
            <Option {...props}
              key={o.key}
              value={o.value}
            >{o.value}</Option>
          );
        });

        console.log("Select default: ", value);
        input = <Select defaultValue={value} onChange={(e) => { this.onChange(e, m.key) }}>{input}</Select>;
      }

      if (type == "checkbox") {
        input = <CheckboxGroup options={m.options} defaultValue={m.value} onChange={(e) => { this.onChange(e, m.key, "multiple") }}>Skills</CheckboxGroup>;

      }

      return (
        // <div key={'g' + key} className="form-group">
        //   <label className="form-label"
        //     key={"l" + key}
        //     htmlFor={key}>
        //     {m.label}
        //   </label>
        //   {input}
        // </div>
        <div key={'g' + key }>
           {input}
        </div>
       
      );
    });
    return formUI;
  }

  render() {
    let title = this.props.title || "Dynamic Form";

    return (
      <div className={this.props.className}>
        <h3 className="form-title">{title}</h3>
        <form className="dynamic-form" onSubmit={(e) => { this.onSubmit(e) }}>
          {this.renderForm()}
          <div className="form-actions">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export { FormLayout as FormLayout };