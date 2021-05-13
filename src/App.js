import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutPage from './pages/AboutPage/AboutPage';
import NotesPage from './pages/NotesPage/NotesPage';
import TodoPage from './pages/TodoPage/TodoPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './App.css';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <div className="App" style={{
      backgroundColor: '#202124',
      width: '100',
      height: '100%',
      color: 'white'
    }}>
      <Router>
        <Menu />
        <Switch>
            <Route exact path="/" component={AboutPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/notes" component={NotesPage} />
            <Route path="/todo" component={TodoPage} />
            <Route component={NotFoundPage} />
          </Switch>
        {/* <div id="appContainer">
          <Switch>
            <Route exact path="/" component={AboutPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/notes" component={NotesPage} />
            <Route path="/todo" component={TodoPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div> */}
      </Router>
    </div>
  );
}

export default App;
