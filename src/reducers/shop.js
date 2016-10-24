import {ShopConst} from '../consts';
import {Shop} from '../state';

export default function (state = Shop, action) {

    console.log('Запустился reducer Shop ' + action.type);

    switch (action.type) {

        case ShopConst.LOADING_ITEM: {
            return Object.assign({}, state, {
                items: action.payload.data,
                loadItems: action.payload.loadItem
            });
        }

        case ShopConst.ERROR: {
            return Object.assign({}, state, {
                itemsError: action.payload.errors
            });
        }

        default: {
            return Shop;
        }

    }
}