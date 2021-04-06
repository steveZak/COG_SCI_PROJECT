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
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './App.css';
import { Component } from 'react';

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="slide" timeout={500}>
      <Switch location={location}>
                <Route exact path='/' component={IntroScreen}/>
                <Route path='/video' component={VideoScreen}/>
                <Route path='/question' component={QuestionScreen}/>
                <Route path='/conclusion' component={ConclusionScreen}/>
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
        </Layout>
          <AnimatedSwitch style={{position: "relative"}}/>
      </BrowserRouter>
    );
  }
}

export default App;
