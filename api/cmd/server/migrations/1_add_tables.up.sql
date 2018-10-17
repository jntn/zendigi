
CREATE TABLE account (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL
);


CREATE UNIQUE INDEX user_pkey ON account(id);
CREATE UNIQUE INDEX account_email ON account(email);