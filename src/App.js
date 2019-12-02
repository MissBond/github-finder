import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

//Using hooks changes class component to functional
//Old way: class App extends Component {}

//New way with hooks
const App = () => {
  //Set state using hooks looks like this
  //const [loading, setLoading] = useState(false);

  //Old way to set state w/o hooks
  // state = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   loading: false,
  //   alert: null
  // }

  //Old way 1 w/o hooks: Search Github Users using componentDidMount (comes up on load, no search engine)
  // async componentDidMount() {
  //   this.setState({ loading: true })
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   console.log(res.data)
  //   this.setState({ users: res.data.items, loading: false })
  // }

  //Old way 2 w/o hooks: Search Github users (using search engine, blank on load)
  // searchUsers = async text => {
  //   this.setState({ loading: true })
  //   const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   console.log(res.data.items)
  //   this.setState({ users: res.data.items, loading: false })
  // }

  //New way: Search Github users w/ hooks (see in GitHubState for way 3)
  // const searchUsers = async text => {
  //   setLoading(true);

  //   const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   console.log('USERS', res.data.items);

  //   setUsers(res.data.items);
  //   setLoading(false);
  // }

  return (
    <GithubState>
      <AlertState>
        <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert/>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
