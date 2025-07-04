import {
  pgTable,
  uuid,
  varchar,
  boolean,
  date,
  timestamp,
  integer,
  decimal,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  first_name: varchar("first_name", { length: 100 }).notNull(),
  last_name: varchar("last_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  date_of_birth: date("date_of_birth"),
  registration_number: varchar("registration_number", { length: 50 }).unique(),
  is_active: boolean("is_active").default(true),
  email_verified: boolean("email_verified").default(false),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// NextAuth/Drizzle Adapter tables (minimal for login to work)
export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    provider_account_id: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: varchar("expires_at", { length: 255 }),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    provider_providerAccountId: uniqueIndex(
      "accounts_provider_provider_account_id_unique"
    ).on(table.provider, table.provider_account_id),
  })
);

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  session_token: varchar("session_token", { length: 255 }).notNull().unique(),
  user_id: uuid("user_id").notNull(),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
});

export const institutions = pgTable("institutions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  address: varchar("address", { length: 500 }),
  contact_email: varchar("contact_email", { length: 255 }),
  contact_phone: varchar("contact_phone", { length: 20 }),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  description: varchar("description", { length: 1000 }),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const question_banks = pgTable("question_banks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  subject_id: uuid("subject_id"),
  institution_id: uuid("institution_id"),
  created_by: uuid("created_by"),
  description: varchar("description", { length: 1000 }),
  difficulty_level: varchar("difficulty_level", { length: 20 }),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  question_bank_id: uuid("question_bank_id"),
  question_text: varchar("question_text", { length: 2000 }).notNull(),
  question_type: varchar("question_type", { length: 20 }),
  difficulty_level: varchar("difficulty_level", { length: 20 }),
  points: integer("points").default(1),
  explanation: varchar("explanation", { length: 2000 }),
  image_url: varchar("image_url", { length: 500 }),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const question_options = pgTable("question_options", {
  id: uuid("id").primaryKey().defaultRandom(),
  question_id: uuid("question_id"),
  option_text: varchar("option_text", { length: 2000 }).notNull(),
  is_correct: boolean("is_correct").default(false),
  option_order: integer("option_order").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const exams = pgTable("exams", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 2000 }),
  institution_id: uuid("institution_id"),
  created_by: uuid("created_by"),
  duration_minutes: integer("duration_minutes").notNull(),
  total_questions: integer("total_questions").notNull(),
  passing_score: integer("passing_score").default(50),
  randomize_questions: boolean("randomize_questions").default(true),
  randomize_options: boolean("randomize_options").default(true),
  allow_review: boolean("allow_review").default(true),
  show_results_immediately: boolean("show_results_immediately").default(false),
  start_time: timestamp("start_time", { withTimezone: true }),
  end_time: timestamp("end_time", { withTimezone: true }),
  status: varchar("status", { length: 20 }),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const exam_batches = pgTable("exam_batches", {
  id: uuid("id").primaryKey().defaultRandom(),
  exam_id: uuid("exam_id"),
  batch_name: varchar("batch_name", { length: 100 }).notNull(),
  start_time: timestamp("start_time", { withTimezone: true }).notNull(),
  end_time: timestamp("end_time", { withTimezone: true }).notNull(),
  max_candidates: integer("max_candidates"),
  current_candidates: integer("current_candidates").default(0),
  status: varchar("status", { length: 20 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const exam_registrations = pgTable("exam_registrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  exam_id: uuid("exam_id"),
  batch_id: uuid("batch_id"),
  user_id: uuid("user_id"),
  registration_date: timestamp("registration_date", {
    withTimezone: true,
  }).defaultNow(),
  status: varchar("status", { length: 20 }),
  seat_number: varchar("seat_number", { length: 20 }),
  center_location: varchar("center_location", { length: 255 }),
});

export const exam_sessions = pgTable("exam_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  exam_id: uuid("exam_id"),
  user_id: uuid("user_id"),
  batch_id: uuid("batch_id"),
  start_time: timestamp("start_time", { withTimezone: true }).defaultNow(),
  end_time: timestamp("end_time", { withTimezone: true }),
  time_remaining: integer("time_remaining"),
  status: varchar("status", { length: 20 }),
  ip_address: varchar("ip_address", { length: 50 }),
  user_agent: varchar("user_agent", { length: 1000 }),
  browser_fingerprint: varchar("browser_fingerprint", { length: 255 }),
  is_flagged: boolean("is_flagged").default(false),
  flagged_reason: varchar("flagged_reason", { length: 1000 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const student_answers = pgTable("student_answers", {
  id: uuid("id").primaryKey().defaultRandom(),
  session_id: uuid("session_id"),
  question_id: uuid("question_id"),
  selected_option_id: uuid("selected_option_id"),
  answer_text: varchar("answer_text", { length: 2000 }),
  is_correct: boolean("is_correct"),
  points_earned: integer("points_earned").default(0),
  time_spent: integer("time_spent"),
  is_flagged: boolean("is_flagged").default(false),
  answered_at: timestamp("answered_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const exam_results = pgTable("exam_results", {
  id: uuid("id").primaryKey().defaultRandom(),
  session_id: uuid("session_id"),
  user_id: uuid("user_id"),
  exam_id: uuid("exam_id"),
  total_questions: integer("total_questions").notNull(),
  questions_answered: integer("questions_answered").default(0),
  correct_answers: integer("correct_answers").default(0),
  total_points: integer("total_points").default(0),
  points_earned: integer("points_earned").default(0),
  percentage_score: decimal("percentage_score", { precision: 5, scale: 2 }),
  grade: varchar("grade", { length: 5 }),
  passed: boolean("passed").default(false),
  time_taken: integer("time_taken"),
  submitted_at: timestamp("submitted_at", { withTimezone: true }).defaultNow(),
  ai_feedback: jsonb("ai_feedback"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const security_logs = pgTable("security_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  session_id: uuid("session_id"),
  user_id: uuid("user_id"),
  event_type: varchar("event_type", { length: 50 }).notNull(),
  event_data: jsonb("event_data"),
  severity: varchar("severity", { length: 20 }),
  ip_address: varchar("ip_address", { length: 50 }),
  user_agent: varchar("user_agent", { length: 1000 }),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow(),
});

export const system_monitoring = pgTable("system_monitoring", {
  id: uuid("id").primaryKey().defaultRandom(),
  metric_name: varchar("metric_name", { length: 100 }).notNull(),
  metric_value: decimal("metric_value", { precision: 10, scale: 2 }),
  metric_unit: varchar("metric_unit", { length: 20 }),
  server_instance: varchar("server_instance", { length: 100 }),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow(),
});

export const audit_logs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id"),
  action: varchar("action", { length: 100 }).notNull(),
  table_name: varchar("table_name", { length: 100 }),
  record_id: uuid("record_id"),
  old_values: jsonb("old_values"),
  new_values: jsonb("new_values"),
  ip_address: varchar("ip_address", { length: 50 }),
  user_agent: varchar("user_agent", { length: 1000 }),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow(),
});

export const email_notifications = pgTable("email_notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id"),
  email_type: varchar("email_type", { length: 50 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  body: varchar("body", { length: 5000 }).notNull(),
  status: varchar("status", { length: 20 }),
  sent_at: timestamp("sent_at", { withTimezone: true }),
  error_message: varchar("error_message", { length: 1000 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const file_uploads = pgTable("file_uploads", {
  id: uuid("id").primaryKey().defaultRandom(),
  filename: varchar("filename", { length: 255 }).notNull(),
  original_filename: varchar("original_filename", { length: 255 }).notNull(),
  file_path: varchar("file_path", { length: 500 }).notNull(),
  file_size: integer("file_size"),
  mime_type: varchar("mime_type", { length: 100 }),
  uploaded_by: uuid("uploaded_by"),
  upload_purpose: varchar("upload_purpose", { length: 50 }),
  is_processed: boolean("is_processed").default(false),
  processing_status: varchar("processing_status", { length: 50 }),
  processing_error: varchar("processing_error", { length: 1000 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const password_reset_tokens = pgTable("password_reset_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id"),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),
  used: boolean("used").default(false),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
