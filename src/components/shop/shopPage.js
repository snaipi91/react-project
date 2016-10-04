'use strict';

import React, {Component} from 'react';

class Shop extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handler = this.handler.bind(this);
    }

    render() {
        return (
            <div>My component</div>
        );
    }
}

export default Shop;