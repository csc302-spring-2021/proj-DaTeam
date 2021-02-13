create table sdc_form(
    "uid" uuid primary key DEFAULT uuid_generate_v4(),
    "id" text not null unique,
    "title" text
);