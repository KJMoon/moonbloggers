const pool = require("../db/database.js");

module.exports = {

    // Get the likes for the post
    getLikes: async (req, res) => {
        try {
            const post_id = req.body.post_id;

            const likes = await pool.query('SELECT user_id FROM likes WHERE post_id=$1', [post_id]);

            if(likes.rows.length === 0) {
                res.status(200).json({likes: "0"});
            }else{
                res.status(200).json({likes: `${likes.rows.length}`});
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Add a like to the post from the current user
    addLike: async (req, res) => {
        try {
            const user_id = req.body.user_id;
            const post_id = req.body.post_id;

            await pool.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)",[user_id, post_id]);

            res.status(200).json({ message: "Post has been liked!"});
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Delete like
    deleteLike: async (req, res) => {
        try {
            const user_id = req.body.user_id;
            const post_id = req.body.post_id;

            await pool.query("DELETE FROM likes WHERE user_id=$1 AND post_id=$2", [user_id, post_id]);

            res.status(200).json({ message: "User deleted their like for this post"});
        } catch (err) {
            res.status(500).send(err);
        }
    },
};
