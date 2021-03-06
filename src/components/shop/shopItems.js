'use strict';

import React from 'react';
import {Link} from 'react-router';

class ShopItems extends React.Component{

    render() {

        if(this.props.data.items.length > 1) {

            var popup = this.props.popup;
            var shopTemplate = this.props.data.items.map(function(item, index) {

                return (
                    <Link to={`/shop/${index}`} key={index}>
                        <div onClick={() => popup.simpleDialog.show()} className={"col-lg-4 " + "col-md-6 " + "col-sm-6 " + "col-xs-12"}>
                            <div className="object__component">
                                <p className="object__name"><span>Название магазина: </span>{item.Cells.Name}</p>
                                <p className="object__address"><span>Адрес: </span>{item.Cells.Address}</p>
                                <p className="object__district"><span>Округ: </span>{item.Cells.AdmArea}</p>
                                <p className="object__phone"><span>Телефон для связи:</span> {item.Cells.PublicPhone[0].PublicPhone}</p>
                                <p className="object__work-flow"><span>Рабочие часы:</span> {item.Cells.WorkingHours[0].Hours}</p>
                            </div>
                        </div>
                    </Link>
                );

            });

        }

        return (
            <div className="shops">
                {shopTemplate}
            </div>
        );

    }
}

export default ShopItems;