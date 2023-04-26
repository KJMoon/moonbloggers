-- CREATE TABLES

CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  username VARCHAR NOT NULL UNIQUE,
  auth0_token VARCHAR,
  created_at TIMESTAMPTZ DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL,
  content VARCHAR(400) NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ DEFAULT current_timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- SEED DATA

INSERT INTO users (username, auth0_token)
VALUES ('erickjmoon', 'auth0|6426dd72cff66fdcdc891d2d');

INSERT INTO posts (content, user_id)
SELECT 'Hello, are you a minion?', id
FROM users
WHERE auth0_token='auth0|6426dd72cff66fdcdc891d2d';

INSERT INTO users (username, auth0_token)
VALUES ('moonkangjin9195', 'google-oauth2|100942908378109046967');

INSERT INTO posts (content, user_id)
SELECT 'I am a minion!', id
FROM users
WHERE auth0_token='google-oauth2|100942908378109046967';

INSERT INTO users (username, auth0_token)
VALUES ('test', 'auth0|644936354b9d72237c8309fa');

INSERT INTO posts (content, user_id)
SELECT 'Testing out this moonblog!', id
FROM users
WHERE auth0_token='auth0|644936354b9d72237c8309fa';