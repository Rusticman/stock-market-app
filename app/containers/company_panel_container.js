import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CompanyPanelForm from '../components/company_panel_form';
import CompanyPanelTags from '../components/company_panel_tags';

class CompanyPanelContainer extends Component {



  render () {
    return (
      <div className='companyPanelContainer'>
        <CompanyPanelForm errorOpacity={this.props.errorOpacity}
                          lineGraph={this.props.lineGraph}
                          initialData={this.props.initialData}
                          chartData={this.props.chartData}
                          changeGraph={this.props.changeGraph}
                          errorMessage={this.props.errorMessage}
                          showErrorMessage={this.props.showErrorMessage}
        />
        <CompanyPanelTags chartData={this.props.chartData}
                          initialData={this.props.initialData}
                          lineGraph={this.props.lineGraph}
                          deleteCompany={this.props.deleteCompany}
                          deleteCompanySocket={this.props.deleteCompanySocket}
                          changeGraph={this.props.changeGraph}
                          transparentChart={this.props.transparentChart}
                    />
      </div>
    );
  }
}

function mapStateToProps(state){

  return{
    initialData:state.data.initialData,
    chartData:state.data.chartData,
    errorOpacity:state.error.errorOpacity,
    lineGraph:state.data.lineGraph,
    errorMessage:state.error.errorMessage
  }
}

export default connect(mapStateToProps,actions)(CompanyPanelContainer)
