const pool = require("../db/database.js");

module.exports = {

    // If authenticated and is new user, add to users table.
    signedIn: async (req, res) => {
        try {
            const username = req.body.username;
            const auth0_token = req.body.auth0_token;

            const newUser = await pool.query('INSERT INTO users (username, auth0_token) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING RETURNING *', [username, auth0_token]);

            newUser.rows.length === 1 ? res.status(200).send("New user added") : res.status(200).send(`${username} is signed in`);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Get all posts for the feed
    getPosts: async (req, res) => {
        try {
            const posts= await pool.query('SELECT * FROM posts ORDER BY created_at DESC');

            if(posts.rows.length === 0) {
                res.status(404).send("No posts found!");
            }else{
                res.status(200).json(posts.rows);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Get all of users posts for the profile feed
    getProfile: async (req, res) => {
        try {
            const username = req.params.username;

            const users = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
            
            if(users.rows.length === 0) {
                res.status(404).send("No users found!");
            }else{
                const user = users.rows[0];

                try {
                    const posts = await pool.query('SELECT * FROM posts WHERE user_id=$1 ORDER BY created_at DESC', [user.id]);

                    res.status(200).json(posts.rows);
                } catch (err) {
                    res.status(500).send(err);
                }
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Get random post
    getRandomPost: async (req, res) => {
        try {
            const randomPost = await pool.query('SELECT * FROM posts ORDER BY random() limit 1');

            if(randomPost.rows.length === 0) {
                res.status(404).send("No random post found!");
            }else{
                res.status(200).json(randomPost.rows);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
    // Get user
    getUser: async (req, res) => {
        try {
            const user_id = req.body.user_id;

            const user = await pool.query('SELECT * FROM users WHERE id=$1', [user_id]);

            if(user.rows.length === 0) {
                res.status(404).send("No user found!");
            }else{
                res.status(200).json(user.rows[0]);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Get the post from the user
    getPost: async (req, res) => {
        try {
            const post_id = req.params.id;

            const posts = await pool.query('SELECT * FROM posts WHERE id=$1', [post_id]);

            if(posts.rows.length === 0) {
                res.send("No posts found!");
            }else{
                const post = posts.rows[0];

                try {
                  const users = await pool.query('SELECT * FROM users WHERE id=$1', [post.user_id]);
                  const user = users.rows[0];

                  res.status(200).json({
                    id: post.id,
                    content: post.content,
                    user: user.username,
                    user_id: post.user_id,
                    updated_at: post.updated_at
                  });
                } catch (err) {
                  res.status(500).send(err);
                }
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Create a new post for the user
    createPost: async (req, res) => {
        try {
            const content = req.body.content;
            const auth0_token = req.body.auth0_token;

            const newPost = await pool.query(
              "INSERT INTO posts (content, user_id) SELECT $1, id FROM users WHERE auth0_token=$2 RETURNING *",
              [content, auth0_token]
            );

            res.status(200).json({ message: "Post created!"});
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Update users post
    editPost: async (req, res) => {
        try {
            const post_id = req.params.id;

            await pool.query(
              `UPDATE posts SET content=$1, updated_at=current_timestamp WHERE id = $2`,
              [req.body.content, post_id]
            );

            res.status(200).json({ message: "Saved changes!"});
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Delete users post
    deletePost: async (req, res) => {
        try {
            const post_id = req.params.id;

            await pool.query("DELETE FROM posts WHERE id=$1", [post_id]);

            res.status(200).send("Post deleted");
        } catch (err) {
            res.status(500).send(err);
        }
    },
};
