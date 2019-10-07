import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import './App.css';
import 'semantic-ui-css/semantic.min.css'

import { AuthProvider } from './context/auth'
import AuthRouter from './util/authRouter'

import MenuBar from './components/MenuBar' 
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'


function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar/>
          <Route exact path='/' component={Home} />
          <AuthRouter exact path='/login' component={Login} />
          <AuthRouter exact path='/register' component={Register} />
          <Route exact path='/posts/:postId' component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
