'use strict';

import {ShopConst} from '../consts';

export function loadItem() {
    return dispatch => {
        dispatch({
            type: ShopConst.LOADING_ITEM
        });
    };
}
