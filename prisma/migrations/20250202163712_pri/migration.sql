/*
  Warnings:

  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_linkId_fkey";

-- AlterTable
ALTER TABLE "Analytics" ALTER COLUMN "linkId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Link" DROP CONSTRAINT "Link_pkey",
ADD COLUMN     "visits" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Link_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Link_id_seq";

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
