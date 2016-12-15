drop table account;
drop table post;
CREATE TABLE account(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   password VARCHAR(40),
   PRIMARY KEY ( id ));
CREATE TABLE post(
   id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(100) NOT NULL,
   content VARCHAR(200),
   reg_date TIMESTAMP,
   PRIMARY KEY ( id ));   
insert into account(id,name,password) values(1,'wonwoo','pw123000');
insert into account(id,name,password) values(2,'kevin','Pjgn1i93');
insert into account(id,name,password) values(3,'test','Pjgn1i93');
insert into post(id,title, content, reg_date) values(1,'post1','spring boot scala', '2016-03-09 11:32:09');
insert into post(id,title, content, reg_date) values(2,'post2','spring boot scala and jpa', '2016-03-09 19:12:32');