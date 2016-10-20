'use strict';

import {ShopConst} from '../consts';

export function loadItem(items) {

    return (dispatch) => {

        fetch(`http://api.data.mos.ru/v1/datasets/1838/rows?$top=${items}&$orderby=Number`, {
            'method': 'get'
        })
            .then(response => {

                if(response.status != 200)
                    console.log(`Проблемы с соеденением - ${response.status}`);

                response.json()

                    .then(function(data) {

                        dispatch({
                            type: ShopConst.LOADING_ITEM,
                            payload: {
                                data: data,
                                loadItem: items + 9
                            }
                        })

                    });

            })

    };

}

export function ajaxLoadItems (){
    return {
        type: ShopConst.AJAX_LOADING_ITEM,
        payload: 'Произошло событие клика'
    };

}

