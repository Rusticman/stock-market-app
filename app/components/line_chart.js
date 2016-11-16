import React, {Component, PropTypes } from 'react';
import Chart from 'chart.js';
import data from '../../data';


class LineChart extends Component{

componentWillMount(){
  this.props.initialAllStocks();
}
componentDidMount(){

setTimeout(() => {

  data.data.datasets = [...this.props.chartData, ...this.props.initialData];
  if(data.data.datasets.length > 0){
    const ctx = document.getElementById('chart');
    const lineGraphVar = new Chart(ctx, {type:'line', data:data.data})
    this.props.initialiseGraph(lineGraphVar);

  }
},2000);
}


render(){

   return(
     <canvas className={this.props.hideChart}  id="chart">
     </canvas>
   );


}
}
LineChart.propTypes = {
  chartData: PropTypes.array.isRequired,
  initialData: PropTypes.array.isRequired,
  hideChart: PropTypes.string.isRequired

};


export default LineChart;
