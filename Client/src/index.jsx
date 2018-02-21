import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.jsx';
import Login from './components/login.jsx';
import firebase from './Firebase'


class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      }, () => console.log(this.state))
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    if (this.state.loading) return null;

    if (this.state.user) return <App />

    return <Login />
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)