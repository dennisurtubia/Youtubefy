DROP DATABASE IF EXISTS ProjectBD;
CREATE DATABASE IF NOT EXISTS ProjectBD;
USE ProjectBD;

CREATE TABLE IF NOT EXISTS Usuario (
  id INTEGER, 
  nome CHAR(30) NOT NULL, 
  email CHAR(30) NOT NULL, 
  senha CHAR(200) NOT NULL, 
  
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Publicadora (
  id INTEGER, 
  nome CHAR(30) NOT NULL, 
  email CHAR(30) NOT NULL, 
  senha CHAR(200) NOT NULL, 
  cnpj CHAR(18) NOT NULL, 
  
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Ouvinte (
  id INTEGER, 
  nome CHAR(30) NOT NULL, 
  email CHAR(30) NOT NULL, 
  senha CHAR(200) NOT NULL, 
  cpf CHAR(14) NOT NULL, 
 
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Administrador (
  id INTEGER, 
  nome CHAR(30) NOT NULL, 
  email CHAR(30) NOT NULL, 
  senha CHAR(200) NOT NULL, 
  cpf CHAR(14) NOT NULL, 
  
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Album (
  id INTEGER,
  nome CHAR(30) NOT NULL,

  idPublicadora INTEGER NOT NULL, 
  
  PRIMARY KEY (id),
  FOREIGN KEY (idPublicadora) REFERENCES Publicadora(id)
);

CREATE TABLE IF NOT EXISTS Playlist (
  id INTEGER, 
  nome CHAR(30) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS PlaylistPrivada (
  id INTEGER, 
  nome CHAR(30) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS PlaylistPublica (
  id INTEGER, 
  nome CHAR(30) NOT NULL, 

  idAdministrador INTEGER NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (idAdministrador) REFERENCES Administrador(id)
);

CREATE TABLE IF NOT EXISTS Genero (
  id INTEGER, 
  nome CHAR(30) NOT NULL,

  idAdministrador INTEGER NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (idAdministrador) REFERENCES Administrador(id)
);

CREATE TABLE IF NOT EXISTS Musica (
  id INTEGER, 
  nome CHAR(30) NOT NULL, 
  duracao INTEGER NOT NULL, 
  explicito BOOLEAN NOT NULL,

  idGenero INTEGER NOT NULL,
  idAdministrador INTEGER,

  PRIMARY KEY (id),
  FOREIGN KEY (idGenero) REFERENCES Genero(id),
  FOREIGN KEY (idAdministrador) REFERENCES Administrador(id)
);

CREATE TABLE IF NOT EXISTS MusicaAprovada (
  id INTEGER, 
  nome CHAR(30) NOT NULL, 
  dataAval DATE NOT NULL, 
  duracao INTEGER NOT NULL, 
  explicito BOOLEAN NOT NULL, 

  idAlbum INTEGER,
  
  PRIMARY KEY (id),
  FOREIGN KEY (idAlbum) REFERENCES Album(id)
);

CREATE TABLE IF NOT EXISTS MusicaNaoAprovada (
  id INTEGER, 
  nome CHAR(30) NOT NULL, 
  dataAval DATE NOT NULL,
  observacao CHAR(200) NOT NULL,
  duracao INTEGER NOT NULL, 
  explicito BOOLEAN NOT NULL, 
  
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS MusicaNaoAvaliada (
  id INTEGER, 
  nome CHAR(30) NOT NULL, 
  duracao INTEGER NOT NULL, 
  explicito BOOLEAN NOT NULL, 
  
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
