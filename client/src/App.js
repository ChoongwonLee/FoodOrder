import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import CustomerForm from './components/customer/CustomerForm';
import AdminHome from './components/pages/AdminHome';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import MenuSelection from './components/customer/MenuSelection';
import SelectDetail from './components/customer/SelectionDetail/SelectDetail';
import Cart from './components/customer/Cart';
import OrderConfirmation from './components/customer/OrderConfirmation';
import NotFound from './components/pages/NotFound';
import MenuState from './context/menu/MenuState';
import AuthState from './context/auth/AuthState';
import OrderState from './context/order/OrderState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <MenuState>
        <OrderState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <Route exact path='/' component={CustomerForm} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/selection' component={MenuSelection} />
                    <Route
                      exact
                      path='/selection/:id'
                      component={SelectDetail}
                    />
                    <Route exact path='/cart' component={Cart} />
                    <Route
                      exact
                      path='/orderconfirm'
                      component={OrderConfirmation}
                    />
                    <PrivateRoute exact path='/admin' component={AdminHome} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </OrderState>
      </MenuState>
    </AuthState>
  );
};

export default App;
