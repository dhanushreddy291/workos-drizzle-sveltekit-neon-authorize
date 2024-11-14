CREATE TABLE IF NOT EXISTS "posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"content" text NOT NULL,
	"user_id" text DEFAULT (auth.user_id()) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "posts" AS PERMISSIVE FOR SELECT TO "anonymous" USING (true);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "posts" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "posts" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "posts" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "posts" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "posts" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.user_id() = "posts"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "posts" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.user_id() = "posts"."user_id")) WITH CHECK ((select auth.user_id() = "posts"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "posts" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.user_id() = "posts"."user_id"));