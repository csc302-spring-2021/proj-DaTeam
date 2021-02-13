CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE ehealth;

create table item(
     "uid" uuid primary key DEFAULT uuid_generate_v4(),
     "id" text not null unique,
     "title" text
);

insert into item ("id", "title") values ('some-id', 'this is a title');