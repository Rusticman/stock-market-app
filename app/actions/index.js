import axios from 'axios';
import Chart from 'chart.js';
import data from '../../data';
import {
  CHART_DATA,
  INITIAL_DATA,
  DELETE_FROM_CHART,
  ERROR_OPACITY,
  LINE_GRAPH,
  ERROR_MESSAGE,
  HIDE_CHART,
  SEND_MESSAGE,
  SEND_INITIAL_DATA,
  SYMBOL
} from './types';


const ROOT_URL = 'https://stock-server.herokuapp.com';

/*data reducers start */

export function getCompanyStocks (symbol) {
return function(dispatch){
  axios.get(`${ROOT_URL}/stocks/${symbol}`)
  .then(response => {
    if(response.data.success === false){
             dispatch({type:ERROR_MESSAGE, payload:"Could not find any companies matching your search query"})
             dispatch({type:ERROR_OPACITY, payload:'showError'})
      return setTimeout(() => dispatch({type:ERROR_OPACITY, payload:'hideError'}),3000)
    }
    dispatch({type:HIDE_CHART, payload:''})
    dispatch({type:SEND_MESSAGE,payload:response.data.success});//this sends to socketio which responds by sending it to everyone
  //  dispatch({ type:CHART_DATA, payload:response.data.success});


  })
  .catch(()=>{
 console.error('didnt work sorry.');
  })

}
}

export function receiveCompany(company){//received from socketio

  return{
    type:CHART_DATA,//object
    payload:company
  }
}

export function deleteCompanySocket(symbol){

  return{
    type:SYMBOL,//array
    payload:symbol
  }
}


export function initialAllStocks(){
  return function(dispatch){
      axios.get(`${ROOT_URL}/allstocks`)
      .then(response => {
        if(response.data.success === false){
          console.log('there are no companies in the database');
          return dispatch({type:HIDE_CHART, payload:'transparent'});
        }
       dispatch({ type:INITIAL_DATA, payload:response.data.success})

      })
      .catch(() => {
        console.error('failed to retrieve all the stocks');
      })

  }
}

export function deleteCompany(chartData, initialData, symbol){
  return function(dispatch){
  const isSymbolInChart =[];
   chartData.forEach((elem,i) => {//find out if symbol is in chartData
     if(elem.label === symbol){
       return isSymbolInChart.push({symbol:symbol,index:i});
     }
   });
   if(isSymbolInChart.length !== 0){//if in chartData, slice out of array
      const index = isSymbolInChart[0].index;
      const newChartData = []; //push new array into this
      if(index === 0){
        const data = chartData.slice(index + 1);//removes first item from array
        newChartData.push(data);
      }
      else if(index === (chartData.length - 1)){
        const data = chartData.slice(0, chartData.length -1);
        newChartData.push(data);
      }
      else{
        const slice1 = chartData.slice(0 ,index);
        const slice2 = chartData.slice( - ((chartData.length - 1) - index)) //this removes the unnecessary

        const concatArray = slice1.concat(slice2);
        newChartData.push(concatArray);

      }
        axios.delete(`${ROOT_URL}/deletecompany/${symbol}`)
        .then(response => {
          if(response.data.success === true){
          return dispatch({type:DELETE_FROM_CHART, payload:newChartData[0]});

          }

        })
        .catch(() => {
            console.error('failed to delete company from chart database')
        })

   }
   else{//remove from initialData
      const isSymbolInInitial = [];
     initialData.forEach((elem,i) => {
        if(elem.label === symbol){
           return isSymbolInInitial.push({symbol:symbol,index:i});
        }
     });
     const index = isSymbolInInitial[0].index;
    const newInitialData = [];
     if(index === 0){//deletes first item in initialData
       const data = initialData.slice(1);
       newInitialData.push(data);
     }
     else if(index === (initialData.length - 1)){//deletes last item in initialData
       const data = initialData.slice(0,initialData.length - 1);
       newInitialData.push(data);
     }
     else{//deletes any other item in the array
       const slice1 = initialData.slice(0 ,index); //can index be reached from here???
       const slice2 = initialData.slice( - ((initialData.length - 1) - index)); //this removes the unnecessary

       const concatArray = slice1.concat(slice2);
       newInitialData.push(concatArray);

     }
     axios.delete(`${ROOT_URL}/deletecompany/${symbol}`)
     .then(response => {
       if(response.data.success === true){
        dispatch({type:INITIAL_DATA, payload:newInitialData[0]})
       }

     })
     .catch((err) => {
         console.error('failed to delete company from initial database',err)
     })

   }


  }
}

export function intialiseGraph(lineGraphVariable){
return function(dispatch){
dispatch({
    type:LINE_GRAPH,
    payload:lineGraphVariable
  })

}
}

export function changeGraph(lineGraph,dataArray){
  return function(dispatch){
    if(lineGraph !== null){
      lineGraph.destroy();//destroy and create new chart
      }

if(dataArray.length > 0){
  const ctx = document.getElementById('chart');//create chart again and pass new chart into reducer
  data.data.datasets = dataArray;
  const lineGraphVar = new Chart(ctx, {type:'line', data:data.data})
  return dispatch({type:LINE_GRAPH,
                  payload:lineGraphVar})
}


  }
}

/*data reducers end */

/*style reducers start */

export function showErrorMessage(message){
  return function(dispatch){
    dispatch({
      type:ERROR_MESSAGE,
      payload:message
    })
    dispatch({
      type:ERROR_OPACITY,
      payload:'showError'
    })
return setTimeout(() => dispatch({type:ERROR_OPACITY, payload:'hideError'}),3000)

  }
}

export function transparentChart(){
  return function(dispatch){

    dispatch({type:HIDE_CHART,
              payload:'transparent'
                })
  }
}

export function opaqueChart(){
  return function(dispatch){

    dispatch({
      type:HIDE_CHART,
      payload:''
    })
  }
}

/*style reducers end */
