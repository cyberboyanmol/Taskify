/*
  Warnings:

  - The values [COPY] on the enum `ACTION` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ACTION_new" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'MOVED', 'COPIED');
ALTER TABLE "AuditLog" ALTER COLUMN "action" TYPE "ACTION_new" USING ("action"::text::"ACTION_new");
ALTER TYPE "ACTION" RENAME TO "ACTION_old";
ALTER TYPE "ACTION_new" RENAME TO "ACTION";
DROP TYPE "ACTION_old";
COMMIT;
