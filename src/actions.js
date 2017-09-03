import myUserData from './test_user.json';

export const LOGIN = 'LOGIN';

/**
 handles response coming from server
**/
function handleResponse(response) {
  console.log(response)
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export const LOGGEDIN = 'LOGGEDIN';
export function loggedIn(user, token) {
   user.token = token
   user.isAuthenticated = true
   return {
      type: LOGGEDIN,
      user
   }
}

export const LOGINFAIL = 'LOGINFAIL';
export function loginFailed(data) {
   let user = {};
   user.authError = data
   user.isAuthenticated = false
   return {
      type: LOGINFAIL,
      user
   }
}

export function authenticate(data, callback) {
  return dispatch => {
    if(myUserData.email === data.email && myUserData.password === data.password){
      dispatch(loggedIn(myUserData, myUserData.token))
    } else {
      data.error = "Authentication failed"
      dispatch(loginFailed(data))
      callback(data)
    }
  }
}

export const LOGOUT = 'LOGOUT';
export function logout() {
   return {
      type: LOGOUT
   }
}

export function logoutUser(data) {
  return dispatch => {
    dispatch(logout())
  }
}
