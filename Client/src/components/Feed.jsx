import React from 'react'
import Bar from './Navbar.jsx'
import PostEntry from './PostEntry.jsx'
import axios from 'axios'
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {currentUser: state.currentUser}
}

class ConnectedFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedPosts: []
    }
  }
  
  componentDidMount() {
    axios.get('/showFeedPage', {
      params: {
        user: this.props.currentUser.displayName
      }
    }).then((results) => {
      console.log('results??', results);
      this.setState({
        feedPosts: results.data
      })
    }).catch((err) => {
      console.log('Error getting all post', err);
    })
  }

  render() {
    return (
      <div>
        <h1><Bar /></h1>
        <ul>
          {this.state.feedPosts.map((post) => <PostEntry post={post} key={post.id}/>)}
        </ul>
      </div>
    )
  }  
}

const Feed = connect(mapStateToProps)(ConnectedFeed)

export default Feed