import {
ERROR_MESSAGE,
ERROR_OPACITY,
HIDE_CHART
} from '../actions/types';


const INITIAL_STATE =  {
errorOpacity:'hideError',
errorMessage:'Words to initialise',
hideChart:''
}

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case ERROR_OPACITY:
      return {...state, errorOpacity:action.payload}
    case ERROR_MESSAGE:
      return {...state, errorMessage:action.payload}
    case HIDE_CHART:
      return {...state, hideChart:action.payload}
  }
        return state;
}
