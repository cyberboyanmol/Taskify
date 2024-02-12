-- AlterEnum
ALTER TYPE "ACTION" ADD VALUE 'MOVED';

-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "previousEntityTitle" TEXT;
