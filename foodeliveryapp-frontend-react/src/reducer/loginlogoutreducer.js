export const initialState = {
    userDetails: [],
    loggedIn: false
  };
  
  const loginLogoutReducerFunction = (state = initialState, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          userDetails: action.payload,
          loggedIn: true
        };
  
      case "logout":
        return {
          ...state,
          userDetails: [],
          loggedIn: false
        };
  
      default:
        return state;
    }
  };
  
  export default loginLogoutReducerFunction;