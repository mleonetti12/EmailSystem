-- Dummy table for testing--
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

DROP TABLE IF EXISTS mail;
CREATE TABLE mail(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), mailbox VARCHAR(32), mail jsonb, username VARCHAR(32));

--DROP TABLE IF EXISTS users;
--CREATE TABLE users(username VARCHAR(32) UNIQUE PRIMARY KEY, avatar VARCHAR(32), name VARCHAR(32));