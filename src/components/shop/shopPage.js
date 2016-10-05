'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as shopAction from '../../actions/shopActions';

class Shop extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onLoadingItems = this.onLoadingItems.bind(this);
    }

    onLoadingItems() {
        this.props.dispatch(loadItem({items: {fuel: 99}}));
        console.log(this.props);
    }

    render() {
        return (
            <div className={"app " + "container-fluid"}>
                <h1>Shops{this.props.shop}</h1>
                <button onClick={this.onLoadingItems}>Load items</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shop: state.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        shopAction: bindActionCreators(shopAction, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
