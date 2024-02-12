/*
  Warnings:

  - You are about to drop the column `previousEntityTitle` on the `AuditLog` table. All the data in the column will be lost.
  - The `entityTitle` column on the `AuditLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "previousEntityTitle",
DROP COLUMN "entityTitle",
ADD COLUMN     "entityTitle" TEXT[];
