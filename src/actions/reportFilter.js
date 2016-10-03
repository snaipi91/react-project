import {ReportFilterConst} from '../consts';


export function changeIsTest(bool) {
    return {
        type: ReportFilterConst.IS_TEST,
        payload: bool?true:false
    }
}

export function setFilterRequest(selected, type) {
    return {
        type: ReportFilterConst.FILTER_REQUEST,
        payload: {
            who: type,
            data: selected
        }
    }
}

export function selectSelected(selected, type) {
    return {
        type: ReportFilterConst.SELECT_SELECTED,
        payload: {
            who: type,
            data: selected
        }
    }
}

export function setClearDownload(link) {
    return {
        type: ReportFilterConst.SET_CLEAR_DOWNLOAD,
        payload: link?link:''
    }
}

export function merchantSort(on, onData) {
    console.log(on, onData);

    if ( !on && !onData ) return {
        type: ReportFilterConst.MERCHANT_SORT,
        payload: false
    };

    return {
        type: ReportFilterConst.MERCHANT_SORT,
        payload: {
            on: on,
            onData: onData
        }
    }
}

export function merchantPointSort(on, onData) {
    console.log(on, onData);

    if ( !on && !onData ) return {
        type: ReportFilterConst.MERCHANT_POINT_SORT,
        payload: false
    };

    return {
        type: ReportFilterConst.MERCHANT_POINT_SORT,
        payload: {
            on: on,
            onData: onData
        }
    }
}

export function loadFilterSelects(param) {
    return (dispatch) => {
        dispatch({
            type: ReportFilterConst.SELECT_LOADED,
            payload: {
                who: param.who,
                data: true
            }
        });

        fetch('/api', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;charset=utf-8',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: '', cont: {
                'method': param.method
            }})
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.statusCode);

                if ( res.statusCode == 200 ) {
                    let datas = res.body.data;
                    let getMerchants = datas.list?datas.list:[];
                    let setMerchants = [];

                    if( typeof param.func === 'function' )setMerchants = getMerchants.map(param.func);

                    dispatch({
                        type: ReportFilterConst.UPDATE_SELECTS,
                        payload: {
                            who: param.who,
                            data: setMerchants
                        }
                    });

                    dispatch({
                        type: ReportFilterConst.SELECT_LOADED,
                        payload: {
                            who: param.who,
                            data: false
                        }
                    });
                }

                if ( res.statusCode >= 400 ) {
                    dispatch({
                        type: ReportFilterConst.UPDATE_SELECTS,
                        payload: {
                            who: param.who,
                            data: []
                        }
                    });

                    dispatch({
                        type: ReportFilterConst.SELECT_LOADED,
                        payload: {
                            who: param.who,
                            data: false
                        }
                    });
                }

            });
    };
}

export function getPaymentsList(param, bool=0) {
    return (dispatch) => {
        let sendData = {
                'method': 'getAllPayments'
            },
            sendParams = {};

        // Параметры фильтра
        if ( param.hasOwnProperty('merchantCatId') )    sendParams['merchant_category_id'] = param.merchantCatId;
        if ( param.hasOwnProperty('merchant') )         sendParams['merchant_id'] = param.merchant;
        if ( param.hasOwnProperty('merchantPointId') )  sendParams['merchant_point_id'] = param.merchantPointId;
        if ( param.hasOwnProperty('typeId') )           sendParams['instrument_type_id'] = param.typeId;
        if ( param.hasOwnProperty('paySource') )        sendParams['source_channel'] = param.paySource;
        if ( param.hasOwnProperty('acquirer') )         sendParams['bank_acquire'] = param.acquirer;
        if ( param.hasOwnProperty('dateFrom') )         sendParams['date_from'] = param.dateFrom;
        if ( param.hasOwnProperty('dateTo') )           sendParams['date_to'] = param.dateTo;
        if ( param.hasOwnProperty('isTest') )           sendParams['is_test'] = param.isTest;
        if ( param.hasOwnProperty('paymentStatus') )    sendParams['state'] = param.paymentStatus;
        if ( param.hasOwnProperty('offset') )           sendParams['offset'] = param.offset;
        if ( param.hasOwnProperty('limit') )            sendParams['limit'] = param.limit;
        if ( param.hasOwnProperty('onlyCount') )        sendParams['count'] = param.onlyCount;

        sendData['meta'] = sendParams;

        dispatch({
            type: ReportFilterConst.SHOW_HIDE_LOADER,
            payload: {
                who: 'paymentsListLoaded',
                data: true
            }
        });

        fetch('/api', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;charset=utf-8',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: '', cont: sendData})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.statusCode);

            if ( res.statusCode == 200 ) {
                console.log(res.body);

                if ( !sendParams.count ) {
                    dispatch({
                        type: ReportFilterConst.SET_ALL_PAYMENTS,
                        payload: res.body.data.list
                    });
                } else {
                    dispatch({
                        type: ReportFilterConst.SET_PAYMENTS_COUNT,
                        payload: res.body.data.count
                    });
                }

                dispatch({
                    type: ReportFilterConst.SHOW_HIDE_LOADER,
                    payload: {
                        who: 'paymentsListLoaded',
                        data: false
                    }
                });
            }

            if ( res.statusCode >= 400 ) {
                console.log(res);
            }

        });
    };
}

export function getReportLink(param) {
    return (dispatch) => {
        let sendData = {
                'method': 'generateReport'
            },
            sendParams = {};

        // Параметры фильтра
        if ( param.hasOwnProperty('merchantCatId') )    sendParams['merchant_category_id'] = param.merchantCatId;
        if ( param.hasOwnProperty('merchant') )         sendParams['merchant_id'] = param.merchant;
        if ( param.hasOwnProperty('merchantPointId') )  sendParams['merchant_point_id'] = param.merchantPointId;
        if ( param.hasOwnProperty('typeId') )           sendParams['instrument_type_id'] = param.typeId;
        if ( param.hasOwnProperty('paySource') )        sendParams['source_channel'] = param.paySource;
        if ( param.hasOwnProperty('acquirer') )         sendParams['bank_acquire'] = param.acquirer;
        if ( param.hasOwnProperty('dateFrom') )         sendParams['date_from'] = param.dateFrom;
        if ( param.hasOwnProperty('dateTo') )           sendParams['date_to'] = param.dateTo;
        if ( param.hasOwnProperty('onlyCount') )        sendParams['only_count'] = param.onlyCount;

        sendParams['is_test']   = param.hasOwnProperty('isTest')?param.isTest:'false';
        sendParams['state']     = param.hasOwnProperty('paymentStatus')?param.paymentStatus:'deposited';
        sendParams['offset']    = param.hasOwnProperty('offset')?param.offset:0;
        sendParams['limit']     = param.hasOwnProperty('limit')?param.limit:20;
        sendParams['count']     = param.hasOwnProperty('onlyCount')?param.onlyCount:false;

        sendData['meta'] = sendParams;

        dispatch({
            type: ReportFilterConst.SHOW_HIDE_LOADER,
            payload: {
                who: 'reportLinkLoaded',
                data: true
            }
        });

        fetch('/api', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;charset=utf-8',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: '', cont: sendData})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.statusCode);

            if ( res.statusCode == 200 ) {
                console.log(res.body);

                dispatch({
                    type: ReportFilterConst.REPORT_LINK,
                    payload: res.body.data.link
                });

                dispatch({
                    type: ReportFilterConst.SHOW_HIDE_LOADER,
                    payload: {
                        who: 'reportLinkLoaded',
                        data: false
                    }
                });
            }

            if ( res.statusCode >= 400 ) {
                console.log(res);
            }

        });
    };
}