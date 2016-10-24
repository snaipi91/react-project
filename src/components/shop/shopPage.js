'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShopItems from './shopItems';

import * as shopAction from '../../actions/shopActions';

class Shop extends React.Component {
    constructor(props, context) {
        console.log('Конструктор');
        super(props, context);
        this.onLoadingItems = this.onLoadingItems.bind(this);
    }

    componentWillMount() {
        console.log('До рендера');
        this.props.shopAction.loadItem(3);
    }

    componentDidMount() {
        console.log('После рендера');
    }

    componentWillReceiveProps() {
        console.log('Изменили props');
    }

    onLoadingItems() {
        this.props.shopAction.loadItem(this.props.shop.loadItems);
    }

    render() {
        var _stateRequest;
        (this.props.shop.request == true) ? _stateRequest = 'request' : _stateRequest = 'no-request';

        return (
            <div className={"app " + "container-fluid"}>
                <h1>Shops</h1>
                <ShopItems data={this.props.shop} />
                <p className={"bg-success"}>Всего загруженно объектов - {this.props.shop.items.length}</p>
                <div className={"bg-danger"}>{this.props.shop.itemsError}</div>
                <div>
                    <div className={"glyphicon " + "glyphicon-refresh " + _stateRequest}></div>
                </div>
                <button className={"btn " + "btn-default "  + "navbar-btn " + "loading"} onClick={this.onLoadingItems}>Load items</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('Connect');
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
