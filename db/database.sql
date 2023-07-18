create database tablafutbolprog3;

use tablafutbolprog3;

create table equipos(
	id int auto_increment,
    nombre varchar(40),
    puntos int DEFAULT 0,
    partidos_jugados int DEFAULT 0,
    partidos_ganados int DEFAULT 0,
    partidos_empatados int DEFAULT 0,
    partidos_perdidos int DEFAULT 0,
    goles_favor int DEFAULT 0,
    goles_contra int DEFAULT 0,
    diferencia_goles int AS (goles_favor - goles_contra),
    primary key(Id)
);

select * from equipos;

create table usuarios(
	id int auto_increment,
    nombre varchar(40),
    email varchar(40),
    contraseña varchar(40),
    rol varchar(13),
    primary key(id)
);

select * from usuarios;