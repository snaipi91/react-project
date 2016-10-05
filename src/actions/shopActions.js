'use strict';

import {ShopConst} from '../consts';

export function loadItem(items) {
    return dispatch => {
        dispatch({
            type: ShopConst.LOADING_ITEM,
            items
        });
    };
}

export function errorItem() {
    return dispatch => {
        dispatch({
            type: ShopConst.ERROR
        });
    };
}
