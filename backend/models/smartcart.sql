CREATE DATABASE IF NOT EXISTS smartcart;
USE smartcart;

CREATE TABLE IF NOT EXISTS inventory (
                                       id INT AUTO_INCREMENT PRIMARY KEY,
                                       name VARCHAR(255) NOT NULL,
                                       quantity INT NOT NULL,
                                       unit VARCHAR(50) NOT NULL
);

INSERT INTO inventory (name, quantity, unit) VALUES
                                               ('Tomaten', 10, 'Stück'),
                                               ('Mozzarella', 2, 'Packungen'),
                                               ('Avocado', 5, 'Stück');
