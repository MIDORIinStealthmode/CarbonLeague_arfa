-- CreateTable
CREATE TABLE "CarbonEmission" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "scope1" DOUBLE PRECISION,
    "scope2" DOUBLE PRECISION,
    "scope3" DOUBLE PRECISION,
    "revenue" DOUBLE PRECISION,
    "revenueUnit" TEXT,

    CONSTRAINT "CarbonEmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreReport" (
    "id" TEXT NOT NULL,
    "carbonEmissionId" TEXT NOT NULL,
    "scoreCO2Reduction" INTEGER NOT NULL,
    "scoreCarbonEfficiency" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,

    CONSTRAINT "ScoreReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarbonEmission_companyId_year_key" ON "CarbonEmission"("companyId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "ScoreReport_carbonEmissionId_key" ON "ScoreReport"("carbonEmissionId");

-- AddForeignKey
ALTER TABLE "CarbonEmission" ADD CONSTRAINT "CarbonEmission_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreReport" ADD CONSTRAINT "ScoreReport_carbonEmissionId_fkey" FOREIGN KEY ("carbonEmissionId") REFERENCES "CarbonEmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
