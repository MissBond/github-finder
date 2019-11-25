import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import GithubState from './context/github/GithubState';
import './App.css';

//Using hooks changes class component to functional
//Old way: class App extends Component {}

//New way with hooks
const App = () => {
  //Set state using hooks
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

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

  //New way: Search Github users w/ hooks
  const searchUsers = async text => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log('USERS', res.data.items);

    setUsers(res.data.items);
    setLoading(false);
  }

  //Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false)
  }

  //Set alert
  const showAlert = (msg, type) => {
    setAlert({msg, type});
    setTimeout(() => setAlert(null), 5000)
  }

  // Get single Github user
  const getUser = async username => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log('USER', res.data);

    setUser(res.data);
    setLoading(false);
  }

  //Get user repos
  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log('REPOS', res.data);

    setRepos(res.data);
    setLoading(false);
  }

  return (
    <GithubState>
      <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    showAlert={showAlert}
                  />
                  <Users loading={loading} users={users}/>
              </Fragment>
            )}/>
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user}
              repos={repos} loading={loading}/>
            )}/>
          </Switch>

        </div>
      </div>
      </Router>
    </GithubState>
  );

}

export default App;
