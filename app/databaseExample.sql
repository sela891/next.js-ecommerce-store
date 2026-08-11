--Documentation
postgres=# CREATE DATABASE XXXXXXXXX;
CREATE DATABASE
postgres=# CREATE USER XXXXXXXXX WITH
 ENCRYPTED PASSWORD XXXXXXXXX
postgres-# CREATE ROLE
postgres-# GRANT ALL PRIVILEGES XXXXXXXXX TO XXXXXXXXX
postgres-# CREATE USER XXXXXXXXX WITH
 ENCRYPTED PASSWORD XXXXXXXXX;
ERROR:  syntax error at or near "XXXXXXXXX"
LINE 1: ...ext_js_ecommerce_products WITH ENCRYPTED PASSWORD next_js_ec...
                                                             ^
postgres=# CREATE USER XXXXXXXXX WITH
 ENCRYPTED PASSWORD 'XXXXXXXXX';
CREATE ROLE
postgres=# GRANT ALL PRIVILEGES XXXXXXXXX TO XXXXXXXXX
postgres-# GRANT ALL PRIVILEGES XXXXXXXXX TO XXXXXXXXX;
ERROR:  syntax error at or near "XXXXXXXXX"
LINE 1: GRANT ALL PRIVILEGES XXXXXXXXX TO next_js_e...
                             ^
postgres=# GRANT ALL PRIVILEGES ON DATABASE XXXXXXXXX TO XXXXXXXXX;
GRANT
postgres=# \connect XXXXXXXXX
You are now connected to database "XXXXXXXXX" as user "sela891".
XXXXXXXXX=# CREATE SCHEMA XXXXXXXXX AUTHORIZATION XXXXXXXXX;
CREATE SCHEMA
XXXXXXXXX=# \q
sela891@Mac next.js-ecommerce-store % psql -U XXXXXXXXX XXXXXXXXX
psql (17.7 (Homebrew))
Type "help" for help.

CREATE TABLE products (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name varchar (100) NOT NULL,
price numeric NOT NULL,
cat varchar (100) NOT NULL,
description varchar (1000)


INSERT INTO products (name, price, cat, description) VALUES
(
    'Cotton Bear',
    45.00,
    'Hand-Stitched',
    'A timeless companion crafted with love. This classic bear is made from premium, breathable cotton and features intricate hand-stitched details that give it a unique personality. Soft, durable, and perfect for lifelong snuggles.'
),
(
    'Wooden Pull-Toy',
    35.00,
    'Eco-Friendly',
    'Bring back the joy of traditional play with this charming pull-toy. Carved from sustainably sourced timber and finished with child-safe, non-toxic oils, its smooth rolling wheels and sturdy design make it a perfect companion for a toddler’s first steps.'
),
(
    'Custom Name Blocks',
    25.00,
    'Personalized',
    'Create a keepsake that lasts a lifetime. These solid wood blocks are custom-engraved to spell out a child’s name or a special message. They serve as both a foundational learning toy and a beautiful decorative piece for any nursery shelf.'
),
(
    'Soft Linen Bunny',
    42.00,
    'Hand-Stitched',
    'Elegant and incredibly soft, this bunny is made from high-quality natural linen. Its long, floppy ears and delicate stitching make it a favorite for tactile play and quiet moments. A sophisticated take on the traditional plush toy.'
);

-- SELECT all products from CRUD
SELECT * FROM products
