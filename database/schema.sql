CREATE OR REPLACE FUNCTION priority_score(facilityId int)
  RETURNS TABLE (facility_id int, nurse_id int, priority_score bigint) AS
$BODY$
   DECLARE
      array_int int[]:= ARRAY(SELECT DISTINCT(cwh.nurse_id) FROM clinician_work_history AS cwh);
      uid int;
BEGIN
        FOREACH uid IN ARRAY array_int
	      LOOP
	        RAISE NOTICE '%', uid;
	      	RETURN QUERY SELECT cwh.facility_id, cwh.nurse_id, SUM(CASE
	      								WHEN cwh.worked_shift = true THEN 1
	      								WHEN cwh.call_out = true THEN -3
	      								WHEN cwh.no_call_no_show = true THEN -5
	      									ELSE 0 
	      							END) AS priority_score FROM clinician_work_history AS cwh 
	      	WHERE cwh.nurse_id = uid AND cwh.facility_id = $1
	      		GROUP BY cwh.facility_id, cwh.nurse_id;	      		
		  END LOOP;
END;

$BODY$
  LANGUAGE plpgsql VOLATILE;

CREATE TABLE clinician_work_history (
  work_history_id INTEGER PRIMARY KEY,
  facility_id INTEGER,
  nurse_id INTEGER,
  worked_shift BOOLEAN,
  call_out BOOLEAN,
  no_call_no_show BOOLEAN
);
CREATE TABLE facilities (
  facility_id INTEGER PRIMARY KEY,
  facility_name CHARACTER VARYING(255)
);
CREATE TABLE jobs (
  job_id integer PRIMARY KEY,
  facility_id INTEGER,
  nurse_type_needed CHARACTER VARYING(255),
  total_number_nurses_needed INTEGER
);
CREATE TABLE nurses (
  nurse_id INTEGER PRIMARY KEY,
  nurse_name CHARACTER VARYING(255),
  nurse_type CHARACTER VARYING(255)
);
CREATE TABLE nurse_hired_jobs (
  job_id INTEGER,
  nurse_id INTEGER,
  PRIMARY KEY (job_id, nurse_id)
);
INSERT INTO clinician_work_history
VALUES (73, 100, 3, TRUE, FALSE, FALSE),
  (72, 100, 3, TRUE, FALSE, FALSE),
  (71, 100, 5, FALSE, TRUE, FALSE),
  (70, 100, 5, FALSE, TRUE, FALSE),
  (69, 100, 5, TRUE, FALSE, FALSE),
  (68, 100, 5, TRUE, FALSE, FALSE),
  (67, 100, 4, TRUE, FALSE, FALSE),
  (66, 100, 4, TRUE, FALSE, FALSE),
  (65, 100, 4, TRUE, FALSE, FALSE),
  (64, 100, 3, FALSE, TRUE, FALSE),
  (63, 100, 3, TRUE, FALSE, FALSE),
  (62, 100, 3, TRUE, FALSE, FALSE),
  (61, 100, 3, TRUE, FALSE, FALSE),
  (60, 100, 3, TRUE, FALSE, FALSE),
  (59, 100, 2, TRUE, FALSE, FALSE),
  (58, 100, 2, TRUE, FALSE, FALSE),
  (57, 100, 1, FALSE, TRUE, FALSE),
  (56, 100, 1, TRUE, FALSE, FALSE),
  (55, 100, 1, TRUE, FALSE, FALSE),
  (54, 100, 1, TRUE, FALSE, FALSE),
  (53, 100, 1, TRUE, FALSE, FALSE),
  (52, 102, 5, TRUE, FALSE, FALSE),
  (51, 102, 5, TRUE, FALSE, FALSE),
  (50, 102, 4, TRUE, FALSE, FALSE),
  (49, 102, 4, TRUE, FALSE, FALSE),
  (48, 102, 4, TRUE, FALSE, FALSE),
  (47, 102, 3, TRUE, FALSE, FALSE),
  (46, 102, 3, TRUE, FALSE, FALSE),
  (45, 102, 3, TRUE, FALSE, FALSE),
  (44, 102, 3, TRUE, FALSE, FALSE),
  (43, 102, 2, TRUE, FALSE, FALSE),
  (42, 102, 2, TRUE, FALSE, FALSE),
  (41, 102, 1, FALSE, TRUE, FALSE),
  (40, 102, 1, TRUE, FALSE, FALSE),
  (39, 101, 5, FALSE, TRUE, FALSE),
  (38, 101, 5, TRUE, FALSE, FALSE),
  (37, 101, 5, TRUE, FALSE, FALSE),
  (36, 101, 5, TRUE, FALSE, FALSE),
  (35, 101, 5, TRUE, FALSE, FALSE),
  (34, 101, 5, TRUE, FALSE, FALSE),
  (33, 101, 5, TRUE, FALSE, FALSE),
  (32, 101, 4, FALSE, FALSE, TRUE),
  (31, 101, 4, TRUE, FALSE, FALSE),
  (30, 101, 4, TRUE, FALSE, FALSE),
  (29, 101, 4, TRUE, FALSE, FALSE),
  (28, 101, 3, FALSE, TRUE, FALSE),
  (27, 101, 3, TRUE, FALSE, FALSE),
  (26, 101, 3, TRUE, FALSE, FALSE),
  (25, 101, 3, TRUE, FALSE, FALSE),
  (24, 101, 3, TRUE, FALSE, FALSE),
  (23, 101, 3, TRUE, FALSE, FALSE),
  (22, 101, 2, TRUE, FALSE, FALSE),
  (21, 101, 2, TRUE, FALSE, FALSE),
  (20, 101, 1, TRUE, FALSE, FALSE),
  (19, 101, 1, TRUE, FALSE, FALSE),
  (18, 101, 1, TRUE, FALSE, FALSE),
  (17, 101, 1, TRUE, FALSE, FALSE),
  (16, 101, 1, TRUE, FALSE, FALSE),
  (15, 100, 5, FALSE, TRUE, FALSE),
  (14, 100, 4, TRUE, FALSE, FALSE),
  (13, 100, 3, TRUE, FALSE, FALSE),
  (12, 100, 2, FALSE, FALSE, TRUE),
  (11, 100, 1, TRUE, FALSE, FALSE),
  (10, 102, 5, TRUE, FALSE, FALSE),
  (9, 102, 4, FALSE, TRUE, FALSE),
  (8, 102, 3, TRUE, FALSE, FALSE),
  (7, 102, 2, TRUE, FALSE, FALSE),
  (6, 102, 1, TRUE, FALSE, FALSE),
  (5, 101, 5, TRUE, FALSE, FALSE),
  (4, 101, 4, TRUE, FALSE, FALSE),
  (3, 101, 3, TRUE, FALSE, FALSE),
  (2, 101, 2, TRUE, FALSE, FALSE),
  (1, 101, 1, TRUE, FALSE, FALSE);
INSERT INTO facilities
VALUES (100, 'Facility A'),
  (101, 'Facility B'),
  (102, 'Facility C');
INSERT INTO jobs
VALUES (210, 102, 'LPN', 3),
  (209, 102, 'CNA', 4),
  (208, 100, 'RN', 1),
  (207, 101, 'CNA', 1),
  (206, 101, 'LPN', 2),
  (205, 100, 'RN', 3),
  (204, 102, 'RN', 2),
  (203, 102, 'LPN', 2),
  (202, 100, 'CNA', 2),
  (201, 101, 'LPN', 1),
  (200, 100, 'RN', 1);
INSERT INTO nurses
VALUES (1010, 'Mark', 'RN'),
  (1009, 'Robert', 'LPN'),
  (1008, 'Cory', 'RN'),
  (1007, 'Adam', 'CNA'),
  (1006, 'Wesley', 'RN'),
  (1005, 'Sam', 'CNA'),
  (1004, 'Thomas', 'LPN'),
  (1003, 'John', 'LPN'),
  (1002, 'Abby', 'RN'),
  (1001, 'Anne', 'CNA'),
  (1000, 'Kevin', 'CNA');
INSERT INTO nurse_hired_jobs
VALUES (210, 1004),
  (209, 1001),
  (208, 1006),
  (207, 1005),
  (206, 1010),
  (206, 1003),
  (205, 1008),
  (204, 1008),
  (204, 1006),
  (203, 1004),
  (202, 1007),
  (201, 1003),
  (200, 1006);