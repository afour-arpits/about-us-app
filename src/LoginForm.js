import React, { Component } from 'react'

export default class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password :"",
        error: props.error ? props.error : null
      }
      this.updateEmailState = this.updateEmailState.bind(this);
      this.updatePasswordState = this.updatePasswordState.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this)
   }

  componentWillReceiveProps ({error}) {
    if(error)
      this.setState({error: error})
  }

  /**
    handleSubmit a callback with login method which passes parameters to the container component
  **/
  handleSubmit() {
    const { email, password } = this.state;
    const reg = /\S+@\S+\.\S+/;

    if( !email || email === "" || !reg.test(email))
      this.setState({error: "Invalid email"})
    else if ( !password || password === "" )
      this.setState({error: "Invalid password"})
    else
      this.props.login({ email, password })
  }

  updateEmailState(e) {
      this.setState({email: e.target.value});
      this.setState({error: null})
   }

  updatePasswordState(e) {
      this.setState({password: e.target.value});
      this.setState({error: null})
   }

  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Login </h1>
        <form >
          <div className="form-group">
            <label>Email</label>
            <input name="email" ref="email" className="form-control email"value={this.state.email}
               onChange={this.updateEmailState}  placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control password"
             value={this.state.password}
               onChange={this.updatePasswordState}
             placeholder="Password" />
          </div>
          {
            this.state.error ?
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;<span className="error-message">{this.state.error}</span>
            </div> : ''
          }
        </form>
        <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-primary loginbtn">Login</button>
      </div>
    )
  }
}
