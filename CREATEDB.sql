
-- CREATE TABLE interview (
--     interviewYear INT NOT NULL,
--     PRIMARY KEY(interviewYear)

-- );
-- CREATE TABLE student(
-- 	docNumber INT NOT NULL,
-- 	condidateNumber VARCHAR(100),
-- 	examYear VARCHAR(100),
-- 	field VARCHAR(100),
-- 	chosenFields VARCHAR(100),
-- 	fieldGroup VARCHAR(100),
-- 	lastName VARCHAR(100),
--     sudentName VARCHAR(100),
--     fatherName VARCHAR(100),
--     gender VARCHAR(100),
--     birthdate  VARCHAR(100),
--     idNumber  VARCHAR(100),
--     birthCer  VARCHAR(100),
--     nId VARCHAR(100),
--     unic VARCHAR(100),
--     religion  VARCHAR(100),
--     dutyState  VARCHAR(100),
--     birthCity  VARCHAR(100),
--     city VARCHAR(100),
--     cityCer VARCHAR(100),
--     bachUniType VARCHAR(100),
--     bachelorUni VARCHAR(100),
--     bachelorField VARCHAR(100),
--     masterUni VARCHAR(100),
--     masterField VARCHAR(100),
--     thesisTitle  VARCHAR(100),
--     masterSupervisorName  VARCHAR(100),
--     diplomaGrade  VARCHAR(100),
--     writtenDiplomaGrade  VARCHAR(100),
--     bachelorGrade  VARCHAR(100),
--     sixthSemGrade VARCHAR(100),
--     seventhSemGrade VARCHAR(100),
--     gradeWithoutThesis  VARCHAR(100),
--     gradeWithThesss  VARCHAR(100),
--     masterGrade VARCHAR(100),
--     bachelorDate VARCHAR(100),
--     masterDate VARCHAR(100),
--     employmentStatus VARCHAR(100),
--     audYear VARCHAR(100),
--     audMonth VARCHAR(100),
--     quota VARCHAR(100),
--     homeNumber VARCHAR(100),
--     emergencyNumber VARCHAR(100),
--     phoneNumber VARCHAR(100),
--     email VARCHAR(100),
--     homeAddress VARCHAR(100),
--     paid VARCHAR(100),
--     evNumber VARCHAR(100),
--     imageSent VARCHAR(100),
--     completeDoc VARCHAR(100),
--     sacrifise VARCHAR(100),
--     ahadiPrize VARCHAR(100),
--     talent BOOLEAN,   
--     interviewYear INT NOT NULL,
--     PRIMARY KEY(docNumber),
--     CONSTRAINT fk_interview 
-- 	FOREIGN KEY(interviewYear) 
-- 	REFERENCES interview(interviewYear) 
-- 	ON DELETE CASCADE ON UPDATE CASCADE);

-- UPDATE student SET selected = true WHERE docNumber  = ANY(ARRAY[56956,57957])

SELECT docnumber,studentname,lastname from student where interviewYear=1402 AND selected = true