import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import './App.css';
import { logoutUser } from './actions';
import Login from './Login';
import Home from './Home';
import AboutUs from './AboutUs'

/**
  Depending on Authenticated user it will route to the respective components.
**/
function PrivateRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class App extends Component {
  state = {
    loading: false,
  }

  render() {
    const aboutUsChild = ({ match }) => (
      <div>
        <h3>{match.params.child} renders here...</h3>
      </div>
    )

    const AboutUsWithChild = ({ match }) => (
      <div>
        <AboutUs></AboutUs>
        <Route path={`${match.url}/:child`} component={aboutUsChild}/>
      </div>
    ) 
    return <BrowserRouter>
    {
      this.state.loading === true ? <h1>Loading</h1> : (
        <div>
        { this.props.isAuthenticated ?
          <nav>
            <div className="">
              <ul>
                <li>
                  {this.props.isAuthenticated
                    ? <a onClick={() => {
                          this.props.logoutUser()
                        }} >Logout</a>
                    : <span>
                        <Link to="/login" >Login</Link>
                      </span>}
                </li>
                <li>
                  <ActiveLink activeOnlyWhenExact to="/aboutus" label="AboutUs" />
                </li>
                <li>
                  <a className="text-capitalize">Hi, {this.props.currentUser.userName}</a>
                </li>
                <li className="logo"><Link to="/"><img className="App-logo" src="favicon.ico" /></Link></li>
              </ul>
            </div>
          </nav> : <h1></h1> }
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute isAuthenticated={this.props.isAuthenticated} path='/login' component={Login} />
                <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/aboutus" component={AboutUsWithChild} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      )
    }
    </BrowserRouter>
  }
}

function mapStateToProps(state, props) {
  return { isAuthenticated : state.user.token ? true : false, currentUser: state.user };
}

export default connect(mapStateToProps, { logoutUser })(App);
