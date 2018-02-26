const connection = require('./db/index');
const User = require('./db/models/User');
const Post = require('./db/models/Post');
const Comment = require('./db/models/Comment');
const Like = require('./db/models/Like');
const Follow = require('./db/models/Follow');
const bluebird = require('bluebird');
const CommentController = require('./db/controllers/CommentController.js');
const FollowController = require('./db/controllers/FollowController.js');
const LikeController = require('./db/controllers/LikeController.js');
const PostController = require('./db/controllers/PostController.js');
const UserController = require('./db/controllers/UserController.js');

// authenticate + sync sequelize tables
connection.authenticate().then(() => {
  console.log('connected');
  User.sync({force: false}).then(() => {
    console.log('User table synced!');
    Post.sync({force: false}).then(() => {
      console.log('Post table synced!');
      Like.sync({force:false}).then(() => {
        console.log('Like table synced!');
      }).catch((err) => {
        console.log(err);
      });
      Comment.sync({force: false}).then(() => {
        console.log('Comment table synced!');
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
    Follow.sync({force:false}).then(() => {
      console.log('Follow table synced!');
    }).catch(err => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
});

/* Handle requests to each page */

module.exports.showExplorePage = async (req, res) => {
  try {
    let posts = await PostController.getAllPosts();
    for (let i = 0; i < posts.length; i++) {
      let result = await CommentController.getCommentsByPostId(posts[i].id)
      posts[i].dataValues.comments = result
    }
    res.send(posts);
  } catch(err) {
    console.log(err)
  }
}


module.exports.showFeedPage = async (req, res) => {
  // Query for people you're following in users table
  // make sure to add yourself to that list
  // limit to ppl you're following and sort by createdAt
  // go to the post table
  // get all of the posts matching the ids of ppl you're following
    // for each post, get each comment
    // add comments to comments array for each post object
  // send array back to client

  //togglelike - (userId, postId)
  //modifyLikes - (postId, bool)
  try {
    await CommentController.addComment('comment', 4, 2);
    res.send('Comment added');
  } catch (err) {
    console.log(err);
  }
}

// PROFILE ===================================================
module.exports.showProfilePage = (req, res) => {
  
  // localhost:1337/showProfilePage?user=USERNAME_HERE

  // given user table, get user's user ID
  UserController.getUserId(req.query.user, function(id) {
    // go to the posts table
    // get all of the posts matching self
    PostController.getUsersPosts(id, function(posts) {
      // send array back to client

      var getComments = posts.forEach((post) => {
        CommentController.getCommentsByPostId(post.dataValues.id, function(comments) {
          console.log("hello from comments!", comments);
        });
      })
      console.log("$$$$$$", getComments);
      res.send(posts);

      // for each post, get each comment
      // add comments to comments array for each post object
    })
      
  })
}

/* User functionality/interaction functionality*/
module.exports.submitPost = (req, res) => {
  // get userid from users table
  UserController.getUserId(req.body.user, (user) => {
    PostController.addPost(req.body.caption, req.body.postUrl, user);
    res.send('Hi!');
  });
  // given url and caption and user ID
  
  // use save post function to save post to db
  // res.send('submitPost controller function');
}

module.exports.addComment = async (req, res) => {
  // invoke addComment() from CommentController

  // REMOVE THIS!!!!!!
  // CommentController.addComment(req.body.msg, req.body.postId, req.body.userId, function(comment) {
  //   if (comment) {
  //     res.send(comment);
  //   }
  // });

  try {
    await CommentController.addComment('comment', 4, 2);
    res.send('Comment added');
  } catch (err) {
    console.log(err);
  }
  
}

module.exports.toggleLike = async (req, res) => {
  // values should be pulled off of req.body

  // GET RID OF THIS!
  // LikeController.toggleLike(1, 1, (shouldIncrementLikes) => {
  //   PostController.modifyLikes(1, shouldIncrementLikes);
  //   res.send('Completed like modification');
  // });

  try {
    let result = await LikeController.toggleLike(2, 1);
    PostController.modifyLikes(1, result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
}