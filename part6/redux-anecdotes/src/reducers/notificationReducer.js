let timeoutId
const notificationReducer = (state = '', action) => {
    switch(action.type) {
      case 'NEW_NOTIFICATION':
        return action.data.content
      case 'REMOVE_NOTIFICATION':
        return ''
      default:
        return state
    }
  }
  
  export const createNotification = (content, time) => {
    return async dispatch => {
      dispatch({type: 'NEW_NOTIFICATION',
      data: {
        content}})
    clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION',
              })
          }, time*1000);
    }
  }
  
  export default notificationReducer