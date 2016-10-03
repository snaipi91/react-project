import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as SummaryActions from '../../actions/summaryActions';

import UsersInfo from './cards/usersInfo';

class SummaryPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {

	}

	componentDidMount() {
		const {summaryActions} = this.props;
		summaryActions.getActiveUsersCount();
		summaryActions.getRegisteredUsersCount();
		summaryActions.getRepeatedUsersCount();
		summaryActions.getEngagedUsersCount();
	}

	render() {
		return (
			<div className="mdl-grid">
				<div className="mdl-cell mdl-cell--4-col">
					<UsersInfo info={this.props.usersInfo}/>
				</div>
			</div>
		);
	}
}

SummaryPage.propTypes = {
	summaryActions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	const usersInfo = {};
	const {
		registeredUsers,
		activeUsers,
		repeatedUsers,
		engagedUsers
	} = state.summary;

	usersInfo.activeUsers = activeUsers;
	usersInfo.registeredUsers = registeredUsers;
	usersInfo.repeatedUsers = repeatedUsers;
	usersInfo.engagedUsers = engagedUsers;

	return {
		usersInfo
	};
};

const mapDispatchToProps = dispatch => {
	return {
		summaryActions: bindActionCreators(SummaryActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);