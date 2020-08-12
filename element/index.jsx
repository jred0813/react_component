import React from "react";
import style from "./element.module.scss";

export class div extends React.Component {

    render() {
        const mask_styles = {
            mask_height: this.props.height,
            mask_width: this.props.width,
            backgroundColor: `rgba(0, 0, 0, ${this.props.mask_opacity})`,
        }
        const styles = {
            height: this.props.height,
            width: this.props.width,
        }
        return (
            <div className={style.mask} style={mask_styles}>
                <div
                    type='text'
                    className={style.div}
                    ref={this.props.ref}
                    style={styles}
                >
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export class inputfield extends React.Component {

    render() {
        const inputfield_styles = {
            height: this.props.height,
            width: this.props.width,
            border: this.props.error ? '1.4px solid #ff0000' : '',
            boxShadow: this.props.error ? '0 0 2px #ff0000' : '',
        }

        return (
            <div className={style.inputfield_div}>
                <span className={style.title}>
                    {this.props.title}
                </span>
                <input
                    type='text'
                    className={style.inputfield}
                    ref={this.props.ref}
                    style={inputfield_styles}
                />
                <span className={style.error}>
                    {this.props.error_message}
                </span>
            </div>

        )
    }
}

export class textarea extends React.Component {

    render() {
        const textarea_styles = {
            height: this.props.height,
            width: this.props.width,
            border: this.props.error ? '1.4px solid #ff0000' : '',
            boxShadow: this.props.error ? '0 0 2px #ff0000' : '',
        }

        return (
            <div className={style.textarea_div}>
                <span className={style.title}>
                    {this.props.title}
                </span>
                <textarea
                    type='text'
                    className={style.textarea}
                    ref={this.props.ref}
                    style={textarea_styles}
                />
                <span className={style.error}>
                    {this.props.error_message}
                </span>
            </div>

        )
    }
}

export class checkbox extends React.Component {

    render() {
        //資料範例
        // data = {
        //     group: 'groupName',
        //     description:'name',
        //     ref:React.creatRef,
        //     checked:'boolean',
        // }
        let lists = []
        for (let [key, data] of this.props.checkbox.entries()) {
            lists.push(
                <label key={key} className={style.checkbox_label}>
                    <input type="checkbox" name={data.group} ref={data.ref} defaultChecked={data.checked} onClick={this.props._onClick} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                    {data.description}
                </label>
            )
        }

        return (
            <div className={style.checkbox_div}>
                <span className={style.title}>
                    {this.props.title}
                </span>
                <div className={style.checkbox}>
                    {lists}
                </div>
            </div>
        )
    }
}

export class button extends React.Component {
    render() {
        const button_style = {
            backgroundColor: this.props.backgroundColor,
            color: this.props.color,
        }
        return (
            <button className={style.button} style={button_style} onClick={this.props._onClick}>
                {this.props.name}
            </button>
        )
    }
}

export class sort_checkbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rank: [],
            search: '',
        }
    }
    render() {
        //資料範例
        // data = {
        //     group: 'groupName',
        //     description:'name',
        //     ref:React.creatRef(),
        //     checked:'boolean',
        // }
        let lists = []
        for (let [key, data] of this.props.checkbox.entries()) {
            if (this.state.search === '' || data.description.indexOf(this.state.search) !== -1) {
                lists.push(
                    <label key={key} className={style.sort_checkbox_label}>
                        <input
                            type="checkbox"
                            id={'sort_checkbox' + key}
                            name={data.group}
                            ref={data.ref}
                            defaultChecked={data.checked}
                            onClick={(e) => {
                                if (e.currentTarget.checked) {
                                    this.state.rank.push(key)
                                    this.setState({ rank: this.state.rank })
                                } else {
                                    this.state.rank.splice(this.state.rank.indexOf(key), 1);
                                    this.setState({ rank: this.state.rank })
                                }
                            }} />
                        <div>
                            {this.state.rank.indexOf(key) + 1 < 1 ? '' : this.state.rank.indexOf(key) + 1}
                        </div>
                        {data.description}
                    </label>
                )
            }
        }

        return (
            <div className={style.sort_checkbox_div}>
                <span className={style.title}>
                    {this.props.title}
                </span>
                <input
                    type='text'
                    className={style.sort_checkbox_inputfield}
                    value={this.state.search}
                    placeholder="Search..."
                    onChange={(e)=>this.setState({search: e.currentTarget.value})}
                />
                <div className={style.sort_checkbox}>
                    {lists}
                </div>
            </div>
        )
    }
}

