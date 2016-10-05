'use strict';

import React from 'react';
import {connect} from 'react-redux';

class Shop extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className={"app " + "container-fluid"}>
                <h1>Shops</h1>
                <p>{this.props.Cells}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shop: state.Cells
    };
};

export default connect(mapStateToProps)(Shop);
