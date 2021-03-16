import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import AdminToolBar from './components/AdminToolBar';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import SignIn from './components/SignIn';
import Recovery from './components/Recovery';
import Dashboard from './components/Dashboard';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import './default.scss';

import { useAuth } from './context/AuthContext';


function App() {

  const { currentUser } = useAuth();

  return (
    <div className='App'>
      <Router>
        <AdminToolBar />
        <Header />

        <div className="main">
          <Switch>
            <Route path='/registration' render={() => currentUser ? <Redirect to='/' /> : <Registration /> } />
            <Route path='/login' render={() => currentUser ? <Redirect to='/' /> : <SignIn /> }/>
            <Route path='/recovery' component={Recovery} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <AdminRoute path='/admin' component={Admin} />
            <Route exact path='/' component={Homepage} />
          </Switch>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
