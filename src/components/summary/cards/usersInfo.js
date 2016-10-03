'use strict';

import React, {PropTypes} from 'react';

import Digits from './userInfoDigits';

import './cards.scss';

const UsersInfo = ({info}) => {
	const {registeredUsers, engagedUsers, activeUsers, repeatedUsers} = info;

	return (
		<div className="users-card mdl-card mdl-shadow--2dp">
			<div className="mdl-card__title"/>
			<div className="mdl-card__supporting-text">
				<Digits label="Всего" title="Зарегистрированные пользователи" data={registeredUsers}/>
				<Digits label="Активных" title="Активные пользователи" data={activeUsers}/>
				<Digits label="Повторных" title="Повторные пользователи" data={repeatedUsers}/>
				<Digits label="Вовлечённых" title="Вовлечённые пользователи" data={engagedUsers}/>
			</div>
		</div>
	);
};

UsersInfo.propTypes = {
	info: PropTypes.object
};


export default UsersInfo;

