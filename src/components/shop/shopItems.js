'use strict';

import React from 'react';

class ShopItems extends React.Component{
    render() {

        console.log(this.props.items);

        this.props.items.items.map(function(item, index) {

            return (
                <div className="shop__item" key={index}>
                    <p className="object__name"><span>Название магазина: </span>{item.Cells}</p>
                </div>
            )

        }, this)

    }
}

export default ShopItems;