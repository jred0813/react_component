import $ from "jquery";
import React from 'react';

import * as feather from "feather-icons";

import FormInput from "./FormInput";
import styles from "./Editable.module.scss";

import "jquery-datetimepicker/build/jquery.datetimepicker.min.css";
import "jquery-datetimepicker/build/jquery.datetimepicker.full.min.js";

export default class Editable extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this._text = React.createRef();
    this._onSubmit = props.onSubmit || function(){};
    this._onGenerate = props.onGenerate || function(){};
    this._value = this.props.value || this.props.children;
    this._type = this.props.type;
    this._not_null = this.props.NN === undefined || this.props.NN;
    this._null = this.props.empty || "空";
    if(this._type === "datetime") {
      this._value =
        this._value
        && (new Date(this._value)).toLocaleString();
    }
    this.state = {
      focus: false
    };
  }

  componentDidUpdate() {
    this._onGenerate(this._text.current);
    this._text.current && this._text.current.focus();
  }

  get() {
    return this._value;
  }

  set(val) {
    return this._value = val;
  }

  shouldComponentUpdate(nextProps, nextState){
    let next = nextProps.value || nextProps.children;
    if(this.props !== nextProps && next !== this._value ) {
      this._value = next;
      if(this._type === "datetime") {
        this._value =
          this._value
          && (new Date(this._value)).toLocaleString();
      }
    }
    return true;
  }

  submit_btn() {
    return (
      <button className={`btn btn-primary ${ styles.submit_button }`}
              dangerouslySetInnerHTML={{__html:feather.icons.check.toSvg()}}
              onClick={async ()=>{
                try {
                  var current = $(this._text.current);
                  var val = current.val();
                  if(val === this._value || (this._not_null && !val)) {
                    return this.setState({ focus: false });
                  }
                  if(this.props.type === "number") {
                    val = parseInt(val);
                  }
                  if(this.props.type === "datetime") {
                    val = val.replace(/ /g, "");
                  }

                  await this._onSubmit(val);
                  this._value = val;
                  if(this._type === "datetime") {
                    this._value =
                      this._value
                      && (new Date(this._value)).toLocaleString();
                  }
                  this.setState({ focus: false });
                } catch(error) {
                }
              }}/>);
  }

  cancel_btn() {
    return (
      <button className="btn btn-danger"
              dangerouslySetInnerHTML={{
                __html:feather.icons.x.toSvg()
              }}
              onClick={()=>{
                this.setState({ focus: false });
              }}/>
    );
  }

  render() {
    if(this.state.focus) {
      this.props.onShow && this.props.onShow();
      if(this._type === "textarea") {
        return (
          <div className={`${this.props.className || ""} ${styles.textarea}`}>
            <textarea
              rows={this.props.rows}
              cols={this.props.cols}
              ref={this._text}
              className={`form-control`}
              defaultValue={this._value}
            />
            <div className={styles.textarea_btn}>
              { this.submit_btn() }
              { this.cancel_btn() }
            </div>
          </div>);
      }
      return(
        <div className={this.props.className}>
          <FormInput
            inputRef={ this._text }
            defaultValue={ this._value }
            type={ this._type || "text" }
            maxLength={this.props.maxLength}
            minLength={this.props.minLength}
            max={this.props.max}
            min={this.props.min}
            require={this.props.require}
            placeholder={this.props.placeholder}
            className={ styles.form_input }
          >
            { this.submit_btn() }
            { this.cancel_btn() }
          </FormInput>
        </div>);
    } else {
      this.props.onClose && this.props.onClose();
      return (
        <div
          onClick={()=>{
                this.props.editable && this.setState({ focus: true });
              }}
              className={this.props.className}
            >
              <p className={ styles.editable_text }>{ this._value || this._null }</p>
            </div>);
        }

    }
}