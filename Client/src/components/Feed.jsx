import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TabBar from './TabBar.jsx';
import PostCard from './PostCard.jsx';

const mapStateToProps = state => ({ currentUser: state.currentUser });

class ConnectedFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedPosts: [],
    };
  }

  componentDidMount() {
    axios
      .get('/showFeedPage', {
        params: {
          user: this.props.currentUser.uid,
        },
      })
      .then((results) => {
        this.setState({
          feedPosts: results.data,
        });
      })
      .catch((err) => {
        console.log('Error getting all post', err);
      });
  }

  render() {
    return (
      <div>
        <ul>{this.state.feedPosts.map(post => <PostCard post={post} key={post.id} />)}</ul>
      </div>
    );
  }
}

const Feed = connect(mapStateToProps)(ConnectedFeed);

export default Feed;
