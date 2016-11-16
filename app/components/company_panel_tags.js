import React, { Component, PropTypes } from 'react';


class CompanyPanelTags extends Component{


deleteCompanyHelper(e){
const {chartData, initialData} = this.props;
if(chartData.length === 1 && initialData.length < 1 || chartData.length < 1 && initialData.length === 1){//checks how many are left and hides chart if nec.
  this.props.transparentChart();
}
this.props.deleteCompanySocket(e.target.id);
}

componentWillReceiveProps(nextProps){
    const  {initialData, chartData,lineGraph} = this.props;

if(initialData.length === 0 && nextProps.chartData.length === 0 && lineGraph !== null){
      return lineGraph.destroy();
    }
else{

  if(chartData.length > nextProps.chartData.length){
    const dataArray = [...nextProps.chartData, ...initialData];
    this.props.changeGraph(lineGraph, dataArray);
  }
  else if(initialData.length > nextProps.initialData.length){
    const dataArray = [...chartData, ...nextProps.initialData ];
    this.props.changeGraph(lineGraph, dataArray);
  }
}
}


renderCompanyTags(){
const data = [...this.props.chartData, ...this.props.initialData];
  return data.map((company,i) => {

    return(
      <div key={i} className="companyTags">
      <div className="deleteButtonWrapper"><button className="deleteButtons" id={company.label} onClick={this.deleteCompanyHelper.bind(this)}>x</button></div>
      <div className="companyTagText">{company.name}</div>
      <div className="companyTagText">{company.label}</div>
      </div>
    );
  })
}

render(){

  return (
    <div>
    {this.renderCompanyTags()}
    </div>
  );
}
}



export default CompanyPanelTags;
//onClick={props.deleteCompany.bind(this)}
