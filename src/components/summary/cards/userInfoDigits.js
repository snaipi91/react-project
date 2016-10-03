'use strict';

import React, {PropTypes} from 'react';

const UserInfoDigits = (props) => {
	const {label, title, data} = props;

	let lTitle = title;
	if (!data.success)
		lTitle += ` Code: ${data.errors.code}. Message: ${data.errors.message}`;

	return (
		<div className="digits">
			<label>{label}</label>
			<span title={data.loading ? 'Данные загружаются' : lTitle} className={data.success ? '' : 'digits--error'}>
				{data.loading && <span className="material-icons rotate-animation">loop</span>}
				{
					!data.loading && !data.success &&
					<span className="material-icons material-icons--red">error</span>
				}
				{!data.loading && data.success && data.data.count}
			</span>
		</div>
	);
};

UserInfoDigits.defaultProps = {
	withSeparator: false
};

UserInfoDigits.propTypes = {
	title: PropTypes.string,
	label: PropTypes.string.isRequired,
	data: PropTypes.shape({
		loading: PropTypes.bool,
		data: PropTypes.object,
		error: PropTypes.bool,
		errorMessage: PropTypes.string
	}).isRequired
};

export default UserInfoDigits;