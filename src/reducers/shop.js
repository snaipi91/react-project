import {ShopConst} from '../consts';
import {Shop} from '../state';

export default function (state = Shop, action) {
    switch (action.type) {

        case ShopConst.LOADING_ITEM: {
            return Object.assign({}, state, {

            });
        }

        case ShopConst.ERROR: {
            return Object.assign({}, state, {

            });
        }

        default: {
            return state;
        }

    }
}