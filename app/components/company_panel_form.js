import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {getCompanyStocks} from '../actions';


class CompanyPanelForm extends Component {


  handleSymbolSubmit(value){
    const symbolUpper = value.symbol.toUpperCase();
    const  {initialData, chartData} = this.props;
    const dataArray = [...initialData, ...chartData];

    var test = true;
  for(var i = 0; i < dataArray.length ; i++){
    if(dataArray[i].label === symbolUpper){
     test = false;//if already a symbol then test is false and will not get stocks
      break;
    }
  }
 if(test){
     this.props.dispatch(getCompanyStocks(value.symbol));//figure out if the symbol is already there
 }
 else{
     this.props.showErrorMessage("This company already exists") //run action that shows the symbol is already there
 }

  }


  componentWillReceiveProps(nextProps){
      const  {initialData, chartData,lineGraph} = this.props;
      const dataArray = [...nextProps.chartData, ...initialData];
if(chartData.length < nextProps.chartData.length){
   this.props.changeGraph(lineGraph, dataArray);
  }
  }

  render () {
    const {handleSubmit} = this.props;

    return (

        <form className="searchForm" autoComplete="off" onSubmit={handleSubmit(this.handleSymbolSubmit.bind(this))}>
          <Field name="symbol" className="textInput" placeholder="type stock symbol here..." type="text"  component="input" label="Symbol"/>
          <button action="submit" className="submitButton">Add Stocks</button>
          <div className={this.props.errorOpacity + " errorMessage"}>{this.props.errorMessage}</div>
        </form>

    );
  }
}



export default reduxForm({
  form: 'searchSymbolForm'
})(CompanyPanelForm)
