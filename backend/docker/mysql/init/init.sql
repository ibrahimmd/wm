CREATE DATABASE IF NOT EXISTS demodb;

CREATE USER IF NOT EXISTS 'demouser'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON demodb.* TO 'demouser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE demodb;
create table if not exists users(
   user_id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(100) NOT NULL,
   firstname VARCHAR(100) NOT NULL,
   lastname VARCHAR(100) NOT NULL,
   PRIMARY KEY ( user_id )
);

create table if not exists attendance(
   attendance_id INT NOT NULL AUTO_INCREMENT,
   user_id INT NOT NULL,
   clock_in DATETIME NOT NULL,
   clock_out DATETIME,
   PRIMARY KEY ( attendance_id )
);


/* alternative and probably better way of storing clock in/clock out data? */
create table if not exists attendance_alt(
   attendance_id INT NOT NULL AUTO_INCREMENT,
   user_id INT NOT NULL,
   event_type ENUM('clock_in', 'clock_out') NOT NULL,
   created DATETIME NOT NULL,
   PRIMARY KEY ( attendance_id )
);


/* FIXME: check if index,constraint exist first */
create index index_users_username on users(username);
alter table users add constraint uc_username UNIQUE (username);

create index index_punches_userid on attendance(user_id);

/* temporary seed data */
INSERT INTO users (user_id, username, firstname, lastname) VALUES ( 1, 'user1', 'Barista', 'John'); 



