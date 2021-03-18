const doorState ={
  state: 'ON'
}


const controllDoor = (state = doorState,action) => {

  switch(action.type){
    case 'DOORON' :
      return  state.state = 'ON'
    case 'DOOROFF' :
      return  state.state = 'OFF'
    default :
      return state.state
  }
}