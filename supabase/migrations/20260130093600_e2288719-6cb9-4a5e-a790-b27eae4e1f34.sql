-- Insert 15 staff members across departments
INSERT INTO staff (employee_id, first_name, last_name, role, department, shift_pattern, skills, active) VALUES
('EMP001', 'Dr. Sarah', 'Chen', 'doctor', 'Emergency', 'Day Shift', '{"specializations": ["Emergency Medicine", "Trauma"], "certifications": ["ACLS", "ATLS"]}', true),
('EMP002', 'Dr. Michael', 'Roberts', 'doctor', 'ICU', 'Night Shift', '{"specializations": ["Critical Care", "Pulmonology"], "certifications": ["ACLS", "FCCS"]}', true),
('EMP003', 'Dr. Emily', 'Thompson', 'doctor', 'Surgery', 'Day Shift', '{"specializations": ["General Surgery", "Laparoscopic"], "certifications": ["ATLS", "FACS"]}', true),
('EMP004', 'Dr. James', 'Wilson', 'doctor', 'General Ward', 'Day Shift', '{"specializations": ["Internal Medicine"], "certifications": ["ABIM"]}', true),
('EMP005', 'Jessica', 'Martinez', 'nurse', 'Emergency', 'Day Shift', '{"skills": ["Triage", "IV Therapy", "Wound Care"], "certifications": ["RN", "BLS"]}', true),
('EMP006', 'David', 'Johnson', 'nurse', 'ICU', 'Night Shift', '{"skills": ["Ventilator Management", "Critical Care"], "certifications": ["RN", "CCRN"]}', true),
('EMP007', 'Amanda', 'Brown', 'nurse', 'Surgery', 'Day Shift', '{"skills": ["Pre-op", "Post-op Care", "Surgical Assist"], "certifications": ["RN", "CNOR"]}', true),
('EMP008', 'Christopher', 'Davis', 'nurse', 'General Ward', 'Rotating', '{"skills": ["Patient Assessment", "Medication Admin"], "certifications": ["RN", "BLS"]}', true),
('EMP009', 'Stephanie', 'Miller', 'nurse', 'Emergency', 'Night Shift', '{"skills": ["Emergency Care", "Pediatric"], "certifications": ["RN", "PALS"]}', true),
('EMP010', 'Robert', 'Garcia', 'technician', 'Radiology', 'Day Shift', '{"skills": ["CT Scan", "MRI", "X-Ray"], "certifications": ["RT", "ARRT"]}', true),
('EMP011', 'Michelle', 'Anderson', 'technician', 'Laboratory', 'Day Shift', '{"skills": ["Blood Analysis", "Microbiology"], "certifications": ["MLT", "ASCP"]}', true),
('EMP012', 'Kevin', 'Taylor', 'technician', 'Radiology', 'Night Shift', '{"skills": ["X-Ray", "Ultrasound"], "certifications": ["RT"]}', true),
('EMP013', 'Lisa', 'Thomas', 'receptionist', 'Emergency', 'Day Shift', '{"skills": ["Patient Registration", "Insurance Verification", "Scheduling"]}', true),
('EMP014', 'Brian', 'Jackson', 'receptionist', 'General Ward', 'Day Shift', '{"skills": ["Admissions", "Discharge Processing", "Records Management"]}', true),
('EMP015', 'Dr. Aisha', 'Patel', 'doctor', 'Emergency', 'Rotating', '{"specializations": ["Emergency Medicine", "Pediatric Emergency"], "certifications": ["ACLS", "PALS"]}', true);

-- Insert 12 resources with varied utilization
INSERT INTO resources (resource_type, resource_name, department, capacity, current_utilization, status, metadata) VALUES
('bed', 'Emergency Beds', 'Emergency', 20, 75, 'available', '{"location": "ER Floor 1", "monitored": true}'),
('bed', 'ICU Beds', 'ICU', 12, 83, 'available', '{"location": "ICU Wing A", "monitored": true, "ventilator_ready": true}'),
('bed', 'General Ward Beds A', 'General Ward', 30, 60, 'available', '{"location": "Ward A, Floor 2"}'),
('bed', 'General Ward Beds B', 'General Ward', 30, 55, 'available', '{"location": "Ward B, Floor 3"}'),
('bed', 'Surgery Recovery', 'Surgery', 10, 40, 'available', '{"location": "Post-Op Recovery", "monitored": true}'),
('equipment', 'Ventilators', 'ICU', 8, 62, 'available', '{"type": "mechanical ventilator", "model": "Hamilton G5"}'),
('equipment', 'X-Ray Machine', 'Radiology', 3, 70, 'available', '{"type": "digital radiography", "portable": 1}'),
('equipment', 'CT Scanner', 'Radiology', 2, 85, 'available', '{"type": "64-slice CT", "contrast_capable": true}'),
('equipment', 'MRI Scanner', 'Radiology', 1, 90, 'available', '{"type": "3T MRI", "cardiac_capable": true}'),
('room', 'Operating Rooms', 'Surgery', 4, 75, 'available', '{"sterile": true, "types": ["general", "cardiac", "neuro", "ortho"]}'),
('room', 'Consultation Rooms', 'General Ward', 6, 50, 'available', '{"equipped_for": ["examination", "minor_procedures"]}'),
('facility', 'Clinical Laboratory', 'Laboratory', 1, 65, 'available', '{"services": ["hematology", "chemistry", "microbiology", "blood_bank"]}');

-- Insert 60+ patient events across the last 7 days
INSERT INTO patient_events (patient_id, event_type, event_timestamp, department, duration_minutes, event_data) VALUES
-- Day 7 ago - Admissions and Triage
('6274b8a3-5e3a-4b40-b395-505915f9433c', 'admission', NOW() - INTERVAL '7 days' + INTERVAL '8 hours', 'Emergency', 30, '{"priority": "high", "acuity": "critical", "chief_complaint": "Chest pain"}'),
('6274b8a3-5e3a-4b40-b395-505915f9433c', 'triage', NOW() - INTERVAL '7 days' + INTERVAL '8 hours 30 minutes', 'Emergency', 15, '{"priority": "high", "acuity": "critical", "vital_signs": {"bp": "160/95", "hr": 110}}'),
('91372c0d-f361-46ee-9da2-e72de614aba4', 'admission', NOW() - INTERVAL '7 days' + INTERVAL '10 hours', 'Emergency', 25, '{"priority": "medium", "acuity": "standard", "chief_complaint": "Abdominal pain"}'),
('91372c0d-f361-46ee-9da2-e72de614aba4', 'triage', NOW() - INTERVAL '7 days' + INTERVAL '10 hours 25 minutes', 'Emergency', 10, '{"priority": "medium", "acuity": "standard"}'),

-- Day 6 ago - Lab work and imaging
('6274b8a3-5e3a-4b40-b395-505915f9433c', 'lab_order', NOW() - INTERVAL '6 days' + INTERVAL '6 hours', 'Laboratory', 45, '{"priority": "high", "tests": ["troponin", "CBC", "BMP"]}'),
('6274b8a3-5e3a-4b40-b395-505915f9433c', 'imaging', NOW() - INTERVAL '6 days' + INTERVAL '8 hours', 'Radiology', 30, '{"priority": "high", "type": "CT Angiography", "findings": "pending"}'),
('3ebed4ed-6d19-413e-ab0e-47ff7b50fadd', 'admission', NOW() - INTERVAL '6 days' + INTERVAL '14 hours', 'Emergency', 20, '{"priority": "low", "acuity": "standard", "chief_complaint": "Minor laceration"}'),
('c2d93556-98f2-4cab-8790-86bcd7256634', 'admission', NOW() - INTERVAL '6 days' + INTERVAL '16 hours', 'General Ward', 35, '{"priority": "medium", "acuity": "standard", "chief_complaint": "Pneumonia follow-up"}'),

-- Day 5 ago - Consultations and transfers
('6274b8a3-5e3a-4b40-b395-505915f9433c', 'consultation', NOW() - INTERVAL '5 days' + INTERVAL '9 hours', 'ICU', 60, '{"priority": "high", "consultant": "Cardiology", "notes": "Recommend cardiac cath"}'),
('6274b8a3-5e3a-4b40-b395-505915f9433c', 'transfer', NOW() - INTERVAL '5 days' + INTERVAL '11 hours', 'ICU', 15, '{"from": "Emergency", "to": "ICU", "reason": "Elevated troponin, monitoring required"}'),
('91372c0d-f361-46ee-9da2-e72de614aba4', 'lab_order', NOW() - INTERVAL '5 days' + INTERVAL '7 hours', 'Laboratory', 30, '{"priority": "medium", "tests": ["CBC", "LFT", "lipase"]}'),
('91372c0d-f361-46ee-9da2-e72de614aba4', 'imaging', NOW() - INTERVAL '5 days' + INTERVAL '10 hours', 'Radiology', 25, '{"priority": "medium", "type": "Abdominal CT", "findings": "Appendicitis suspected"}'),
('10b8d4e8-f5fe-4e45-9445-c0fdd81e7dbc', 'admission', NOW() - INTERVAL '5 days' + INTERVAL '20 hours', 'Emergency', 30, '{"priority": "high", "acuity": "critical", "chief_complaint": "Stroke symptoms"}'),

-- Day 4 ago - Procedures and surgeries
('91372c0d-f361-46ee-9da2-e72de614aba4', 'transfer', NOW() - INTERVAL '4 days' + INTERVAL '6 hours', 'Surgery', 20, '{"from": "Emergency", "to": "Surgery", "reason": "Appendectomy scheduled"}'),
('91372c0d-f361-46ee-9da2-e72de614aba4', 'procedure', NOW() - INTERVAL '4 days' + INTERVAL '10 hours', 'Surgery', 90, '{"priority": "high", "type": "Laparoscopic Appendectomy", "status": "successful"}'),
('10b8d4e8-f5fe-4e45-9445-c0fdd81e7dbc', 'triage', NOW() - INTERVAL '4 days' + INTERVAL '1 hour', 'Emergency', 10, '{"priority": "high", "acuity": "critical", "stroke_alert": true}'),
('10b8d4e8-f5fe-4e45-9445-c0fdd81e7dbc', 'imaging', NOW() - INTERVAL '4 days' + INTERVAL '2 hours', 'Radiology', 40, '{"priority": "high", "type": "CT Head", "findings": "Ischemic stroke confirmed"}'),
('17447626-e480-4307-b85d-3750e950a084', 'admission', NOW() - INTERVAL '4 days' + INTERVAL '15 hours', 'General Ward', 25, '{"priority": "low", "acuity": "standard", "chief_complaint": "Diabetes management"}'),

-- Day 3 ago - Recovery and monitoring
('6274b8a3-5e3a-4b40-b395-505915f9433c', 'procedure', NOW() - INTERVAL '3 days' + INTERVAL '8 hours', 'Surgery', 120, '{"priority": "high", "type": "Cardiac Catheterization", "findings": "Stent placed in LAD"}'),
('91372c0d-f361-46ee-9da2-e72de614aba4', 'transfer', NOW() - INTERVAL '3 days' + INTERVAL '6 hours', 'General Ward', 15, '{"from": "Surgery", "to": "General Ward", "reason": "Post-op recovery"}'),
('10b8d4e8-f5fe-4e45-9445-c0fdd81e7dbc', 'transfer', NOW() - INTERVAL '3 days' + INTERVAL '5 hours', 'ICU', 20, '{"from": "Emergency", "to": "ICU", "reason": "Stroke monitoring, TPA administered"}'),
('fd49caa2-577d-4fb9-bae8-12f12d1f236a', 'admission', NOW() - INTERVAL '3 days' + INTERVAL '11 hours', 'Emergency', 20, '{"priority": "medium", "acuity": "standard", "chief_complaint": "Fracture"}'),
('fd49caa2-577d-4fb9-bae8-12f12d1f236a', 'imaging', NOW() - INTERVAL '3 days' + INTERVAL '12 hours', 'Radiology', 20, '{"priority": "medium", "type": "X-Ray", "findings": "Distal radius fracture"}'),
('aa06a42d-a77a-4376-a892-28f182f053d6', 'admission', NOW() - INTERVAL '3 days' + INTERVAL '18 hours', 'Emergency', 25, '{"priority": "high", "acuity": "critical", "chief_complaint": "Difficulty breathing"}'),

-- Day 2 ago - Discharges and new admissions
('3ebed4ed-6d19-413e-ab0e-47ff7b50fadd', 'discharge', NOW() - INTERVAL '2 days' + INTERVAL '10 hours', 'Emergency', 30, '{"disposition": "home", "follow_up": "PCP in 1 week"}'),
('c2d93556-98f2-4cab-8790-86bcd7256634', 'discharge', NOW() - INTERVAL '2 days' + INTERVAL '14 hours', 'General Ward', 45, '{"disposition": "home", "follow_up": "Pulmonology in 2 weeks", "medications": ["antibiotics", "inhaler"]}'),
('6274b8a3-5e3a-4b40-b395-505915f9433c', 'transfer', NOW() - INTERVAL '2 days' + INTERVAL '9 hours', 'General Ward', 20, '{"from": "ICU", "to": "General Ward", "reason": "Stable post-procedure"}'),
('aa06a42d-a77a-4376-a892-28f182f053d6', 'lab_order', NOW() - INTERVAL '2 days' + INTERVAL '1 hour', 'Laboratory', 35, '{"priority": "high", "tests": ["ABG", "BNP", "CBC"]}'),
('aa06a42d-a77a-4376-a892-28f182f053d6', 'imaging', NOW() - INTERVAL '2 days' + INTERVAL '3 hours', 'Radiology', 25, '{"priority": "high", "type": "Chest X-Ray", "findings": "Pulmonary edema"}'),
('075ef8bd-491a-4527-97f3-92d9c78e254e', 'admission', NOW() - INTERVAL '2 days' + INTERVAL '16 hours', 'General Ward', 30, '{"priority": "medium", "acuity": "standard", "chief_complaint": "Scheduled knee replacement"}'),
('8fdc204c-534e-440a-9b9c-8b4a6087ddf4', 'admission', NOW() - INTERVAL '2 days' + INTERVAL '20 hours', 'Emergency', 25, '{"priority": "medium", "acuity": "standard", "chief_complaint": "Allergic reaction"}'),

-- Day 1 ago (Yesterday) - More activity
('91372c0d-f361-46ee-9da2-e72de614aba4', 'discharge', NOW() - INTERVAL '1 day' + INTERVAL '11 hours', 'General Ward', 40, '{"disposition": "home", "follow_up": "Surgery clinic in 1 week"}'),
('fd49caa2-577d-4fb9-bae8-12f12d1f236a', 'procedure', NOW() - INTERVAL '1 day' + INTERVAL '9 hours', 'Surgery', 45, '{"priority": "medium", "type": "Closed reduction and casting", "status": "successful"}'),
('fd49caa2-577d-4fb9-bae8-12f12d1f236a', 'discharge', NOW() - INTERVAL '1 day' + INTERVAL '15 hours', 'Surgery', 30, '{"disposition": "home", "follow_up": "Ortho in 2 weeks", "equipment": ["cast", "sling"]}'),
('aa06a42d-a77a-4376-a892-28f182f053d6', 'transfer', NOW() - INTERVAL '1 day' + INTERVAL '8 hours', 'ICU', 15, '{"from": "Emergency", "to": "ICU", "reason": "CHF exacerbation, BiPAP required"}'),
('075ef8bd-491a-4527-97f3-92d9c78e254e', 'lab_order', NOW() - INTERVAL '1 day' + INTERVAL '6 hours', 'Laboratory', 30, '{"priority": "medium", "tests": ["PT/INR", "CBC", "BMP", "Type and Screen"]}'),
('075ef8bd-491a-4527-97f3-92d9c78e254e', 'procedure', NOW() - INTERVAL '1 day' + INTERVAL '13 hours', 'Surgery', 150, '{"priority": "medium", "type": "Total Knee Arthroplasty", "status": "successful"}'),
('8fdc204c-534e-440a-9b9c-8b4a6087ddf4', 'treatment', NOW() - INTERVAL '1 day' + INTERVAL '1 hour', 'Emergency', 60, '{"priority": "medium", "type": "Epinephrine, IV steroids, antihistamines"}'),
('8fdc204c-534e-440a-9b9c-8b4a6087ddf4', 'discharge', NOW() - INTERVAL '1 day' + INTERVAL '6 hours', 'Emergency', 25, '{"disposition": "home", "follow_up": "Allergist referral", "medications": ["EpiPen", "prednisone"]}'),
('7f2f2cf5-b0bb-4d23-b6cb-ffdcd59ef2eb', 'admission', NOW() - INTERVAL '1 day' + INTERVAL '22 hours', 'Emergency', 20, '{"priority": "low", "acuity": "standard", "chief_complaint": "Migraine"}'),

-- Today - Current activity
('6274b8a3-5e3a-4b40-b395-505915f9433c', 'consultation', NOW() - INTERVAL '6 hours', 'General Ward', 30, '{"priority": "medium", "consultant": "Physical Therapy", "notes": "Cardiac rehab evaluation"}'),
('10b8d4e8-f5fe-4e45-9445-c0fdd81e7dbc', 'consultation', NOW() - INTERVAL '8 hours', 'ICU', 45, '{"priority": "high", "consultant": "Neurology", "notes": "Stroke recovery assessment"}'),
('10b8d4e8-f5fe-4e45-9445-c0fdd81e7dbc', 'transfer', NOW() - INTERVAL '4 hours', 'General Ward', 20, '{"from": "ICU", "to": "General Ward", "reason": "Neurologically stable"}'),
('aa06a42d-a77a-4376-a892-28f182f053d6', 'lab_order', NOW() - INTERVAL '5 hours', 'Laboratory', 30, '{"priority": "medium", "tests": ["BNP", "renal panel"]}'),
('075ef8bd-491a-4527-97f3-92d9c78e254e', 'transfer', NOW() - INTERVAL '3 hours', 'General Ward', 15, '{"from": "Surgery", "to": "General Ward", "reason": "Post-op recovery, vitals stable"}'),
('7f2f2cf5-b0bb-4d23-b6cb-ffdcd59ef2eb', 'treatment', NOW() - INTERVAL '10 hours', 'Emergency', 45, '{"priority": "low", "type": "IV fluids, anti-emetics, pain management"}'),
('7f2f2cf5-b0bb-4d23-b6cb-ffdcd59ef2eb', 'discharge', NOW() - INTERVAL '7 hours', 'Emergency', 20, '{"disposition": "home", "follow_up": "Neurology referral if recurrent"}'),
('a8093b53-6b04-4798-be20-655ac23e5ec5', 'admission', NOW() - INTERVAL '2 hours', 'Emergency', 25, '{"priority": "high", "acuity": "critical", "chief_complaint": "Severe abdominal pain"}'),
('a8093b53-6b04-4798-be20-655ac23e5ec5', 'triage', NOW() - INTERVAL '1 hour 30 minutes', 'Emergency', 15, '{"priority": "high", "acuity": "critical", "vital_signs": {"bp": "100/60", "hr": 120}}'),
('a8093b53-6b04-4798-be20-655ac23e5ec5', 'lab_order', NOW() - INTERVAL '1 hour', 'Laboratory', 30, '{"priority": "high", "tests": ["CBC", "CMP", "lipase", "lactate"]}'),
('9e1bb144-89d8-47c9-9714-9fadc15ae07b', 'admission', NOW() - INTERVAL '1 hour', 'General Ward', 20, '{"priority": "low", "acuity": "standard", "chief_complaint": "Scheduled chemotherapy"}'),
('17447626-e480-4307-b85d-3750e950a084', 'lab_order', NOW() - INTERVAL '3 hours', 'Laboratory', 25, '{"priority": "low", "tests": ["HbA1c", "fasting glucose", "lipid panel"]}'),
('17447626-e480-4307-b85d-3750e950a084', 'consultation', NOW() - INTERVAL '1 hour', 'General Ward', 40, '{"priority": "low", "consultant": "Endocrinology", "notes": "Diabetes management review"}'),

-- Additional events to hit 60+
('ef10fd86-c74b-4963-963f-ff51bccdfe65', 'admission', NOW() - INTERVAL '5 days' + INTERVAL '7 hours', 'Emergency', 20, '{"priority": "medium", "acuity": "standard", "chief_complaint": "Chest infection"}'),
('ef10fd86-c74b-4963-963f-ff51bccdfe65', 'lab_order', NOW() - INTERVAL '5 days' + INTERVAL '8 hours', 'Laboratory', 35, '{"priority": "medium", "tests": ["CBC", "CRP", "blood culture"]}'),
('ef10fd86-c74b-4963-963f-ff51bccdfe65', 'imaging', NOW() - INTERVAL '5 days' + INTERVAL '10 hours', 'Radiology', 20, '{"priority": "medium", "type": "Chest X-Ray", "findings": "Right lower lobe consolidation"}'),
('ef10fd86-c74b-4963-963f-ff51bccdfe65', 'transfer', NOW() - INTERVAL '4 days' + INTERVAL '12 hours', 'General Ward', 15, '{"from": "Emergency", "to": "General Ward", "reason": "IV antibiotics"}'),
('ef10fd86-c74b-4963-963f-ff51bccdfe65', 'discharge', NOW() - INTERVAL '1 day' + INTERVAL '16 hours', 'General Ward', 40, '{"disposition": "home", "follow_up": "PCP in 1 week", "medications": ["oral antibiotics"]}'),
('ccbb1260-ecb3-4f2a-a577-015af8f63a9d', 'admission', NOW() - INTERVAL '3 days' + INTERVAL '9 hours', 'Emergency', 30, '{"priority": "high", "acuity": "critical", "chief_complaint": "GI bleeding"}'),
('ccbb1260-ecb3-4f2a-a577-015af8f63a9d', 'lab_order', NOW() - INTERVAL '3 days' + INTERVAL '10 hours', 'Laboratory', 25, '{"priority": "high", "tests": ["CBC", "BMP", "Type and Screen", "PT/INR"]}'),
('ccbb1260-ecb3-4f2a-a577-015af8f63a9d', 'procedure', NOW() - INTERVAL '2 days' + INTERVAL '8 hours', 'Surgery', 75, '{"priority": "high", "type": "Upper Endoscopy", "findings": "Bleeding ulcer, cauterized"}'),
('ccbb1260-ecb3-4f2a-a577-015af8f63a9d', 'transfer', NOW() - INTERVAL '2 days' + INTERVAL '12 hours', 'ICU', 15, '{"from": "Surgery", "to": "ICU", "reason": "Close monitoring post-procedure"}');
