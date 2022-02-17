import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './Components/hooks/useAuthContext';


//pages
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Navbar from './Components/Navbar';


function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && 
        <BrowserRouter>
        <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route exact path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route exact path="/signup">
              {user && <Redirect to="/" />}
              {!user && <SignUp />}
            </Route>
        </Switch>
      </BrowserRouter>
      }
    </div>
  );
}

export default App
