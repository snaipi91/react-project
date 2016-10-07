'use strict';

import {ShopConst} from '../consts';

export function loadItem(items) {
    console.log('ajax');
    return (dispatch) => {
        console.log(dispatch);
        dispatch({
            type: ShopConst.LOADING_ITEM,
        });

        fetch('http://api.data.mos.ru/v1/datasets/1838/rows?$top=12&$orderby=Number')
            .then((response) => {
                console.log(response); 
            });
    };

}

export function ajaxLoadItems (){
    return {
        type: ShopConst.AJAX_LOADING_ITEM,
        payload: 'Произошло событие клика'
    };

}

