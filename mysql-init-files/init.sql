CREATE TABLE `contdel`.`greetings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `greeting` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
  
# upgraded 
ALTER TABLE `contdel`.`greetings` 
ADD COLUMN `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP AFTER `greeting`;

INSERT INTO `contdel`.`greetings` (`greeting`) VALUES ('Hello!');
INSERT INTO `contdel`.`greetings` (`greeting`) VALUES ('Servus!');
INSERT INTO `contdel`.`greetings` (`greeting`) VALUES ('Hola!');
