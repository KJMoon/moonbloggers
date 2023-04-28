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

CREATE TABLE IF NOT EXISTS likes (
  id SERIAL,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- SEED DATA

INSERT INTO users (username, auth0_token)
VALUES ('erickjmoon', 'auth0|6426dd72cff66fdcdc891d2d');

INSERT INTO posts (content, user_id)
SELECT 'Hello, are you a minion?', id
FROM users
WHERE auth0_token='auth0|6426dd72cff66fdcdc891d2d';

INSERT INTO posts (content, user_id)
SELECT 'Creating a new post!', id
FROM users
WHERE auth0_token='auth0|6426dd72cff66fdcdc891d2d';

INSERT INTO posts (content, user_id)
SELECT 'In the process of creating the best blog website ever!', id
FROM users
WHERE auth0_token='auth0|6426dd72cff66fdcdc891d2d';

INSERT INTO posts (content, user_id)
SELECT 'The weather is so nice outside.', id
FROM users
WHERE auth0_token='auth0|6426dd72cff66fdcdc891d2d';

INSERT INTO posts (content, user_id)
SELECT 'I will need to have another cup of coffee.', id
FROM users
WHERE auth0_token='auth0|6426dd72cff66fdcdc891d2d';

INSERT INTO users (username, auth0_token)
VALUES ('moonkangjin9195', 'google-oauth2|100942908378109046967');

INSERT INTO posts (content, user_id)
SELECT 'I am a minion!', id
FROM users
WHERE auth0_token='google-oauth2|100942908378109046967';

INSERT INTO posts (content, user_id)
SELECT 'Today is the best day to be blogging!', id
FROM users
WHERE auth0_token='google-oauth2|100942908378109046967';

INSERT INTO posts (content, user_id)
SELECT 'What should be on the menu today?', id
FROM users
WHERE auth0_token='google-oauth2|100942908378109046967';

INSERT INTO users (username, auth0_token)
VALUES ('test', 'auth0|644936354b9d72237c8309fa');

INSERT INTO posts (content, user_id)
SELECT 'Testing out this moonblog!', id
FROM users
WHERE auth0_token='auth0|644936354b9d72237c8309fa';

INSERT INTO posts (content, user_id)
SELECT 'What’s wrong with the world, mama?', id
FROM users
WHERE auth0_token='auth0|644936354b9d72237c8309fa';

INSERT INTO posts (content, user_id)
SELECT 'People livin’ like they ain’t got no mamas', id
FROM users
WHERE auth0_token='auth0|644936354b9d72237c8309fa';

INSERT INTO posts (content, user_id)
SELECT 'I think the whole world’s addicted to the drama', id
FROM users
WHERE auth0_token='auth0|644936354b9d72237c8309fa';

INSERT INTO posts (content, user_id)
SELECT 'Web development is difficult, but fun and rewarding!', id
FROM users
WHERE auth0_token='auth0|644936354b9d72237c8309fa';

INSERT INTO posts (content, user_id)
SELECT '
asdfasdfawefasefawefaw sdfgaesrfgaergfasdfasdfawefasefawefaw sdfgaesrfgaergfasdfasdfawefasefawefaw sdfgaesrfgaergfasdfasdfawefasefawefaw sdfgaesrfgaergfasdfasdfawefasefawefaw sdfgaesrfgaergfasdfasdfawefasefawefaw sdfgaesrfgaergfasdfasdfawefasefawefaw sdfgaesrfgaergfasdfasdfawefasefawefaw sdfgaesrfgaergfasdfasdfawefasefawefaw sdfgaesrfgaergfasdfasdfawefasefawefaw', id
FROM users
WHERE auth0_token='auth0|644936354b9d72237c8309fa';

INSERT INTO posts (content, user_id)
SELECT '"5 Ways to Stay Motivated During Tough Times" 1. Practice self-care 2. Focus on your goals 3. Surround yourself with positive people 4. Take small steps towards progress 5. Celebrate your achievements By following these tips, you can maintain your motivation even during challenging times. Remember, you are capable of overcoming any obstacle that comes your way.', id
FROM users
WHERE auth0_token='auth0|644936354b9d72237c8309fa';

INSERT INTO posts (content, user_id)
SELECT 'There is a 400 character limit There is a 400 character limit There is a 400 character limit There is a 400 character limit There is a 400 character limit There is a 400 character limit There is a 400 character limit There is a 400 character limit There is a 400 character limit There is a 400 character limit There is a 400 character limit There is a 400 character limit There is a 400 character lim', id
FROM users
WHERE auth0_token='auth0|644936354b9d72237c8309fa';

INSERT INTO likes (user_id, post_id)
VALUES (1, 14);

INSERT INTO likes (user_id, post_id)
VALUES (2, 14);

INSERT INTO likes (user_id, post_id)
VALUES (3, 14);