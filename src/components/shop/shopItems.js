'use strict';

import React from 'react';

class ShopItems extends React.Component{
    render() {

        console.log(this.props.data.items);

        if(this.props.data.items.length > 1) {

            var shopTemplate = this.props.data.items.map(function(item, index) {

                return (
                    <div className="shop__item" key={index}>
                        <p className="object__name"><span>Название магазина: </span>{item.Cells.Name}</p>
                        <p className="object__address"><span>Адрес: </span>{item.Cells.Address}</p>
                        <p className="object__district"><span>Округ: </span>{item.Cells.AdmArea}</p>
                        <p className="object__phone"><span>Телефон для связи:</span> {item.Cells.PublicPhone.PublicPhone}</p>
                        <p className="object__work-flow"><span>Рабочие часы:</span> {item.Cells.WorkingHours[0].Hours}</p>
                    </div>
                );

            });

        }

        return (
            <div className="shops">
                {shopTemplate};
            </div>
        );

    }
}

export default ShopItems;