'use strict';

import React from 'react';
import {connect} from 'react-redux';

class MainPage extends React.Component {
	render() {
		return (
			<h1>Main page</h1>
		);
	}
}

export default connect()(MainPage);