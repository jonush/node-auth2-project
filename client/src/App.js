import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Welcome}/>

        <Route path='/signup' component={SignUp} />

        <Route path='/login' component={Login} />

        <PrivateRoute path='/users' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
