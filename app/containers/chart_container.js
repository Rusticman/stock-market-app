import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineChart from '../components/line_chart';
import * as actions from '../actions';
import Loader from 'react-loader';

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

  const {loaded}  = this.props;

    const loaderOptions = {
        lines: 13,
        length: 20,
        width: 10,
        radius: 30,
        scale: 1.00,
        corners: 1,
        color: 'white',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1,
        trail: 60,
        fps: 20,
        zIndex: 2e9,
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
    };
    return (
      <div className='chartContainer'>
      <Loader loaded={loaded} options={loaderOptions}>
      </Loader>
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
    socket:state.data.socket,
    loaded:state.data.loaded
  }
}

export default connect(mapStateToProps,actions)(ChartContainer);
