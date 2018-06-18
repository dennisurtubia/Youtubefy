DROP DATABASE IF EXISTS ProjectBD;
CREATE DATABASE IF NOT EXISTS ProjectBD;
USE ProjectBD;

CREATE TABLE IF NOT EXISTS Usuario (
    id INTEGER AUTO_INCREMENT,
    nome CHAR(30) NOT NULL,
    email CHAR(30) NOT NULL,
    senha CHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Publicadora (
  id INTEGER, 
  cnpj CHAR(18) NOT NULL, 
  
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Ouvinte (
  id INTEGER, 
  cpf CHAR(14) NOT NULL, 
 
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Administrador (
  id INTEGER, 
  cpf CHAR(14) NOT NULL, 
  
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Album (
  id INTEGER auto_increment,
  nome CHAR(30) NOT NULL,

  idPublicadora INTEGER NOT NULL, 
  
  PRIMARY KEY (id),
  FOREIGN KEY (idPublicadora) REFERENCES Publicadora(id)
);

CREATE TABLE IF NOT EXISTS Playlist (
  id INTEGER auto_increment, 
  nome CHAR(30) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS PlaylistPrivada (
  id INTEGER,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS PlaylistPublica (
  id INTEGER, 

  idAdministrador INTEGER NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (idAdministrador) REFERENCES Administrador(id)
);

CREATE TABLE IF NOT EXISTS Genero (
  id INTEGER auto_increment, 
  nome CHAR(30) NOT NULL,

  idAdministrador INTEGER NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (idAdministrador) REFERENCES Administrador(id)
);

CREATE TABLE IF NOT EXISTS Musica (
  id INTEGER auto_increment, 
  nome CHAR(30) NOT NULL, 
  duracao INTEGER NOT NULL, 
  explicito BOOLEAN NOT NULL,

  idGenero INTEGER NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (idGenero) REFERENCES Genero(id)
);

CREATE TABLE IF NOT EXISTS MusicaAprovada (
  id INTEGER, 
  dataAprov DATE NOT NULL,
  
  idAlbum INTEGER,
  idAdministrador INTEGER,
  
  PRIMARY KEY (id),
  FOREIGN KEY (idAlbum) REFERENCES Album(id),
  FOREIGN KEY (idAdministrador) REFERENCES Administrador(id)
);

CREATE TABLE IF NOT EXISTS MusicaNaoAprovada (
  id INTEGER, 
  dataReprov DATE NOT NULL,
  observacao CHAR(200) NOT NULL,

  idAdministrador INTEGER,
  
  PRIMARY KEY (id),
  FOREIGN KEY (idAdministrador) REFERENCES Administrador(id)
);

CREATE TABLE IF NOT EXISTS MusicaNaoAvaliada (
  id INTEGER, 
  
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS OuvinteSeguePlaylistPublica (
  idOuvinte INTEGER, 
  idPlaylistPublica INTEGER, 

  PRIMARY KEY(idOuvinte, idPlaylistPublica), 
  FOREIGN KEY(idOuvinte) REFERENCES Ouvinte(id), 
  FOREIGN KEY(idPlaylistPublica) REFERENCES PlaylistPublica(id)
);

CREATE TABLE IF NOT EXISTS OuvinteGerenciaPlaylistPrivada (
  idOuvinte INTEGER, 
  idPlaylistPrivada INTEGER, 

  PRIMARY KEY(idOuvinte, idPlaylistPrivada), 

  FOREIGN KEY(idOuvinte) REFERENCES Ouvinte(id), 
  FOREIGN KEY(idPlaylistPrivada) REFERENCES PlaylistPrivada(id)
);

CREATE TABLE IF NOT EXISTS OuvinteTemMusicaAprovada (
  idOuvinte INTEGER, 
  idMusicaAprovada INTEGER, 

  PRIMARY KEY(idOuvinte, idMusicaAprovada), 
  FOREIGN KEY(idOuvinte) REFERENCES Ouvinte(id), 
  FOREIGN KEY(idMusicaAprovada) REFERENCES MusicaAprovada (id)
);

CREATE TABLE IF NOT EXISTS PlaylistTemMusicaAprovada (
  idPlaylist INTEGER, 
  idMusicaAprovada INTEGER,

  PRIMARY KEY(idPlaylist, idMusicaAprovada), 
  FOREIGN KEY(idPlaylist) REFERENCES Playlist(id), 
  FOREIGN KEY(idMusicaAprovada) REFERENCES MusicaAprovada(id)
);

SELECT o.id
        FROM Ouvinte o 
        INNER JOIN Usuario u 
        ON o.id = u.id
        HAVING o.id = 1;
        
insert into Administrador values (1, '1111111111');
insert into Usuario values (1, "El Administrador", "a@a.com", "isso não estará aqui futuramente" );