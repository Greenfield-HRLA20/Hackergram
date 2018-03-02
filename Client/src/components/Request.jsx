import React from 'react';
import Bar from './Navbar.jsx';
// import PostEntry from './PostEntry.jsx'
import axios from 'axios';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.respondToRequest = this.respondToRequest.bind(this);
  }

  respondToRequest(value) {
    axios
      .post('/respondFollow', {
        userId: this.props.request.userId,
        targetId: this.props.request.targetId,
<<<<<<< HEAD
        responseType: value,
=======
        responseType: e.target.value
>>>>>>> commit for rebase, nothing should have changed
      })
      .then(result => {
        this.props.updateRequestList(this.props.index);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ul>
        <div style={{ fontFamily: 'Roboto, sans-serif' }}>
          New follow request from: <strong>{this.props.request.handle}</strong>
          <RaisedButton
            label="Accept"
            primary
            onClick={() => this.respondToRequest('accept')}
            style={{ margin: '8', paddingRight: '5px' }}
          />
          <RaisedButton
            label="Deny"
            secondary
            onClick={() => this.respondToRequest('deny')}
            style={{ margin: '8' }}
          />
        </div>
      </ul>
    );
  }
}

export default Request;
