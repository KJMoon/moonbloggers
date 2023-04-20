-- CREATE TABLES

CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  username VARCHAR(45) NOT NULL UNIQUE,
  email VARCHAR(45) NOT NULL,
  passphrase VARCHAR(200) NOT NULL,
  fullname VARCHAR(45) NOT NULL, 
  created_at TIMESTAMPTZ DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL,
  text_entry VARCHAR(400) NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ DEFAULT current_timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- SEED DATA

INSERT INTO users (username, email, passphrase, fullname)
VALUES ('erickjmoon', 'test@test.com', 'test123!', 'Eric Moon');

INSERT INTO posts (text_entry, user_id)
SELECT 'Hello, are you a minion?', id
FROM users
WHERE username ='erickjmoon';

INSERT INTO users (username, email, passphrase, fullname)
VALUES ('moonkangjin', 'test123@test.com', 'testing123!', 'Juniper Moon');

INSERT INTO posts (text_entry, user_id)
SELECT 'I am a minion!', id
FROM users
WHERE username ='moonkangjin';