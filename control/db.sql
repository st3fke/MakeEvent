drop database if exists DB_DBNAME;
create database DB_DBNAME;

use DB_DBNAME;

CREATE TABLE organizatori (
    id_organizatora INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    telefon VARCHAR(20),
    organizacija VARCHAR(100) -- Na primer, naziv organizacije ili kompanije
);

CREATE TABLE event (
    id_eventa INT AUTO_INCREMENT PRIMARY KEY,
    naziv_eventa VARCHAR(100) NOT NULL,
    datum_pocetka DATE NOT NULL,
    datum_kraja DATE NOT NULL,
    opis TEXT,
    id_organizatora INT, -- Veza sa tabelom organizatori
    FOREIGN KEY (id_organizatora) REFERENCES organizatori(id_organizatora)
);

CREATE TABLE aktivnosti (
    id_aktivnosti INT AUTO_INCREMENT PRIMARY KEY,
    id_eventa INT,
    naziv_aktivnosti VARCHAR(100) NOT NULL,
    opis TEXT,
    vreme_pocetka DATETIME NOT NULL,
    vreme_zavrsetka DATETIME NOT NULL,
    lokacija VARCHAR(100),
    FOREIGN KEY (id_eventa) REFERENCES event(id_eventa)
);

CREATE TABLE ucesnici (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(50) NOT NULL,
    sifra VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefon VARCHAR(20)
);

CREATE TABLE ucesce
(
    id_ucesce INT AUTO_INCREMENT PRIMARY KEY,
    id_ucesnika INT,
    id_eventa INT,
    FOREIGN KEY (id_eventa) REFERENCES event(id_eventa),
    FOREIGN KEY (id_ucesnika) REFERENCES ucesnici(id),
    opis VARCHAR(200)
);


