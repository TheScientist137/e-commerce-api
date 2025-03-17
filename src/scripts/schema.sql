-- users table
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 email VARCHAR(255) UNIQUE NOT NULL,
 hashedPassword VARCHAR(255) NOT NULL,
 role VARCHAR(255) DEFAULT 'user' NOT NULL
);

-- telescope_types table
CREATE TABLE telescope_types (
 id SERIAL PRIMARY KEY,
 type VARCHAR(255) NOT NULL,
 description TEXT
);

-- optical_designs table 
CREATE TABLE optical_designs (
 id SERIAL PRIMARY KEY,
 type VARCHAR(255) NOT NULL,
 description TEXT
);

-- mount_types table
CREATE TABLE mount_types (
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
 telescope_type_id INT REFERENCES telescope_types(id),
 optical_design VARCHAR(255) NOT NULL,
 image TEXT
);

-- mounts table
CREATE TABLE mounts (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 description TEXT,
 price DECIMAL(10, 2) NOT NULL,
 brand VARCHAR(255) NOT NULL,
 mount_type_id INT REFERENCES mount_types(id),
 image TEXT
);