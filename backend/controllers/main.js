const pool = require("../db/database.js");

module.exports = {
    // Get all posts for the feed
    getPosts: async (req, res) => {
        try {
            const posts= await pool.query('SELECT * FROM posts ORDER BY id DESC');

            if(!posts.rows) {
                res.status(404).send("No posts found!");
            }else{
                res.status(200).json(posts.rows);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },
}