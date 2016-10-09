'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShopItems from './shopItems';

import * as shopAction from '../../actions/shopActions';

class Shop extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onLoadingItems = this.onLoadingItems.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.shopAction.loadItem(10);
    }

    componentWillReceiveProps() {

    }

    onLoadingItems() {
        this.props.shopAction.ajaxLoadItems();
    }

    render() {
        return (
            <div className={"app " + "container-fluid"}>
                <h1>Shops</h1>
                <ShopItems items={this.props.shop} />
                <div>{this.props.shop.itemsError}</div>
                <button onClick={this.onLoadingItems}>Load items</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shop: state.shop
    };
};

const mapDispatchToProps = dispatch => (
    {
        shopAction: bindActionCreators(shopAction, dispatch)
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
