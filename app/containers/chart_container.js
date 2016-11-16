import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineChart from '../components/line_chart';
import * as actions from '../actions';

class ChartContainer extends Component {
 componentDidMount(){

   this.props.socket.on('company_received', function (company) {//listener for other companies
     this.props.receiveCompany(company);
   }.bind(this));

   this.props.socket.on('deleted_company_received', function(symbol){
      const {chartData, initialData} = this.props;
     this.props.deleteCompany(chartData,initialData,symbol);//send id to remove relevant data object
   }.bind(this));
 }


  render () {//passed down action initialAllStocks
    return (
      <div className='chartContainer'>
        <LineChart chartData={this.props.chartData}
                    initialData={this.props.initialData}
                    initialAllStocks={this.props.initialAllStocks}
                    lineGraph={this.props.lineGraph}
                    removeGraph={this.props.removeGraph}
                    initialiseGraph={this.props.intialiseGraph}
                    hideChart={this.props.hideChart}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    chartData:state.data.chartData,
    initialData:state.data.initialData,
    lineGraph:state.data.lineGraph,
    hideChart:state.error.hideChart,
    socket:state.data.socket
  }
}

export default connect(mapStateToProps,actions)(ChartContainer);
