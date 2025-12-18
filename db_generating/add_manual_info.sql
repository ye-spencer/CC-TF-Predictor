INSERT INTO GeographicLocation (LocationID, CityName, StateCode, CountryCode) VALUES (1, 'Baltimore', 'MD', 'US');
INSERT INTO GeographicLocation (LocationID, CityName, StateCode, CountryCode) VALUES (2, 'Collegeville', 'PA', 'US');
INSERT INTO GeographicLocation (LocationID, CityName, StateCode, CountryCode) VALUES (3, 'Carlisle', 'PA', 'US');
INSERT INTO GeographicLocation (LocationID, CityName, StateCode, CountryCode) VALUES (4, 'Lancaster', 'PA', 'US');
INSERT INTO GeographicLocation (LocationID, CityName, StateCode, CountryCode) VALUES (5, 'Gettysburg', 'PA', 'US');
INSERT INTO GeographicLocation (LocationID, CityName, StateCode, CountryCode) VALUES (6, 'Haverford', 'PA', 'US');
INSERT INTO GeographicLocation (LocationID, CityName, StateCode, CountryCode) VALUES (7, 'Westminster', 'MD', 'US');
INSERT INTO GeographicLocation (LocationID, CityName, StateCode, CountryCode) VALUES (8, 'Allentown', 'PA', 'US');
INSERT INTO GeographicLocation (LocationID, CityName, StateCode, CountryCode) VALUES (9, 'Bryn Mawr', 'PA', 'US');
INSERT INTO GeographicLocation (LocationID, CityName, StateCode, CountryCode) VALUES (10, 'Swarthmore', 'PA', 'US');


INSERT INTO School (SchoolID, SchoolName, LocationID, StreetAddress, EnrollmentSize, HasIndoorFacility) VALUES ('Johns_Hopkins', 'Johns Hopkins University', 1, '3400 North Charles Street', 7000, False);
INSERT INTO School (SchoolID, SchoolName, LocationID, StreetAddress, EnrollmentSize, HasIndoorFacility) VALUES ('Ursinus', 'Ursinus College', 2, '601 East Main Street', 1500, True);
INSERT INTO School (SchoolID, SchoolName, LocationID, StreetAddress, EnrollmentSize, HasIndoorFacility) VALUES ('Dickinson_College', 'Dickinson College', 3, '28 North College Street', 2200, True);
INSERT INTO School (SchoolID, SchoolName, LocationID, StreetAddress, EnrollmentSize, HasIndoorFacility) VALUES ('Franklin__Marshall', 'Franklin & Marshall College', 4, '415 Harrisburg Avenue', 2250, True);
INSERT INTO School (SchoolID, SchoolName, LocationID, StreetAddress, EnrollmentSize, HasIndoorFacility) VALUES ('Gettysburg', 'Gettysburg College', 5, '300 North Washington Street', 2400, True);
INSERT INTO School (SchoolID, SchoolName, LocationID, StreetAddress, EnrollmentSize, HasIndoorFacility) VALUES ('Haverford', 'Haverford College', 6, '370 Lancaster Avenue', 1450, True);
INSERT INTO School (SchoolID, SchoolName, LocationID, StreetAddress, EnrollmentSize, HasIndoorFacility) VALUES ('McDaniel', 'McDaniel College', 7, '2 College Hill', 3000, True);
INSERT INTO School (SchoolID, SchoolName, LocationID, StreetAddress, EnrollmentSize, HasIndoorFacility) VALUES ('Muhlenberg', 'Muhlenberg College', 8, '2400 Chew Street', 1950, True);
INSERT INTO School (SchoolID, SchoolName, LocationID, StreetAddress, EnrollmentSize, HasIndoorFacility) VALUES ('Bryn_Mawr', 'Bryn Mawr College', 9, '101 North Merion Avenue', 1750, True);
INSERT INTO School (SchoolID, SchoolName, LocationID, StreetAddress, EnrollmentSize, HasIndoorFacility) VALUES ('Swarthmore', 'Swarthmore College', 10, '500 College Avenue', 1700, True);

INSERT INTO CentennialConferenceEvents (EventID, Indoor, Outdoor) VALUES
-- =========================
-- INDOOR CHAMPIONSHIPS ONLY
-- =========================
(69, TRUE,  FALSE),  -- Weight Throw
(80, TRUE,  FALSE),  -- Heptathlon (indoor)
(81, TRUE,  FALSE),  -- Pentathlon
(46, TRUE,  FALSE),  -- 60 Meters
(50, TRUE,  FALSE),  -- 60 Hurdles
(49, TRUE,  FALSE),  -- 1000 Meters (Heptathlon 1000m)
(57, TRUE,  FALSE),  -- Mile (indoor)
(60, TRUE,  FALSE),  -- 3000 Meters (indoor)
(62, TRUE,  FALSE),  -- 5000 Meters (indoor)
(51, TRUE,  FALSE),  -- 200 Meters (indoor)
(53, TRUE,  FALSE),  -- 400 Meters (indoor)
(54, TRUE,  FALSE),  -- 800 Meters (indoor)
(64, TRUE,  FALSE),  -- High Jump (indoor)
(65, TRUE,  FALSE),  -- Pole Vault (indoor)
(66, TRUE,  FALSE),  -- Long Jump (indoor)
(67, TRUE,  FALSE),  -- Triple Jump (indoor)
(68, TRUE,  FALSE),  -- Shot Put (indoor)
(71, TRUE,  FALSE),  -- 4 x 200 Relay (indoor)
(73, TRUE,  FALSE),  -- 4 x 400 Relay (indoor)
(74, TRUE,  FALSE),  -- 4 x 800 Relay (indoor)
(78, TRUE,  FALSE),  -- Distance Medley Relay (indoor)

-- ==========================
-- OUTDOOR CHAMPIONSHIPS ONLY
-- ==========================
(39, FALSE, TRUE),   -- Decathlon
(40, FALSE, TRUE),   -- Heptathlon (outdoor)
(6,  FALSE, TRUE),   -- 100 Meters
(7,  FALSE, TRUE),   -- 200 Meters
(11, FALSE, TRUE),   -- 400 Meters
(12, FALSE, TRUE),   -- 800 Meters
(13, FALSE, TRUE),   -- 1500 Meters
(21, FALSE, TRUE),   -- 5000 Meters
(22, FALSE, TRUE),   -- 10,000 Meters
(4,  FALSE, TRUE),   -- 100 Hurdles
(5,  FALSE, TRUE),   -- 110 Hurdles
(9,  FALSE, TRUE),   -- 400 Hurdles
(19, FALSE, TRUE),   -- 3000 Steeplechase
(23, FALSE, TRUE),   -- High Jump (outdoor)
(24, FALSE, TRUE),   -- Pole Vault (outdoor)
(25, FALSE, TRUE),   -- Long Jump (outdoor)
(26, FALSE, TRUE),   -- Triple Jump (outdoor)
(30, FALSE, TRUE),   -- Shot Put (outdoor)
(27, FALSE, TRUE),   -- Discus
(28, FALSE, TRUE),   -- Hammer
(29, FALSE, TRUE),   -- Javelin
(31, FALSE, TRUE),   -- 4 x 100 Relay
(33, FALSE, TRUE),   -- 4 x 400 Relay (outdoor)
(34, FALSE, TRUE);   -- 4 x 800 Relay (outdoor)

