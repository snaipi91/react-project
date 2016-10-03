import React, { Component, PropTypes } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);

        // this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
        // this._initInput = this._initInput.bind(this);
    }

    /*_initInput(input) {
        this._input = input;
    }*/

    render() {
        const {name, value, placeholder, labelText, type, id} = this.props;

        return (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                    className="mdl-textfield__input"
                    type={type}
                    id={id ? id : name}
                    name={name}
                    value={value} />
                <label className="mdl-textfield__label" htmlFor={id ? id : name}>{labelText}</label>
            </div>
        );
    }
}

Input.defaultProps = {
    parent: window
};

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    value: PropTypes.string,

    labelText: PropTypes.string.isRequired
};

export default Input;