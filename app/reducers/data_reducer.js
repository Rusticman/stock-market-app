import {
CHART_DATA,
INITIAL_DATA,
DELETE_FROM_CHART, //deletes from chartData
LINE_GRAPH,
SEND_MESSAGE,
SEND_INITIAL_DATA,
SYMBOL
} from '../actions/types';


const INITIAL_STATE =  {
socket: io.connect('https://stock-server.herokuapp.com'),
chartData:[],
initialData:[],
lineGraph:null
}

export default function(state = INITIAL_STATE,action){
  switch(action.type){
    case SEND_MESSAGE:
         state.socket.emit('new_company', action.payload);
         return state;
    case SYMBOL:
        state.socket.emit('delete', action.payload);
        return state;
    case CHART_DATA:
        return {...state, chartData:[...state.chartData, action.payload]}//this keeps previous objects and adds new object
    case INITIAL_DATA:
        return {...state, initialData:action.payload}//should be an array
    case DELETE_FROM_CHART:
        return {...state, chartData:action.payload}
    case LINE_GRAPH:
        return {...state, lineGraph:action.payload}
}
        return state;
}
