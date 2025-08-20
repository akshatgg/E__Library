-- CreateEnum
CREATE TYPE "CaseCategory" AS ENUM ('all categories', 'ITAT', 'GST', 'Income tax', 'High Court', 'Supreme court', 'tribunal court');

-- CreateEnum
CREATE TYPE "TaxSection" AS ENUM ('section_7_gst', 'section_16_gst', 'section_17_gst', 'section_22_24_gst', 'section_31_gst', 'section_35_36_gst', 'section_37_39_gst', 'section_49_gst', 'section_54_gst', 'section_73_74_gst', 'section_122_gst', 'section_129_gst', 'section_140_gst', 'section_2_it', 'section_10_it', 'section_14_it', 'section_15_17_it', 'section_28_44_it', 'section_80C_80U_it', 'section_139_it', 'section_143_it', 'section_147_it', 'section_194_206_it', 'section_234_it');

-- CreateTable
CREATE TABLE "case_laws" (
    "id" TEXT NOT NULL,
    "tid" INTEGER NOT NULL,
    "author_id" INTEGER,
    "bench" TEXT,
    "cat_ids" TEXT,
    "doc_size" INTEGER,
    "doc_source" TEXT NOT NULL,
    "doc_type" INTEGER,
    "fragment" BOOLEAN DEFAULT false,
    "headline" TEXT,
    "num_cited_by" INTEGER NOT NULL DEFAULT 0,
    "num_cites" INTEGER NOT NULL DEFAULT 0,
    "publish_date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "CaseCategory",
    "TaxSection" "TaxSection",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_laws_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_details" (
    "id" TEXT NOT NULL,
    "tid" INTEGER NOT NULL,
    "agreement" BOOLEAN NOT NULL DEFAULT false,
    "cite_tid" INTEGER,
    "court_copy" BOOLEAN NOT NULL DEFAULT false,
    "div_type" TEXT,
    "doc" TEXT NOT NULL,
    "doc_source" TEXT NOT NULL,
    "num_cited_by" INTEGER NOT NULL DEFAULT 0,
    "num_cites" INTEGER NOT NULL DEFAULT 0,
    "publish_date" TEXT NOT NULL,
    "query_alert" JSONB,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "case_laws_tid_key" ON "case_laws"("tid");

-- CreateIndex
CREATE INDEX "case_laws_tid_idx" ON "case_laws"("tid");

-- CreateIndex
CREATE INDEX "case_laws_category_idx" ON "case_laws"("category");

-- CreateIndex
CREATE INDEX "case_laws_publish_date_idx" ON "case_laws"("publish_date");

-- CreateIndex
CREATE INDEX "case_laws_doc_source_idx" ON "case_laws"("doc_source");

-- CreateIndex
CREATE INDEX "case_laws_TaxSection_idx" ON "case_laws"("TaxSection");

-- CreateIndex
CREATE UNIQUE INDEX "case_details_tid_key" ON "case_details"("tid");

-- CreateIndex
CREATE INDEX "case_details_tid_idx" ON "case_details"("tid");

-- CreateIndex
CREATE INDEX "case_details_num_cited_by_idx" ON "case_details"("num_cited_by");

-- CreateIndex
CREATE INDEX "case_details_doc_source_idx" ON "case_details"("doc_source");

-- AddForeignKey
ALTER TABLE "case_details" ADD CONSTRAINT "case_details_tid_fkey" FOREIGN KEY ("tid") REFERENCES "case_laws"("tid") ON DELETE CASCADE ON UPDATE CASCADE;
