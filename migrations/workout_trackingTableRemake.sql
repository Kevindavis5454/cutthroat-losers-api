DROP TABLE if EXISTS workout_tracking

create table workout_tracking
(
    id integer generated by default as identity primary key,
    contest_id   integer not null,
    user_id      integer not null,
    category     text    not null,
    date_created timestamp with time zone default now()
);


create table workout_tracking
(
    id           integer generated by default as identity
        constraint workout_tracking_pkey
            primary key,
    contest_id   integer not null
        constraint workout_tracking_contest_id_fkey
            references contests,
    user_id      integer not null
        constraint workout_tracking_user_id_fkey
            references users,
    category     text    not null,
    date_created timestamp with time zone default now()
);