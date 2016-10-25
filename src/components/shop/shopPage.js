'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShopItems from './shopItems';
import SkyLight from 'react-skylight';
import { Map, Marker, MarkerLayout } from 'yandex-map-react';

import * as shopAction from '../../actions/shopActions';

class Shop extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onLoadingItems = this.onLoadingItems.bind(this);
        this.onLoadingMap = this.onLoadingMap.bind(this);
    }

    componentWillMount() {
        this.props.shopAction.loadItem(3);
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    onLoadingItems() {
        this.props.shopAction.loadItem(this.props.shop.loadItems);
    }

    onLoadingMap(id) {
        let _points = [];

        if(this.props.shop.items.length > 1) {

            _points[0] = this.props.shop.items[id].Cells.geoData.coordinates[0];
            _points[1] = this.props.shop.items[id].Cells.geoData.coordinates[1];

        }

        return _points;
    }

    render() {

        var _id = (this.props.params.id == undefined) ? 0 : this.props.params.id;
        var _stateRequest;
        var _myBigGreenDialog = {
            backgroundColor: 'rgb(27, 25, 25)',
            color: '#ffffff',
            width: '50%',
            padding: '15px',
            marginLeft: '-25%'
        };

        console.log(this.onLoadingMap(_id)[0]);

        (this.props.shop.request == true) ? _stateRequest = 'request' : _stateRequest = 'no-request';

        return (
            <div className={"app " + "container-fluid"}>
                <h1>Shops</h1>
                <SkyLight dialogStyles={_myBigGreenDialog} hideOnOverlayClicked ref="simpleDialog">
                    <div className="popup__title">{(this.props.shop.items.length > 1) ? this.props.shop.items[_id].Cells.Name : 'Title'}</div>
                    <div className="popup__address">{(this.props.shop.items.length > 1) ? this.props.shop.items[_id].Cells.Address : 'address'}</div>
                    <Map className="popup__map" width="920px" height="300px" center={[this.onLoadingMap(_id)[1], this.onLoadingMap(_id)[0]]} zoom={15}>
                        <Marker lat={this.onLoadingMap(_id)[1]} lon={this.onLoadingMap(_id)[0]} />
                    </Map>
                </SkyLight>
                <ShopItems popup={this.refs} data={this.props.shop} />
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
