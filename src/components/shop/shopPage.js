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

    componentDidMount() {
        this.props.shopAction.loadItem();
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
                <div className={"items"}>
                    {this.props.shop.items.example}
                </div>
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
