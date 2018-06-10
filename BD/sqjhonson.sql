CREATE TABLE IF NOT EXISTS Usuario(id INTEGER,
                    nome CHAR(30),
                    email CHAR(30),
                    senha CHAR(200),
                    tipo INTEGER,
                    CONSTRAINT pk_usuario PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Publicadora(id INTEGER,
                    nome CHAR(30),
                    email CHAR(30),
                    senha CHAR(200),
                    tipo INTEGER,
                    cnpj CHAR(18),
                    CONSTRAINT pk_publicadora PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Ouvinte(id INTEGER,
                    nome CHAR(30),
                    email CHAR(30),
                    senha CHAR(200),
                    tipo INTEGER,
                    cpf CHAR(14),
                    CONSTRAINT pk_ouvinte PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Administrador(id INTEGER,
                    nome CHAR(30),
                    email CHAR(30),
                    senha CHAR(200),
                    tipo INTEGER,
                    cpf CHAR(14),
                    CONSTRAINT pk_administrador PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Album(id INTEGER,
                                nome CHAR(30),
                                CONSTRAINT pk_album PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Playlist(id INTEGER,
                                    nome CHAR(30),
                                    CONSTRAINT pk_playlist PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS playlistPrivada(id INTEGER,
                                    nome CHAR(30),
                                    CONSTRAINT pk_playlistPrivada PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS playlistPublica(id INTEGER,
                                    nome CHAR(30),
                                    CONSTRAINT pk_playlistPrivada PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Genero(id INTEGER,
                                 nome CHAR(30),
                                 CONSTRAINT pk_genero PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Musica(id INTEGER,
                                nome CHAR(30),
                                dataAval DATE,
                                duracao INTEGER,
                                explicito BOOLEAN,
                                CONSTRAINT pk_musica PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS musicaAprovada(id INTEGER,
                                nome CHAR(30),
                                dataAval DATE,
                                duracao INTEGER,
                                explicito BOOLEAN,
                                CONSTRAINT pk_musicaAprovada PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS musicaNaoAprovada(id INTEGER,
                                nome CHAR(30),
                                dataAval DATE,
                                duracao INTEGER,
                                explicito BOOLEAN,
                                CONSTRAINT pk_musicaNaoAprovada PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS musicaNaoAvaliada(id INTEGER,
                                nome CHAR(30),
                                dataAval DATE,
                                duracao INTEGER,
                                explicito BOOLEAN,
                                CONSTRAINT pk_musicaNaoAvaliada PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS OuvinteSeguePlaylistPublica(IdOuvinte INTEGER,
                                                       IdPlaylistPublica INTEGER,
                                                       PRIMARY KEY(IdOuvinte, IdPlaylistPublica),
                                                       FOREIGN KEY(IdOuvinte) REFERENCES Ouvinte(id),
                                                       FOREIGN KEY(IdPlaylistPublica) REFERENCES playlistPublica(id)

);
CREATE TABLE IF NOT EXISTS OuvinteGerenciaPlaylistPrivada(IdOuvinte INTEGER,
                                                        IdPlaylistPrivada INTEGER,
                                                        PRIMARY KEY(IdOuvinte, IdPlaylistPrivada),
                                                        FOREIGN KEY(IdOuvinte) REFERENCES Ouvinte(id),
                                                        FOREIGN KEY(IdPlaylistPrivada) REFERENCES playlistPrivada(id)
);
CREATE TABLE IF NOT EXISTS OuvinteTemMusicaAprovada(IdOuvinte INTEGER,
                                                    IdMusicaAprovada INTEGER,
                                                    PRIMARY KEY(IdOuvinte, IdMusicaAprovada),
                                                    FOREIGN KEY(IdOuvinte) REFERENCES Ouvinte(id),
                                                    FOREIGN KEY(IdMusicaAprovada) REFERENCES musicaAprovada (id)
);
CREATE TABLE IF NOT EXISTS PlaylistTemMusicaAprovada(IdPlaylist INTEGER,
                                                    IdMusicaAprovada INTEGER,
                                                    PRIMARY KEY(IdPlaylist, IdMusicaAprovada),
                                                    FOREIGN KEY(IdPlaylist) REFERENCES Playlist(id),
                                                    FOREIGN KEY(IdMusicaAprovada) REFERENCES musicaAprovada(id)
                                            
                                    

);