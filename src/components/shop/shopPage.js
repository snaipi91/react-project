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

    componentWillMount() {

    }

    onLoadingItems() {
        // this.props.dispatch(loadItem({items: {fuel: 99}}));
        console.log(this.props.shop);
    }

    render() {
        return (
            <div className={"app " + "container-fluid"}>
                <h1>Shops</h1>
                <div className={"items"}>
                    {this.props.shop}
                </div>
                <button onClick={this.onLoadingItems}>Load items</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shop: state.shop.items.example
    };
};

const mapDispatchToProps = dispatch => {
    return {
        shopAction: bindActionCreators(shopAction.loadItem, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
