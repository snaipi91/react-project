'use strict';

import {ShopConst} from '../consts';

export const loadItem = () => {
    console.log('action ' + ShopConst.LOADING_ITEM);
    return {
        type: ShopConst.LOADING_ITEM
    };
};

