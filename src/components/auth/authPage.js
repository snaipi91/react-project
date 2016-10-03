'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class AuthPage extends React.Component {
	render() {
		return (
			<h1>Auth page</h1>
		);
	}
}

AuthPage.propTypes = {

};

export default connect()(AuthPage);