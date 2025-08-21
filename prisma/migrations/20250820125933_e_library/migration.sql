-- AlterTable
ALTER TABLE "public"."case_laws" ADD COLUMN     "TaxSection" "public"."TaxSection";

-- CreateIndex
CREATE INDEX "case_laws_TaxSection_idx" ON "public"."case_laws"("TaxSection");

-- CreateIndex
CREATE INDEX "case_laws_taxSection_idx" ON "public"."case_laws"("TaxSection");
