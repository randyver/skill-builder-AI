CREATE TABLE IF NOT EXISTS "result" (
	"result_id" uuid PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"field" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"url" text NOT NULL,
	"level" text NOT NULL,
	"field" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "result" ADD CONSTRAINT "result_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
