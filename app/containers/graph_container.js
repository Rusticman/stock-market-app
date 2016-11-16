import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from './chart_container';
import CompanyPanel from './company_panel_container';

class GraphContainer extends Component {
  render () {
    return (
      <div className='graphContainer'>
        <h1>Annual Stock Check</h1><img src="./app/assets/img/logo.png" className="logo" />
          <div className="instructions"><span>Instruction.</span><br/> Type stock symbol into search bar and click 'get stock' for a 12 month breakdown of stock value in US dollars ($).</div>
        <Chart />
        <CompanyPanel />
      </div>
    );
  }
}

export default connect()(GraphContainer);
