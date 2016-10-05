'use strict';

import {ShopConst} from '../consts';

export function loadItem() {
    return {
        type: ShopConst.LOADING_ITEM
    }
}
