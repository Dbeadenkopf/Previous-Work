create table HorrorMovies(
    id bigint NOT NULL,
    title text COLLATE pg_catalog."default",
    CONSTRAINT student_pkey PRIMARY KEY (id)
);


insert into HorrorMovies(id, title) values
(1, 'Halloween'),
(2, 'Pumpkin Head'),
(3, 'Three from hell');