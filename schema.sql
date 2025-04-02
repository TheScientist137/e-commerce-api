-- users table
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 email VARCHAR(255) UNIQUE NOT NULL,
 hashedPassword VARCHAR(255) NOT NULL,
 role VARCHAR(255) DEFAULT 'user' NOT NULL,
 cart JSONB DEFAULT '[]'::JSONB NOT NULL
);

-- products table
CREATE TABLE products (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 description TEXT,
 price DECIMAL(10, 2) NOT NULL,
 brand VARCHAR(255) NOT NULL,
 image TEXT,
 product_type VARCHAR(50) NOT NULL,
 created_at TIMESTAMP DEFAULT NOW(),
 updated_at TIMESTAMP DEFAULT NOW()
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
 product_id INT NOT NULL REFERENCES products(id),
 telescope_type_id INT NOT NULL REFERENCES telescope_types(id),
 optical_design_id INT NOT NULL REFERENCES optical_designs(id)
);

-- mounts table
CREATE TABLE mounts (
 id SERIAL PRIMARY KEY,
 product_id INT NOT NULL REFERENCES products(id),
 mount_type_id INT NOT NULL REFERENCES mount_types(id)
);

-- Insert types data
INSERT INTO telescope_types (type, description) VALUES 
('Refractor', 'A refractor telescope is a type of optical telescope that uses lenses to gather and focus light. It consists of a long, sealed tube with a large objective lens at the front and an eyepiece at the back. Refractors provide sharp, high-contrast images, making them ideal for viewing planets, the Moon, and bright deep-sky objects. Known for their durability and low maintenance, these telescopes are popular among beginners and experienced astronomers alike.'),
('Reflector', 'A reflector telescope is an optical telescope that uses mirrors instead of lenses to gather and focus light. It features a large concave primary mirror that reflects light to a smaller secondary mirror, which then directs the image to the eyepiece. Reflectors are excellent for deep-sky observation, providing bright and detailed views of galaxies, nebulae, and star clusters. Popular among amateur and professional astronomers, they offer larger apertures at a lower cost compared to refractor telescopes.');

INSERT INTO optical_designs (type, description) VALUES
('Achromatic', 'An achromatic telescope is a type of refractor that uses a two-lens (doublet) system to reduce chromatic aberration, or color fringing, compared to single-lens designs. While not as advanced as apochromatic (APO) telescopes, achromats provide clear and sharp views, making them ideal for beginners and general observation of the Moon, planets, and bright deep-sky objects. They offer an affordable balance between optical performance and cost, making them a popular choice for amateur astronomers.'),
('Apochromatic', 'An apochromatic (APO) telescope is a high-performance refractor that uses specially designed lenses to minimize chromatic aberration (color fringing). Unlike standard achromatic refractors, APO telescopes use extra-low dispersion (ED) glass or multiple lens elements to produce sharper, more color-accurate images. This optical design is ideal for astrophotography and high-contrast planetary observation, delivering crisp details and vibrant clarity.'),
('Newton', 'A Newtonian telescope uses a curved primary mirror to collect light and reflect it to a flat diagonal secondary mirror, which then directs the image to an eyepiece on the side of the tube. This simple, mirror-based design avoids color distortion, making it great for deep-sky viewing at an affordable price. Ideal for beginners, it offers bright, clear views of planets, stars, and galaxies without the complexity of other telescope types.'),
('Catadioptric', 'A catadioptric telescope (like Schmidt-Cassegrain or Maksutov designs) combines mirrors and lenses to fold the light path, making it compact yet powerful. A corrector lens at the front reduces aberrations, while a primary mirror reflects light to a secondary mirror, which bounces it back through a central hole to the eyepiece. This design offers sharp, high-magnification views in a portable tube, perfect for both planets and deep-sky objects. Great for intermediate to advanced users who want versatility in a smaller size.');

INSERT INTO mount_types (type, description) VALUES
('Alt-azimuth', 'A simple and user-friendly mount that allows smooth movement in two axes: altitude (up and down) and azimuth (left and right). Ideal for beginners and casual stargazers, this mount offers intuitive manual control for tracking celestial objects with ease. Lightweight and portable, it is perfect for quick setup and hassle-free observation sessions.'),
('Alt-azimuth with GoTo', 'The Alt-Azimuth GoTo Mount combines ease of use with advanced tracking technology. Featuring motorized controls, it automatically locates and tracks celestial objects with precision. Simply select an object from the onboard database, and the mount will adjust its altitude (up/down) and azimuth (left/right) for effortless stargazing. Ideal for beginners and experienced astronomers alike, this mount offers a hassle-free way to explore the night sky.'),
('Equatorial', 'The Equatorial GoTo Mount is designed for precise celestial tracking, making it ideal for astrophotography and deep-sky observation. With its motorized system and built-in star database, it automatically locates and follows objects as they move across the sky. Unlike alt-azimuth mounts, its equatorial design aligns with the Earth rotation, providing smoother tracking and reducing field rotation. Perfect for astronomers seeking accuracy and convenience.'),
('Equatorial with GoTo', 'The Equatorial GoTo Mount offers precision tracking and automated object location, making it ideal for astrophotography and deep-sky observation. Its equatorial design aligns with the Earth rotation for smooth, accurate tracking, minimizing field rotation. With a motorized GoTo system and an extensive star database, it effortlessly locates and follows celestial objects, allowing for hands-free exploration of the night sky. Perfect for both amateur and advanced astronomers');