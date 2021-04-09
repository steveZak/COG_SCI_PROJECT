import React from 'react'
import IntroScreen from './pages/intro.js';
import VideoScreen from './pages/video.js';
import QuestionScreen from './pages/question.js';
import ConclusionScreen from './pages/conclusion.js';
import Layout from './components/layout.js';
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import './App.css';
import './index.css';
import { Component } from 'react';

const RouterSwitch = withRouter(({ location }) => (

  <Switch location={location}>
    <Route exact path='/' component={IntroScreen}/>
    <Route path='/video' component={VideoScreen}/>
    <Route path='/question' component={QuestionScreen}/>
    <Route path='/conclusion' component={ConclusionScreen}/>
  </Switch>
));
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
        </Layout>
        <RouterSwitch/>
      </BrowserRouter>
    );
  }
}

export default App;
