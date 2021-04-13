import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutPage from './pages/AboutPage/AboutPage';
import NotesPage from './pages/NotesPage/NotesPage';
import TodoPage from './pages/TodoPage/TodoPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div id="appContainer">
          <Switch>
            <Route exact path="/" component={AboutPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/notes" component={NotesPage} />
            <Route path="/todo" component={TodoPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
