'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as shopAction from '../../actions/shopActions';

class Shop extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    onLoadingItems() {

    }

    render() {
        return (
            <div className={"app " + "container-fluid"}>
                <h1>Shops</h1>
                <button onClick={this.onLoadingItems}>Load items</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shop: state.Cells
    };
};

const mapDispatchToProps = dispatch => {
    return {
        shopAction: bindActionCreators(shopAction, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
