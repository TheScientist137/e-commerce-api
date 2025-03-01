-- users table
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 email VARCHAR(255) UNIQUE NOT NULL,
 hashedPassword VARCHAR(255) NOT NULL
);

-- telescope_types table
CREATE TABLE telescope_types (
 id SERIAL PRIMARY KEY,
 type VARCHAR(255) NOT NULL,
 description TEXT
);

-- telescopes table
CREATE TABLE telescopes (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 description TEXT,
 price DECIMAL(10, 2) NOT NULL,
 brand VARCHAR(255) NOT NULL,
 telescopeTypeId INT REFERENCES telescope_types(id)
);