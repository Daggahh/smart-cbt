-- Smart CBT Seed Data
-- Truncate all relevant tables for a clean reseed (dev only!)
TRUNCATE TABLE 
  exam_registrations,
  exam_batches,
  exam_results,
  exam_sessions,
  student_answers,
  questions,
  question_options,
  question_banks,
  exams,
  users,
  institutions,
  subjects,
  security_logs,
  audit_logs,
  email_notifications,
  file_uploads,
  password_reset_tokens,
  verification_tokens,
  system_monitoring
RESTART IDENTITY CASCADE;

-- Smart CBT Seed Data
-- Insert sample data for testing and development
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert sample institutions
INSERT INTO institutions (id, name, code, address, contact_email, contact_phone) VALUES
(uuid_generate_v4(), 'Joint Admissions and Matriculation Board', 'JAMB', 'Plot 761, Herbert Macaulay Way, Central Business District, Abuja', 'info@jamb.gov.ng', '+234-9-291-4000'),
(uuid_generate_v4(), 'West African Examinations Council', 'WAEC', 'Plot 6, Lateef Jakande Road, Agidingbi, Ikeja, Lagos', 'info@waecnigeria.org', '+234-1-493-2670'),
(uuid_generate_v4(), 'University of Lagos', 'UNILAG', 'Akoka, Yaba, Lagos State', 'info@unilag.edu.ng', '+234-1-821-3131');

-- Insert sample subjects
INSERT INTO subjects (id, name, code, description) VALUES
(uuid_generate_v4(), 'Mathematics', 'MATH', 'General Mathematics covering algebra, geometry, calculus, and statistics'),
(uuid_generate_v4(), 'English Language', 'ENG', 'English language comprehension, grammar, and composition'),
(uuid_generate_v4(), 'Physics', 'PHY', 'General Physics covering mechanics, thermodynamics, and electromagnetism'),
(uuid_generate_v4(), 'Chemistry', 'CHEM', 'General Chemistry covering organic, inorganic, and physical chemistry'),
(uuid_generate_v4(), 'Biology', 'BIO', 'General Biology covering botany, zoology, and ecology'),
(uuid_generate_v4(), 'Economics', 'ECON', 'Basic economic principles and theories'),
(uuid_generate_v4(), 'Government', 'GOV', 'Nigerian government and political science'),
(uuid_generate_v4(), 'Literature in English', 'LIT', 'English literature and literary analysis');

-- Insert sample admin and super_admin users
-- Password for all users is 'password123'
INSERT INTO users (id, email, password_hash, first_name, last_name, role, phone, registration_number, is_active, email_verified) VALUES
(uuid_generate_v4(), 'odidihope@gmail.com', '$2a$12$txKPAnKrX0ezowXzs3hSCe7IRg.tIA4g4FbWLQeyiQQ9cVZZRgk8S', 'Hope', 'Odidi', 'super_admin', '+234-800-123-4567', 'ADM001', true, true),
(uuid_generate_v4(), 'razzahhhh@gmail.com', '$2a$12$txKPAnKrX0ezowXzs3hSCe7IRg.tIA4g4FbWLQeyiQQ9cVZZRgk8S', 'Razz', 'Admin', 'admin', '+234-800-123-4568', 'ADM002', true, true),
(uuid_generate_v4(), 'fake.admin@example.com', '$2a$12$txKPAnKrX0ezowXzs3hSCe7IRg.tIA4g4FbWLQeyiQQ9cVZZRgk8S', 'Fake', 'Admin', 'admin', '+234-800-000-0000', 'ADM003', true, true);

-- Insert sample student users
-- Password for all users is 'password123'
INSERT INTO users (id, email, password_hash, first_name, last_name, role, phone, date_of_birth, registration_number, is_active, email_verified) VALUES
(uuid_generate_v4(), 'hopeodidi@gmail.com', '$2a$12$txKPAnKrX0ezowXzs3hSCe7IRg.tIA4g4FbWLQeyiQQ9cVZZRgk8S', 'Hope', 'Odidi', 'student', '+234-801-234-5678', '2005-03-15', 'STU001', true, true),
(uuid_generate_v4(), 'daggerminotaur@gmail.com', '$2a$12$txKPAnKrX0ezowXzs3hSCe7IRg.tIA4g4FbWLQeyiQQ9cVZZRgk8S', 'Dagger', 'Minotaur', 'student', '+234-802-345-6789', '2004-07-22', 'STU002', true, true),
(uuid_generate_v4(), 'fake.student@example.com', '$2a$12$txKPAnKrX0ezowXzs3hSCe7IRg.tIA4g4FbWLQeyiQQ9cVZZRgk8S', 'Fake', 'Student', 'student', '+234-803-456-7890', '2005-11-08', 'STU003', true, true);

-- Get IDs for foreign key references
DO $$
DECLARE
    math_subject_id UUID;
    english_subject_id UUID;
    physics_subject_id UUID;
    jamb_institution_id UUID;
    admin_user_id UUID;
    student_user_id UUID;
    question_bank_id UUID;
    exam_id UUID;
    batch_id UUID;
BEGIN
    -- Get subject IDs
    SELECT id INTO math_subject_id FROM subjects WHERE code = 'MATH';
    SELECT id INTO english_subject_id FROM subjects WHERE code = 'ENG';
    SELECT id INTO physics_subject_id FROM subjects WHERE code = 'PHY';
    
    -- Get institution ID
    SELECT id INTO jamb_institution_id FROM institutions WHERE code = 'JAMB';
    
    -- Get user IDs
    SELECT id INTO admin_user_id FROM users WHERE email = 'odidihope@gmail.com';
    SELECT id INTO student_user_id FROM users WHERE email = 'hopeodidi@gmail.com';

    -- Insert sample question bank
    INSERT INTO question_banks (id, title, subject_id, institution_id, created_by, description, difficulty_level)
    VALUES (uuid_generate_v4(), 'JAMB Mathematics Question Bank 2024', math_subject_id, jamb_institution_id, admin_user_id, 'Comprehensive mathematics questions for JAMB UTME', 'medium')
    RETURNING id INTO question_bank_id;

    -- Insert sample questions
    INSERT INTO questions (id, question_bank_id, question_text, difficulty_level, points) VALUES
    (uuid_generate_v4(), question_bank_id, 'What is the value of x in the equation 2x + 5 = 13?', 'easy', 1),
    (uuid_generate_v4(), question_bank_id, 'Find the area of a circle with radius 7 cm. (Use π = 22/7)', 'medium', 2),
    (uuid_generate_v4(), question_bank_id, 'If log₂ 8 = x, what is the value of x?', 'medium', 2),
    (uuid_generate_v4(), question_bank_id, 'Solve for y: 3y - 7 = 2y + 5', 'easy', 1),
    (uuid_generate_v4(), question_bank_id, 'What is the derivative of x³ + 2x² - 5x + 3?', 'hard', 3);

    -- Insert question options for the first question
    INSERT INTO question_options (question_id, option_text, is_correct, option_order)
    SELECT q.id, 'x = 3', false, 1 FROM questions q WHERE q.question_text LIKE 'What is the value of x in the equation 2x + 5 = 13?'
    UNION ALL
    SELECT q.id, 'x = 4', true, 2 FROM questions q WHERE q.question_text LIKE 'What is the value of x in the equation 2x + 5 = 13?'
    UNION ALL
    SELECT q.id, 'x = 5', false, 3 FROM questions q WHERE q.question_text LIKE 'What is the value of x in the equation 2x + 5 = 13?'
    UNION ALL
    SELECT q.id, 'x = 6', false, 4 FROM questions q WHERE q.question_text LIKE 'What is the value of x in the equation 2x + 5 = 13?';

    -- Insert question options for the second question
    INSERT INTO question_options (question_id, option_text, is_correct, option_order)
    SELECT q.id, '154 cm²', true, 1 FROM questions q WHERE q.question_text LIKE 'Find the area of a circle with radius 7 cm%'
    UNION ALL
    SELECT q.id, '144 cm²', false, 2 FROM questions q WHERE q.question_text LIKE 'Find the area of a circle with radius 7 cm%'
    UNION ALL
    SELECT q.id, '164 cm²', false, 3 FROM questions q WHERE q.question_text LIKE 'Find the area of a circle with radius 7 cm%'
    UNION ALL
    SELECT q.id, '174 cm²', false, 4 FROM questions q WHERE q.question_text LIKE 'Find the area of a circle with radius 7 cm%';

    -- Create sample exam
    INSERT INTO exams (id, title, description, institution_id, created_by, duration_minutes, total_questions, passing_score, start_time, end_time, status)
    VALUES (uuid_generate_v4(), 'JAMB UTME Mathematics Mock Exam', 'Practice exam for JAMB UTME Mathematics', jamb_institution_id, admin_user_id, 120, 50, 50, 
            CURRENT_TIMESTAMP + INTERVAL '1 day', CURRENT_TIMESTAMP + INTERVAL '7 days', 'scheduled')
    RETURNING id INTO exam_id;

    -- Create exam batch
    INSERT INTO exam_batches (id, exam_id, batch_name, start_time, end_time, max_candidates)
    VALUES (uuid_generate_v4(), exam_id, 'Morning Batch A', 
            CURRENT_TIMESTAMP + INTERVAL '1 day' + INTERVAL '9 hours', 
            CURRENT_TIMESTAMP + INTERVAL '1 day' + INTERVAL '12 hours', 1000)
    RETURNING id INTO batch_id;

    -- Register student for exam
    INSERT INTO exam_registrations (exam_id, batch_id, user_id, seat_number, center_location)
    VALUES (exam_id, batch_id, student_user_id, 'A001', 'Lagos CBT Center');

END $$;