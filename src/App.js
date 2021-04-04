import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/userActions';

import WithAuth from './hoc/WithAuth';
import WithAdminAuth from './hoc/WithAdminAuth';

//pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

import AdminToolBar from './components/AdminToolBar';
import Header from './components/Header';
import Footer from './components/Footer';
import './default.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=> {
    const authListener = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
            const userRef = await handleUserProfile(userAuth);
            userRef.onSnapshot(snapshot => {
                dispatch(setCurrentUser({
                    id: snapshot.id,
                    ...snapshot.data()
                }));
            });
        }

        dispatch(setCurrentUser(userAuth));
    });

    return () => {
        authListener();
    };
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <div className='headerWrap'>
          <AdminToolBar />
          <Header />
        </div>

        <div className="main">
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/registration' render={() => <Registration /> } />
            <Route path='/login' render={() => <Login /> }/>
            <Route path='/recovery' component={PasswordReset} />
            <Route path='/dashboard' render={() => (
              <WithAuth>
                <Dashboard /> 
              </WithAuth>
            )} />
            <Route path='/admin' render={() => (
              <WithAdminAuth>
                <Admin />
              </WithAdminAuth>
            )} />
          </Switch>
        </div>

        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
