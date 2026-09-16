const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Giftogram Technical Assessment' })
});

// Registration
app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({
            error_code: 400,
            error_title: "Register Failure",
            error_message: "Must fill all fields!"
        });
    }

    db.query('SELECT email FROM users WHERE email = ?',
        [email],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    error_code: 500,
                    error_title: "Database error",
                    error_message: "Unable to check email"
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    error_code: 409,
                    error_title: "Email Exists",
                    error_message: "A user with this email already exists!"
                });
            }

            db.query('INSERT INTO users (email, user_password, first_name, last_name) VALUES (?, ?, ?, ?)',
                [email, password, first_name, last_name],
                (error, results) => {
                    if (error) {
                        return res.status(500).json({
                            error_code: 500,
                            error_title: "Register Failure",
                            error_message: "Unable to register user!"
                        });
                    }

                    return res.status(201).json({
                        user_id: results.insertId,
                        email: email,
                        first_name: first_name,
                        last_name: last_name
                    });
                }
            );
        }
    );
});

// Login
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            error_code: 400,
            error_title: "Login Failure",
            error_message: "All fields must be filled!"
        });
    }

    db.query('SELECT * FROM users WHERE email = ?',
        [email],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    error_code: 500,
                    error_title: "Database error",
                    error_message: "Unable to process login"
                });
            }

            if (results.length == 0 || results[0].user_password !== password) {
                return res.status(401).json({
                    error_code: 401,
                    error_title: "Login Failure",
                    error_message: "Invalid email or password!"
                });
            }

            return res.status(200).json({
                user_id: results[0].user_id,
                email: results[0].email,
                first_name: results[0].first_name,
                last_name: results[0].last_name
            });
        }
    );
});

// View Messages
app.get('/view_messages', (req, res) => {
    const user_id_a = req.query.user_id_a;
    const user_id_b = req.query.user_id_b;

    if (!user_id_a || !user_id_b) {
        return res.status(400).json({
            error_code: 400,
            error_title: "View Messages Failure",
            error_message: "All fields must be filled!"
        });
    }

    db.query(`SELECT message_id, sender_user_id, message, UNIX_TIMESTAMP(created_at) as epoch
        FROM messages
        WHERE (sender_user_id = ? AND receiver_user_id = ?)
        OR (sender_user_id = ? AND receiver_user_id = ?)
        ORDER BY created_at ASC`,
        [user_id_a, user_id_b, user_id_b, user_id_a],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    error_code: 500,
                    error_title: "Database error",
                    error_message: "Unable to retrieve messages"
                });
            }

            return res.status(200).json({
                messages: results
            });
        }
    );
});

// Send Message
app.post('/send_message', (req, res) => {
    const sender_user_id = req.body.sender_user_id;
    const receiver_user_id = req.body.receiver_user_id;
    const message = req.body.message;

    if (!sender_user_id || !receiver_user_id || !message) {
        return res.status(400).json({
            error_code: 400,
            error_title: "Send Message Failure",
            error_message: "All fields must be filled!"
        });
    }

    db.query(`INSERT INTO messages (sender_user_id, receiver_user_id, message) VALUES (?, ?, ?)`,
        [sender_user_id, receiver_user_id, message],
        (error) => {
            if (error) {
                return res.status(500).json({
                    error_code: 500,
                    error_title: "Database error",
                    error_message: "Unable to send messages"
                });
            }

            return res.status(200).json({
                success_code: 200,
                success_title: "Message Sent",
                success_message: "Message was sent successfully!"
            });
        }
    );
});

// List All Users
app.get('/list_all_users', (req, res) => {
    const requester_user_id = req.query.requester_user_id;

    if (!requester_user_id) {
        return res.status(400).json({
            error_code: 400,
            error_title: "List Users Failure",
            error_message: "All fields must be filled!"
        });
    }

    db.query(`SELECT user_id, email, first_name, last_name FROM users WHERE user_id != ?`,
        [requester_user_id],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    error_code: 500,
                    error_title: "Database error",
                    error_message: "Unable to retrieve users"
                });
            }

            return res.status(200).json({
                users: results
            });
        }
    );
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
