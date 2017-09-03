import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticate } from './actions';
import LoginForm from './LoginForm';

 class Login extends Component {
  state  = {
    redirect: false,
    response:''
  }

  /**
    login calls the authenticate action with parameters email and password
    and get the response from the server
  **/
  login = ({ email, password }) => {
      this.props.authenticate({ email, password }, (data)=> {
        this.setState({ response : data })
      })
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/posts" /> :
          <LoginForm login={this.login} error={this.state.response.error}/>
        }
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps, { authenticate })(Login);
