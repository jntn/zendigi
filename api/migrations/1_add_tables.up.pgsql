
-- Tables -------------------------------------------------------

CREATE TABLE account
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL
);

CREATE TABLE project
(
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    description text,
    account_id integer NOT NULL REFERENCES account(id) ON DELETE CASCADE
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    project_id integer NOT NULL REFERENCES project(id) ON DELETE CASCADE,
    title text,
    description text
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    title text NOT NULL,
    description text,
    project_id integer NOT NULL REFERENCES project(id) ON DELETE CASCADE,
    category_id integer NOT NULL REFERENCES category(id) ON DELETE CASCADE
);


-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX ON account (id);
CREATE UNIQUE INDEX ON account (email);

CREATE UNIQUE INDEX ON project (id);
CREATE INDEX ON project (account_id);

CREATE UNIQUE INDEX ON category (id);
CREATE INDEX ON category (project_id);

CREATE UNIQUE INDEX ON event (id);
CREATE INDEX ON event (project_id);
CREATE INDEX ON event (category_id);
