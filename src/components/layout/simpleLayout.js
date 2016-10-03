'use strict';

import React from 'react';

const SimpleLayout = WrapComponent => class extends React.Component {
	render() {
		return <WrapComponent {...this.props}/>;
	}
};

export default SimpleLayout;