'use strict';

import React, { Component } from 'react';
import {Link} from 'react-router';


import './authorizedLayout.scss';

const AuthorizedLayout = (WrapComponent, title) => class extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		window['componentHandler'].upgradeDom();
	}

	render() {

		return (
			<div className="mdl-layout__container" ref="container">
				<div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
					<header className="mdl-layout__header">
						<div className="mdl-layout__header-row">
							<span className="mdl-layout-title white-title">
								{title}
							</span>
						</div>
					</header>
					<div className="mdl-layout__drawer">
						<span className="mdl-layout__title">
							<a href="/" className="paymo-logo" title="PAYMO CRM SYSTEM" />
						</span>
						<nav className="mdl-navigation">
							<Link to="/" className="mdl-navigation__link">Отчет</Link>
						</nav>
					</div>
					<main className="mdl-layout__content">
						<WrapComponent {...this.props}/>
					</main>
				</div>
			</div>
		);
	}
};

AuthorizedLayout.defaultProps = {
	componentHandler: window['componentHandler']
};

export default AuthorizedLayout;