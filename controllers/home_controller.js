const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    try{
        //populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            //populate the likes of each post and comment
            populate: {
                path: 'likes'
            }
        })
        .populate('comments')
        .populate('likes');
        
        let users = await User.find({});

        return res.render('home', {
            title: "Social | Home",
            posts: posts,
            all_users: users
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }
}