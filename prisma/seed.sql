-- Insert one main server
INSERT INTO "Servers" (ips, alert, visible, "createdAt", "updatedAt")
VALUES 
  (ARRAY['joe.onthewifi.com', 'play.hypixel.net'], 'Deez', ARRAY[true, true, true], NOW(), NOW());

-- Insert multiple timeline entries
INSERT INTO "Timeline" (title, description, year, url, button, "buttonURL", status, "serversId", "createdAt", "updatedAt")
VALUES 
  ('Javarock v4', 'The 4th world of Javarock was a custom vanilla survival server, filled with plugins and datapacks and supported both Java and Bedrock editions in version 1.18', 2023, 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT', true, 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT', true, 1, NOW(), NOW()),
  ('Javarock v4', 'The 4th world of Javarock was a custom vanilla survival server, filled with plugins and datapacks and supported both Java and Bedrock editions in version 1.18', 2024, 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT', true, 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT', true, 1, NOW(), NOW()),
  ('Javarock v4', 'The 4th world of Javarock was a custom vanilla survival server, filled with plugins and datapacks and supported both Java and Bedrock editions in version 1.18', 2024, 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT', false, '', true, 1, NOW(), NOW()),
  ('Javarock v4', 'The 4th world of Javarock was a custom vanilla survival server, filled with plugins and datapacks and supported both Java and Bedrock editions in version 1.18', 2025, 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT', true, 'https://youtu.be/a5s0TJGE5a8?si=xjGYpdRSuAP-DpgT', true, 1, NOW(), NOW());

-- Insert multiple team members
INSERT INTO "Teams" (name, role, url, image, location, "serversId", "createdAt", "updatedAt")
VALUES 
  ('Joe', 'CEO', 'https://github.com/ImHer0', 'https://wolfey.s-ul.eu/gSlQq2Ky', 'Brit', 1, NOW(), NOW()),
  ('Deez', 'Engineer', 'https://github.com/WoIfey', 'https://wolfey.s-ul.eu/LAKIfnzS', 'Finn', 1, NOW(), NOW());

-- Insert multiple server images
INSERT INTO "Images" (image, alt, "serversId", "createdAt", "updatedAt")
VALUES 
  ('https://wolfey.s-ul.eu/t252pDF5', 'Server Image 1', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/cOD06TaG', 'Server Image 2', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/gy8jKYm8', 'Server Image 3', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/fE94XZWw', 'Server Image 4', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/orIFIIkQ', 'Server Image 5', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/zNDB4NlL', 'Server Image 6', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/PgtxJsKF', 'Server Image 7', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/Rh25oqES', 'Server Image 8', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/KxcrLFQG', 'Server Image 9', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/q9JHV1hB', 'Server Image 10', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/yucsllRq', 'Server Image 11', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/iAgPWnwj', 'Server Image 12', 1, NOW(), NOW()),
  ('https://wolfey.s-ul.eu/mzRfNKQW', 'Server Image 13', 1, NOW(), NOW());
