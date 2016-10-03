"use strict";

import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from 'react-select';

import * as ReportFilterActions from '../../actions/reportFilter';
import {deepEqual} from '../../api/objects';


class ReportFilter extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const { reportFilterActions } = this.props;
        const { loadFilterSelects } = reportFilterActions;

        loadFilterSelects({ method: 'getMerchants', type: 'merchants', who: 'merchant', func: (item)=>{
            return {
                label: item.name,
                value: item.id,
                catId: item.category_id
            }}
        });
        loadFilterSelects({ method: 'getMerchantCategories', who: 'merchantCat', func: (item)=>{
            return {
                label: item.name,
                value: item.id
            }}
        });
        loadFilterSelects({ method: 'getMerchantPoints', who: 'merchantPoints', func: (item)=>{
            return {
                label: item.name,
                value: item.id,
                merchantId: item.merchant_id
            }}
        });
        loadFilterSelects({ method: 'getBankAcquires', who: 'acquirer', func: (item)=>{
            return {
                label: item.name,
                value: item.name
            }}
        });
        loadFilterSelects({ method: 'getSourceChannels', who: 'paySource', func: (item)=>{
            return {
                label: item.name,
                value: item.name
            }}
        });
        loadFilterSelects({ method: 'getPaymentStates', who: 'paymentStatus', func: (item)=>{
            return {
                label: item.name,
                value: item.name
            }}
        });
        loadFilterSelects({ method: 'getInstrumentTypes', who: 'typeTools', func: (item)=>{
            return {
                label: item.name,
                value: item.id
            }}
        });
    }

    componentDidUpdate() {
        const { reportFilterActions, reportFilter } = this.props;
        // const { filterRequest } = reportFilter;
        const { merchantSort, merchantPointSort, setClearDownload } = reportFilterActions;

        if ( !reportFilter.merchantCat.selected && reportFilter.merchant.sort.length ) merchantSort();
        if ( !reportFilter.merchant.selected && reportFilter.merchantPoints.sort.length ) merchantPointSort();

        if ( reportFilter.reportLinkDownload ) {
            window.location.href = reportFilter.reportLinkDownload;

            setClearDownload();
        }
    }

    _selectChange(options, hw) { console.log(options);
        const { reportFilterActions, reportFilter } = this.props;
        const { selectSelected, setFilterRequest, merchantSort, merchantPointSort } = reportFilterActions;

        selectSelected(options, hw);
        setFilterRequest(options, hw);

        if ( hw ==  'merchantCat' ) {
            merchantSort('catId', options.value);
            selectSelected(null, 'merchant');
            selectSelected(null, 'merchantPoints');
        }

        if ( hw ==  'merchant' ) {
            merchantPointSort('merchantId', options.value);
            selectSelected(null, 'merchantPoints');

            if ( options.catId ) {
                let getMerchantCatSelect = reportFilter.merchantCat.options.filter((item)=>{
                    return item.value == options.catId;
                });

                selectSelected(getMerchantCatSelect[0], 'merchantCat');
            }
        }

        if ( hw ==  'merchantPoints' ) {
            if ( !reportFilter.merchant.sort.length && options.merchantId ) {
                let getMerchantSelect = reportFilter.merchant.options.filter((item)=>{
                    return item.value == options.merchantId;
                });

                selectSelected(getMerchantSelect[0], 'merchant');

                let catId = getMerchantSelect[0].catId;
                if ( catId ) {
                    let getMerchantCatSelect = reportFilter.merchantCat.options.filter((item)=>{
                        return item.value == catId;
                    });

                    selectSelected(getMerchantCatSelect[0], 'merchantCat');
                }
            }
        }

        setTimeout(()=>this._getPaymentsListCount(), 600);
    }

    setSelect(value, lp) {
        if ( value && lp ) {
            this.setState( {
                [lp]: value
            });
        }
    }

    _isTest() {
        const { reportFilterActions } = this.props;
        const { changeIsTest, setFilterRequest } = reportFilterActions;

        let checked = this.refs.testingpay.checked;

        changeIsTest(checked);
        setFilterRequest(checked, 'testingPays');

        setTimeout(()=>this._getPaymentsListCount(), 600);
    }

    _getFilterRequestParam() {
        const { reportFilter } = this.props;
        const { filterRequest } = reportFilter;

        let params = {};

        if ( filterRequest.hasOwnProperty('merchantCat') && filterRequest.merchantCat )
            params['merchantCatId'] = filterRequest.merchantCat.value;

        if ( filterRequest.hasOwnProperty('merchant') && filterRequest.merchant )
            params['merchant'] = filterRequest.merchant.value;

        if ( filterRequest.hasOwnProperty('merchantPoints') && filterRequest.merchantPoints )
            params['merchantPointId'] = filterRequest.merchantPoints.value;

        if ( filterRequest.hasOwnProperty('typeTools') && filterRequest.typeTools )
            params['typeId'] = filterRequest.typeTools.value;

        if ( filterRequest.hasOwnProperty('paySource') && filterRequest.paySource )
            params['paySource'] = filterRequest.paySource.value;

        if ( filterRequest.hasOwnProperty('acquirer') && filterRequest.acquirer )
            params['acquirer'] = filterRequest.acquirer.value;

        if ( filterRequest.hasOwnProperty('paymentStatus') && filterRequest.paymentStatus )
            params['paymentStatus'] = filterRequest.paymentStatus.value;

        if ( filterRequest.hasOwnProperty('testingPays') )
            params['isTest'] = filterRequest.testingPays;

        return params;
    }

    _getPaymentsList() {
        const { reportFilterActions } = this.props;
        const { getPaymentsList } = reportFilterActions;

        let params = this._getFilterRequestParam();

        getPaymentsList(params);
    }

    _getPaymentsListCount() {
        const { reportFilterActions } = this.props;
        const { getPaymentsList } = reportFilterActions;

        let params = this._getFilterRequestParam();

        getPaymentsList(Object.assign({}, params, {onlyCount: 1}));
    }

    _getReportLink() {
        const { reportFilterActions } = this.props;
        const { getReportLink } = reportFilterActions;

        let params = this._getFilterRequestParam();

        getReportLink(params);
    }

    render() {
        const { reportFilter } = this.props;
        const {
            merchant,
            merchantCat,
            merchantPoints,
            typeTools,
            acquirer,
            paySource,
            paymentStatus,
            paymentsList,
            paymentsCount,
            paymentsListLoaded,
            reportLinkLoaded
        } = reportFilter;

        return (
            <div className="report-filter cont cont--padding">

                <form name="report-filter-form">
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--4-col graybox report-filter__points">
                            <div
                                className="mdl-badge mdl-badge--no-margin"
                                data-badge={merchantCat.sort.length?merchantCat.sort.length:merchantCat.options?merchantCat.options.length:0}>
                                <Select
                                    name="report-categories-merchants"
                                    placeholder="Категорий мерчантов"
                                    value={merchantCat.selected?merchantCat.selected:null}
                                    options={merchantCat.sort.length?merchantCat.sort:merchantCat.options.length?merchantCat.options:[]}
                                    onChange={(value)=>{
                                        this.setSelect(value, 'merchantCat');
                                        this._selectChange(value, 'merchantCat');
                                    }}
                                />
                            </div>

                            {merchantCat.loaded &&
                            <div className="loader-block"><i className='loader loader--middle' /></div>}
                        </div>

                        <div className="mdl-cell mdl-cell--4-col graybox report-filter__points">
                            <div
                                className="mdl-badge mdl-badge--no-margin"
                                data-badge={merchant.sort.length?merchant.sort.length:merchant.options?merchant.options.length:0}>
                                <Select
                                    name="report-merchant"
                                    placeholder="Мерчант"
                                    value={merchant.selected?merchant.selected:null}
                                    options={merchant.sort.length?merchant.sort:merchant.options.length?merchant.options:[]}
                                    onChange={(value)=>{
                                        this.setSelect(value, 'merchant');
                                        this._selectChange(value, 'merchant');
                                    }}
                                />
                            </div>
                            {merchant.loaded &&
                            <div className="loader-block"><i className='loader loader--middle' /></div>}
                        </div>

                        <div className="mdl-cell mdl-cell--4-col graybox report-filter__points">
                            <div
                                className="mdl-badge mdl-badge--no-margin"
                                data-badge={merchantPoints.sort.length?merchantPoints.sort.length:merchantPoints.options?merchantPoints.options.length:0}>
                                <Select
                                    name="report-merchant-points"
                                    placeholder="Мерчант поинтов"
                                    value={merchantPoints.selected?merchantPoints.selected:null}
                                    options={merchantPoints.sort.length?merchantPoints.sort:merchantPoints.options.length?merchantPoints.options:[]}
                                    onChange={(value)=>{
                                        this.setSelect(value, 'merchantPoints');
                                        this._selectChange(value, 'merchantPoints');
                                    }}
                                />
                            </div>
                            {merchantPoints.loaded &&
                            <div className="loader-block"><i className='loader loader--middle' /></div>}
                        </div>

                        <div className="mdl-cell mdl-cell--4-col graybox report-filter__points">
                            <div
                                className="mdl-badge mdl-badge--no-margin"
                                data-badge={typeTools.sort.length?typeTools.sort.length:typeTools.options?typeTools.options.length:0}>
                                <Select
                                    name="report-tool-type"
                                    placeholder="Тип инструмента"
                                    value={typeTools.selected?typeTools.selected:null}
                                    options={typeTools.sort.length?typeTools.sort:typeTools.options.length?typeTools.options:[]}
                                    onChange={(value)=>{
                                        this.setSelect(value, 'typeTools');
                                        this._selectChange(value, 'typeTools');
                                    }}
                                />
                            </div>
                            {typeTools.loaded &&
                            <div className="loader-block"><i className='loader loader--middle' /></div>}
                        </div>

                        <div className="mdl-cell mdl-cell--4-col graybox report-filter__points">
                            <div
                                className="mdl-badge mdl-badge--no-margin"
                                data-badge={acquirer.sort.length?acquirer.sort.length:acquirer.options?acquirer.options.length:0}>
                                <Select
                                    name="report-acquiring-bank"
                                    placeholder="банк-эквайер"
                                    value={acquirer.selected?acquirer.selected:null}
                                    options={acquirer.sort.length?acquirer.sort:acquirer.options.length?acquirer.options:[]}
                                    onChange={(value)=>{
                                        this.setSelect(value, 'acquirer');
                                        this._selectChange(value, 'acquirer');
                                    }}
                                />
                            </div>
                            {acquirer.loaded &&
                            <div className="loader-block"><i className='loader loader--middle' /></div>}
                        </div>

                        <div className="mdl-cell mdl-cell--4-col graybox report-filter__points">
                            <div
                                className="mdl-badge mdl-badge--no-margin"
                                data-badge={paySource.sort.length?paySource.sort.length:paySource.options?paySource.options.length:0}>
                                <Select
                                    name="report-payment-source"
                                    placeholder="Источник платежа"
                                    value={paySource.selected?paySource.selected:null}
                                    options={paySource.sort.length?paySource.sort:paySource.options.length?paySource.options:[]}
                                    onChange={(value)=>{
                                        this.setSelect(value, 'paySource');
                                        this._selectChange(value, 'paySource');
                                    }}
                                />
                            </div>
                            {paySource.loaded &&
                            <div className="loader-block"><i className='loader loader--middle' /></div>}
                        </div>

                        <div className="mdl-cell mdl-cell--4-col graybox report-filter__points">
                            <div
                                className="mdl-badge mdl-badge--no-margin"
                                data-badge={paymentStatus.sort.length?paymentStatus.sort.length:paymentStatus.options?paymentStatus.options.length:0}>
                                <Select
                                    name="report-payment-source"
                                    placeholder="Статус платежа"
                                    value={paymentStatus.selected?paymentStatus.selected:null}
                                    options={paymentStatus.sort.length?paymentStatus.sort:paymentStatus.options.length?paymentStatus.options:[]}
                                    onChange={(value)=>{
                                        this.setSelect(value, 'paymentStatus');
                                        this._selectChange(value, 'paymentStatus');
                                    }}
                                />
                            </div>
                            {paymentStatus.loaded &&
                            <div className="loader-block"><i className='loader loader--middle' /></div>}
                        </div>

                        <div className="mdl-cell mdl-cell--3-col graybox report-filter__points report-filter__points--checkboxes">
                            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="testingpay">
                                <input onChange={this._isTest.bind(this)} ref="testingpay" type="checkbox" id="testingpay" name="testingpay" className="mdl-checkbox__input" />
                                <span className="mdl-checkbox__label">Тестовые платежи</span>
                            </label>
                        </div>
                    </div>
                    <div className="mdl-grid submit-form">
                        <div className="mdl-cell mdl-cell--6-col graybox">
                            <div className="buttons-block">
                                <span onClick={this._getPaymentsList.bind(this)} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                                    Применить {paymentsCount>0?'('+paymentsCount+')':''}
                                </span>
                                {paymentsListLoaded &&
                                <div className="loader-block loader-block--white"><i className='loader loader--middle' /></div>}
                            </div>
                        </div>
                        <div className="mdl-cell mdl-cell--6-col graybox text-right">
                            <div className="buttons-block">
                                <span
                                    onClick={this._getReportLink.bind(this)}
                                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--loadeed">
                                    Скачать
                                </span>
                                {reportLinkLoaded &&
                                <div className="loader-block loader-block--white"><i className='loader loader--middle' /></div>}
                            </div>
                            {reportFilter.reportLink &&
                            <a href={reportFilter.reportLink}>
                                Скачать {reportFilter.reportLink.split('/')[reportFilter.reportLink.split('/').length]}
                            </a>}
                        </div>
                    </div>
                </form>
                {paymentsList.length>0 &&
                <div className="mdl-grid payments-list">
                    <div className="mdl-cell mdl-cell--12-col graybox">
                        <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
                            <thead>
                                <tr>
                                    <th className="mdl-data-table__cell--non-numeric">Названия</th>
                                    <th>Время</th>
                                    <th>Сумма</th>
                                    <th>Тип оплаты</th>
                                    <th>Merchant point</th>
                                    <th>Статус</th>
                                    <th>Коммисия</th>
                                    <th>Транзакция</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentsList.map((item)=>{
                                    return (
                                        <tr key={item.id}>
                                            <td className="mdl-data-table__cell--non-numeric">{item.username}</td>
                                            <td>{item.payment_date + ' ' + item.payment_time}</td>
                                            <td>{item.sum}</td>
                                            <td>{item.instrument_type}</td>
                                            <td>{item.merchant_point}</td>
                                            <td>{item.status}</td>
                                            <td>{item.commission}</td>
                                            <td>{item.transaction}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>}
            </div>
        );
    }
}

ReportFilter.propTypes = {
    reportFilterActions:    PropTypes.object.isRequired,
    reportFilter:           PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        reportFilter: state.reportsFilter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reportFilterActions: bindActionCreators(ReportFilterActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportFilter);