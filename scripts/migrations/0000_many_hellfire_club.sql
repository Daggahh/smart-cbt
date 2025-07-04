CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" varchar(255),
	"access_token" varchar(255),
	"expires_at" varchar(255),
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" varchar(255),
	"session_state" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"action" varchar(100) NOT NULL,
	"table_name" varchar(100),
	"record_id" uuid,
	"old_values" jsonb,
	"new_values" jsonb,
	"ip_address" varchar(50),
	"user_agent" varchar(1000),
	"timestamp" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "email_notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"email_type" varchar(50) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"body" varchar(5000) NOT NULL,
	"status" varchar(20),
	"sent_at" timestamp with time zone,
	"error_message" varchar(1000),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "exam_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exam_id" uuid,
	"batch_name" varchar(100) NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"max_candidates" integer,
	"current_candidates" integer DEFAULT 0,
	"status" varchar(20),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "exam_registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exam_id" uuid,
	"batch_id" uuid,
	"user_id" uuid,
	"registration_date" timestamp with time zone DEFAULT now(),
	"status" varchar(20),
	"seat_number" varchar(20),
	"center_location" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "exam_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid,
	"user_id" uuid,
	"exam_id" uuid,
	"total_questions" integer NOT NULL,
	"questions_answered" integer DEFAULT 0,
	"correct_answers" integer DEFAULT 0,
	"total_points" integer DEFAULT 0,
	"points_earned" integer DEFAULT 0,
	"percentage_score" numeric(5, 2),
	"grade" varchar(5),
	"passed" boolean DEFAULT false,
	"time_taken" integer,
	"submitted_at" timestamp with time zone DEFAULT now(),
	"ai_feedback" jsonb,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "exam_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exam_id" uuid,
	"user_id" uuid,
	"batch_id" uuid,
	"start_time" timestamp with time zone DEFAULT now(),
	"end_time" timestamp with time zone,
	"time_remaining" integer,
	"status" varchar(20),
	"ip_address" varchar(50),
	"user_agent" varchar(1000),
	"browser_fingerprint" varchar(255),
	"is_flagged" boolean DEFAULT false,
	"flagged_reason" varchar(1000),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "exams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(2000),
	"institution_id" uuid,
	"created_by" uuid,
	"duration_minutes" integer NOT NULL,
	"total_questions" integer NOT NULL,
	"passing_score" integer DEFAULT 50,
	"randomize_questions" boolean DEFAULT true,
	"randomize_options" boolean DEFAULT true,
	"allow_review" boolean DEFAULT true,
	"show_results_immediately" boolean DEFAULT false,
	"start_time" timestamp with time zone,
	"end_time" timestamp with time zone,
	"status" varchar(20),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "file_uploads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" varchar(255) NOT NULL,
	"original_filename" varchar(255) NOT NULL,
	"file_path" varchar(500) NOT NULL,
	"file_size" integer,
	"mime_type" varchar(100),
	"uploaded_by" uuid,
	"upload_purpose" varchar(50),
	"is_processed" boolean DEFAULT false,
	"processing_status" varchar(50),
	"processing_error" varchar(1000),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "institutions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(20) NOT NULL,
	"address" varchar(500),
	"contact_email" varchar(255),
	"contact_phone" varchar(20),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "institutions_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "password_reset_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "question_banks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"subject_id" uuid,
	"institution_id" uuid,
	"created_by" uuid,
	"description" varchar(1000),
	"difficulty_level" varchar(20),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "question_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" uuid,
	"option_text" varchar(2000) NOT NULL,
	"is_correct" boolean DEFAULT false,
	"option_order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_bank_id" uuid,
	"question_text" varchar(2000) NOT NULL,
	"question_type" varchar(20),
	"difficulty_level" varchar(20),
	"points" integer DEFAULT 1,
	"explanation" varchar(2000),
	"image_url" varchar(500),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "security_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid,
	"user_id" uuid,
	"event_type" varchar(50) NOT NULL,
	"event_data" jsonb,
	"severity" varchar(20),
	"ip_address" varchar(50),
	"user_agent" varchar(1000),
	"timestamp" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_token" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "student_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid,
	"question_id" uuid,
	"selected_option_id" uuid,
	"answer_text" varchar(2000),
	"is_correct" boolean,
	"points_earned" integer DEFAULT 0,
	"time_spent" integer,
	"is_flagged" boolean DEFAULT false,
	"answered_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subjects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(20) NOT NULL,
	"description" varchar(1000),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "subjects_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "system_monitoring" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"metric_name" varchar(100) NOT NULL,
	"metric_value" numeric(10, 2),
	"metric_unit" varchar(20),
	"server_instance" varchar(100),
	"timestamp" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"role" varchar(20) NOT NULL,
	"phone" varchar(20),
	"date_of_birth" date,
	"registration_number" varchar(50),
	"is_active" boolean DEFAULT true,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_registration_number_unique" UNIQUE("registration_number")
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "verification_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_unique" ON "accounts" USING btree ("provider","provider_account_id");