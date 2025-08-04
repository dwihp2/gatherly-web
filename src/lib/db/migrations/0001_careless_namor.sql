ALTER TABLE "events" ADD COLUMN "slug" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_slug_unique" UNIQUE("slug");