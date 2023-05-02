const pool = require("../db/database.js");

module.exports = {
    // If authenticated and is new user, add to users table.
    signedIn: async (req, res) => {
        try {
            const username = req.body.username;
            const auth0_token = req.body.auth0_token;

            const newUser = await pool.query('INSERT INTO users (username, auth0_token) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING RETURNING *', [username, auth0_token]);

            newUser.rows.length === 1 ? res.status(200).json({message: "New user added"}) : res.status(200).json({message: `${username} is signed in`});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
     // Get current user
     getCurrentUser: async (req, res) => {
        try {
            const username = req.body.username;

            const user = await pool.query('SELECT * FROM users WHERE username=$1', [username]);

            if(user.rows.length === 0) {
                res.status(404).send("No user found!");
            }else{
                res.status(200).json(user.rows[0]);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Get user for the post
    getPostUser: async (req, res) => {
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
}