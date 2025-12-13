CREATE TABLE "short_urls" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "short_urls_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"long_url" varchar NOT NULL,
	"short_code" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"clicks" integer DEFAULT 0
);
