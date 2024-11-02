/*
  Warnings:

  - Made the column `publishedAt` on table `blogs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "published" SET DEFAULT true,
ALTER COLUMN "publishedAt" SET NOT NULL,
ALTER COLUMN "publishedAt" SET DEFAULT CURRENT_TIMESTAMP;
