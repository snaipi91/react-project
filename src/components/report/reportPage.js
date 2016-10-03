import React, { Component } from 'react';
import {connect} from 'react-redux';

import ReportFilter from './reportFilter'

class ReportPage extends Component {
    render() {
        return (
            <ReportFilter />
        )
    }
}

export default connect()(ReportPage);