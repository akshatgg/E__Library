// formTemplates.ts
// This file contains all the official form templates for different departmental letters

export interface FormData {
  [key: string]: string | undefined;
}

export interface FormTemplate {
  title: string;
  generateContent: (data: FormData) => string;
}

export interface GeneratedForm {
  title: string;
  content: string;
}

export const formTemplates: Record<string, FormTemplate> = {
  // ============= TAX CATEGORY TEMPLATES =============
  
  'Income Tax Refund Application': {
    title: 'APPLICATION FOR INCOME TAX REFUND',
    generateContent: (data: FormData) => `To,
The Assessing Officer
Income Tax Department
Ward No: ${data.wardNumber || '_____'}
${data.place || 'New Delhi'}

Subject: Application for Refund of Excess Income Tax Paid for A.Y. ${data.assYear || '2024-25'}

Respected Sir/Madam,

I, ${data.partyName || '_____________'}, holding PAN ${data.panNumber || '__________'}, respectfully submit this application for refund of excess income tax paid for Assessment Year ${data.assYear || '2024-25'}.

DETAILS:
1. Name of Assessee: ${data.partyName || '_____________'}
2. PAN: ${data.panNumber || '__________'}
3. Assessment Year: ${data.assYear || '2024-25'}
4. Address: ${data.address || '_____________'}

GROUNDS FOR REFUND:
As per my computation and the provisions of Income Tax Act, 1961, I have paid excess tax of Rs. ${data.refundAmount || '_______'} during the financial year.

BANK DETAILS FOR REFUND:
Bank Name: ${data.bankName || '_____________'}
Account Number: ${data.accountNumber || '_____________'}
IFSC Code: ${data.ifscCode || '_____________'}

I request you to kindly process my refund claim and credit the amount to the above bank account.

Yours faithfully,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}

Enclosures:
1. Copy of ITR Filed
2. Copy of Form 26AS
3. Proof of Tax Payments
4. Bank Account Details`
  },

  'Excess Payment Refund': {
    title: 'APPLICATION FOR EXCESS PAYMENT REFUND',
    generateContent: (data: FormData) => `To,
The Income Tax Officer
Ward No: ${data.wardNumber || '_____'}
${data.place || 'New Delhi'}

Subject: Refund of Excess Payment made for A.Y. ${data.assYear || '2024-25'}

Sir/Madam,

I am ${data.partyName || '_____________'}, PAN: ${data.panNumber || '__________'}, and I am writing to request a refund of excess payment made towards income tax.

PAYMENT DETAILS:
- Assessment Year: ${data.assYear || '2024-25'}
- Excess Payment: Rs. ${data.excessAmount || data.refundAmount || '_______'}

The excess payment was made inadvertently while filing advance tax/self-assessment tax. I request you to process the refund and credit to my bank account.

Bank Details:
Name: ${data.bankName || '_____________'}
Account: ${data.accountNumber || '_____________'}
IFSC: ${data.ifscCode || '_____________'}

Thanking you,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Tax Credit Refund': {
    title: 'APPLICATION FOR TAX CREDIT REFUND',
    generateContent: (data: FormData) => `To,
The Assessing Officer
Income Tax Department
Ward No: ${data.wardNumber || '_____'}

Subject: Refund of Tax Credit for A.Y. ${data.assYear || '2024-25'}

Respected Sir/Madam,

I, ${data.partyName || '_____________'}, PAN: ${data.panNumber || '__________'}, request refund of tax credit as per details below:

TAX CREDIT DETAILS:
1. Relief under Section 89: Rs. ${data.relief89 || '_______'}
2. Foreign Tax Credit: Rs. ${data.foreignTaxCredit || '_______'}

Total Credit Eligible for Refund: Rs. ${data.totalCredit || data.refundAmount || '_______'}

I have filed my return for A.Y. ${data.assYear || '2024-25'} and the above credits are available for refund.

Kindly process the refund to my bank account:
${data.bankName || '_____________'}
Account: ${data.accountNumber || '_____________'}
IFSC: ${data.ifscCode || '_____________'}

Yours sincerely,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Advance Tax Refund': {
    title: 'APPLICATION FOR ADVANCE TAX REFUND',
    generateContent: (data: FormData) => `To,
The Income Tax Officer
Ward No: ${data.wardNumber || '_____'}
Income Tax Department

Subject: Refund of Excess Advance Tax Paid for A.Y. ${data.assYear || '2024-25'}

Sir/Madam,

I, ${data.partyName || '_____________'}, PAN: ${data.panNumber || '__________'}, have paid excess advance tax for Assessment Year ${data.assYear || '2024-25'}.

ADVANCE TAX PAYMENT DETAILS:
Total Advance Tax Paid: Rs. ${data.totalAdvanceTax || data.refundAmount || '_______'}
Excess Payment: Rs. ${data.excessAdvanceTax || data.refundAmount || '_______'}

The excess payment occurred due to changes in income during the year. I request refund of the excess amount.

Bank Details for Refund:
Bank: ${data.bankName || '_____________'}
Account: ${data.accountNumber || '_____________'}
IFSC: ${data.ifscCode || '_____________'}

Thanking you,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  // ============= TDS CATEGORY TEMPLATES =============
  
  'TDS Return Filing (24Q)': {
    title: 'TDS RETURN FORM 24Q - QUARTERLY RETURN',
    generateContent: (data: FormData) => `FORM 24Q
QUARTERLY RETURN OF TAX DEDUCTED AT SOURCE ON SALARIES

Deductor Details:
Name: ${data.deductorName || data.firmName || '_____________'}
TAN: ${data.tanNumber || '__________'}
PAN: ${data.panNumber || '__________'}
Address: ${data.address || '_____________'}

Return Details:
Quarter: ${data.quarter || 'Q4'}
Financial Year: ${data.financialYear || '2024-25'}

Summary of TDS:
Total No. of Employees: ${data.totalEmployees || '_______'}
Total Salary Paid: Rs. ${data.totalSalary || '_______'}
Total TDS Deducted: Rs. ${data.totalTDS || data.tdsAmount || '_______'}

DECLARATION:
I, ${data.authorizedPerson || data.partyName || '_____________'}, declare that the information given above is true and correct.

Signature: _______________
Name: ${data.authorizedPerson || data.partyName || '_____________'}
Designation: ${data.designation || 'Authorized Signatory'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'TDS Return Filing (26Q)': {
    title: 'TDS RETURN FORM 26Q - OTHER THAN SALARY',
    generateContent: (data: FormData) => `FORM 26Q
QUARTERLY RETURN OF TAX DEDUCTED AT SOURCE (OTHER THAN SALARY)

Deductor Details:
Name: ${data.deductorName || data.firmName || '_____________'}
TAN: ${data.tanNumber || '__________'}
PAN: ${data.panNumber || '__________'}
Address: ${data.address || '_____________'}

Return Details:
Quarter: ${data.quarter || 'Q4'}
Financial Year: ${data.financialYear || '2024-25'}

Summary of TDS:
Total Deductees: ${data.totalDeductees || '_______'}
Total Amount Paid: Rs. ${data.totalAmountPaid || '_______'}
Total TDS Deducted: Rs. ${data.totalTDS || data.tdsAmount || '_______'}

Nature of Payments:
1. Professional Fees (194J): Rs. ${data.professionalFees || '_______'}
2. Commission (194H): Rs. ${data.commission || '_______'}
3. Rent (194I): Rs. ${data.rent || '_______'}

DECLARATION:
I declare that the information given above is true and correct.

${data.authorizedPerson || data.partyName || '_____________'}
Designation: ${data.designation || 'Authorized Signatory'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'TDS Return Filing (27Q)': {
    title: 'TDS RETURN FORM 27Q - TCS QUARTERLY RETURN',
    generateContent: (data: FormData) => `FORM 27Q
QUARTERLY RETURN OF TAX COLLECTED AT SOURCE

Collector Details:
Name: ${data.collectorName || data.firmName || '_____________'}
TAN: ${data.tanNumber || '__________'}
PAN: ${data.panNumber || '__________'}
Address: ${data.address || '_____________'}

Return Details:
Quarter: ${data.quarter || 'Q4'}
Financial Year: ${data.financialYear || '2024-25'}

Summary of TCS:
Total Collectees: ${data.totalCollectees || '_______'}
Total Amount Collected: Rs. ${data.totalAmountCollected || '_______'}
Total TCS Collected: Rs. ${data.totalTCS || '_______'}

Nature of Collection:
1. Sale of Goods: Rs. ${data.saleOfGoods || '_______'}
2. Sale of Scrap: Rs. ${data.saleOfScrap || '_______'}

DECLARATION:
I declare that the information given above is true and correct.

${data.authorizedPerson || data.partyName || '_____________'}
Designation: ${data.designation || 'Authorized Signatory'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Form 16 Generation': {
    title: 'FORM 16 - CERTIFICATE OF DEDUCTION OF TAX FROM SALARY',
    generateContent: (data: FormData) => `FORM 16
Certificate of deduction of tax from salary

EMPLOYER DETAILS:
Name: ${data.employerName || data.firmName || '_____________'}
Address: ${data.employerAddress || data.address || '_____________'}
TAN: ${data.tanNumber || '__________'}
PAN: ${data.employerPAN || data.panNumber || '__________'}

EMPLOYEE DETAILS:
Name: ${data.employeeName || data.partyName || '_____________'}
PAN: ${data.employeePAN || data.panNumber || '__________'}
Employee Code: ${data.employeeCode || '_______'}
Address: ${data.employeeAddress || data.address || '_____________'}

Period: From ${data.periodFrom || '01/04/2024'} To ${data.periodTo || '31/03/2025'}
Assessment Year: ${data.assYear || '2025-26'}

SALARY DETAILS:
Gross Salary: Rs. ${data.grossSalary || '_______'}
Less: Allowances exempt: Rs. ${data.exemptAllowances || '_______'}
Balance: Rs. ${data.balanceIncome || '_______'}

DEDUCTIONS:
Section 80C: Rs. ${data.sec80C || '_______'}
Section 80D: Rs. ${data.sec80D || '_______'}
Total Deductions: Rs. ${data.totalDeductions || '_______'}

TAX COMPUTATION:
Total Income: Rs. ${data.totalIncome || '_______'}
Tax on Income: Rs. ${data.taxOnIncome || '_______'}
Education Cess: Rs. ${data.educationCess || '_______'}
Total Tax: Rs. ${data.totalTaxPayable || '_______'}
TDS Deducted: Rs. ${data.totalTDS || data.tdsAmount || '_______'}

This is to certify that tax deducted has been paid to the Central Government.

${data.authorizedSignatory || '_____________'}
Designation: ${data.designation || 'HR Manager'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Form 16A Generation': {
    title: 'FORM 16A - CERTIFICATE OF DEDUCTION OF TAX AT SOURCE',
    generateContent: (data: FormData) => `FORM 16A
Certificate of deduction of tax at source (other than salary)

DEDUCTOR DETAILS:
Name: ${data.deductorName || data.firmName || '_____________'}
Address: ${data.deductorAddress || data.address || '_____________'}
TAN: ${data.tanNumber || '__________'}
PAN: ${data.deductorPAN || data.panNumber || '__________'}

DEDUCTEE DETAILS:
Name: ${data.deducteeName || data.partyName || '_____________'}
PAN: ${data.deducteePAN || data.panNumber || '__________'}
Address: ${data.deducteeAddress || data.address || '_____________'}

PAYMENT & TDS DETAILS:
Amount Paid: Rs. ${data.amountPaid || '_______'}
Nature of Payment: ${data.natureOfPayment || 'Professional Fees'}
Section: ${data.section || '194J'}
Rate of TDS: ${data.tdsRate || '10'}%
TDS Amount: Rs. ${data.tdsAmount || '_______'}
TDS Deposited: Rs. ${data.tdsDeposited || data.tdsAmount || '_______'}

CHALLAN DETAILS:
Challan No: ${data.challanNumber || '_______'}
Date: ${data.challanDate || '_______'}
Bank: ${data.bankName || '_______'}

This is to certify that tax deducted has been paid to the Central Government.

${data.authorizedSignatory || '_____________'}
Designation: ${data.designation || 'Accounts Manager'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'TDS Refund Application': {
    title: 'APPLICATION FOR TDS REFUND',
    generateContent: (data: FormData) => `To,
The Income Tax Officer
TDS Circle
${data.place || 'New Delhi'}

Subject: Refund of Excess TDS Deducted for F.Y. ${data.financialYear || '2024-25'}

Respected Sir/Madam,

I, ${data.partyName || '_____________'}, PAN: ${data.panNumber || '__________'}, request refund of excess TDS deducted.

TDS DETAILS:
Total TDS Deducted: Rs. ${data.totalTDSDeducted || data.tdsAmount || '_______'}
Actual Tax Liability: Rs. ${data.actualTaxLiability || '_______'}
Excess TDS: Rs. ${data.excessTDS || data.refundAmount || '_______'}

DEDUCTOR DETAILS:
Name: ${data.deductorName || data.firmName || '_______'}
TAN: ${data.deductorTAN || '_______'}

I have filed my ITR and the excess TDS is available for refund.

Bank Details:
Bank: ${data.bankName || '_____________'}
Account: ${data.accountNumber || '_____________'}
IFSC: ${data.ifscCode || '_____________'}

Yours faithfully,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  // ============= SERVE CATEGORY TEMPLATES =============
  
  'Income Tax Notice Reply': {
    title: 'REPLY TO INCOME TAX NOTICE',
    generateContent: (data: FormData) => `To,
${data.assessingOfficer || 'The Assessing Officer'}
Income Tax Department
Ward No: ${data.wardNumber || '_____'}
${data.place || 'New Delhi'}

Subject: Reply to Notice under Section ${data.noticeSection || '143(2)'} dated ${data.noticeDate || '_______'}

Respected Sir/Madam,

With reference to your notice dated ${data.noticeDate || '_______'}, I, ${data.partyName || '_____________'}, PAN: ${data.panNumber || '__________'}, submit my reply as follows:

ASSESSEE DETAILS:
Name: ${data.partyName || '_____________'}
PAN: ${data.panNumber || '__________'}
Assessment Year: ${data.assYear || '2024-25'}
Address: ${data.address || '_____________'}

REPLY TO QUERIES:
1. The income has been properly disclosed in the return filed.
2. All investments are made from disclosed sources of income.
3. All expenses are genuine and supported by proper vouchers.

DOCUMENTS ENCLOSED:
1. Copy of Books of Accounts
2. Bank Statements
3. Investment Proofs
4. Bills and Vouchers

I submit that the return filed is correct and complete. I request you to kindly consider the submission and close the case.

Thanking you,
Yours faithfully,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Assessment Notice Response': {
    title: 'RESPONSE TO ASSESSMENT NOTICE',
    generateContent: (data: FormData) => `To,
${data.assessingOfficer || 'The Assessing Officer'}
Income Tax Department
Ward No: ${data.wardNumber || '_____'}

Subject: Response to Assessment Notice for A.Y. ${data.assYear || '2024-25'}

Respected Sir/Madam,

In response to your assessment notice dated ${data.noticeDate || '_______'}, I submit the following:

ASSESSMENT DETAILS:
Assessee: ${data.partyName || '_____________'}
PAN: ${data.panNumber || '__________'}
Assessment Year: ${data.assYear || '2024-25'}

INCOME COMPUTATION:
Total Income as per Return: Rs. ${data.returnedIncome || '_______'}
Additions proposed: Rs. ${data.proposedAdditions || '_______'}
Our Submission: The additions are not justified as the income is correctly computed.

SUPPORTING DOCUMENTS:
All relevant documents are enclosed herewith.

I request you to accept the return as filed.

Yours faithfully,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Penalty Notice Reply': {
    title: 'REPLY TO PENALTY NOTICE',
    generateContent: (data: FormData) => `To,
${data.assessingOfficer || 'The Assessing Officer'}
Income Tax Department
Ward No: ${data.wardNumber || '_____'}

Subject: Reply to Penalty Notice under Section ${data.penaltySection || '271(1)(c)'} for A.Y. ${data.assYear || '2024-25'}

Respected Sir/Madam,

With reference to penalty notice dated ${data.noticeDate || '_______'}, I submit my reply:

PENALTY DETAILS:
Penalty Amount: Rs. ${data.penaltyAmount || '_______'}
Grounds: ${data.penaltyGrounds || 'Concealment of income'}

SUBMISSION:
1. There is no concealment of income or furnishing of inaccurate particulars.
2. All income has been correctly disclosed in the return.
3. The assessment is based on estimates without proper evidence.

PRAYER:
I request you to drop the penalty proceedings as there is no case for penalty.

Yours faithfully,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Show Cause Notice Response': {
    title: 'RESPONSE TO SHOW CAUSE NOTICE',
    generateContent: (data: FormData) => `To,
${data.issuingAuthority || 'The Income Tax Officer'}
Income Tax Department
Ward No: ${data.wardNumber || '_____'}

Subject: Response to Show Cause Notice dated ${data.noticeDate || '_______'}

Respected Sir/Madam,

In response to show cause notice dated ${data.noticeDate || '_______'}, I submit:

CAUSE SHOWN:
1. ${data.cause1 || 'All transactions are genuine and properly recorded'}
2. ${data.cause2 || 'Supporting documents are available'}
3. ${data.cause3 || 'No violation of law has been committed'}

DOCUMENTARY EVIDENCE:
All relevant documents supporting our case are enclosed.

PRAYER:
I request you to accept the explanation and close the proceedings.

Yours faithfully,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Personal Hearing Request': {
    title: 'APPLICATION FOR PERSONAL HEARING',
    generateContent: (data: FormData) => `To,
${data.assessingOfficer || 'The Assessing Officer'}
Income Tax Department
Ward No: ${data.wardNumber || '_____'}
${data.place || 'New Delhi'}

Subject: Request for Personal Hearing for A.Y. ${data.assYear || '2024-25'}

Respected Sir/Madam,

I, ${data.partyName || '_____________'}, PAN: ${data.panNumber || '__________'}, request for a personal hearing in connection with assessment proceedings for Assessment Year ${data.assYear || '2024-25'}.

CASE DETAILS:
Case ID: ${data.caseId || '_______'}
Notice Date: ${data.noticeDate || '_______'}

GROUNDS FOR HEARING:
1. To explain the facts and circumstances of the case
2. To present additional evidence
3. To clarify doubts regarding income computation

I request you to kindly grant me a hearing at your convenience.

Thanking you,
Yours faithfully,

${data.partyName || '_____________'}
Contact: ${data.phone || '_______'}
Email: ${data.email || '_______'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  // ============= VAL CATEGORY TEMPLATES =============
  
  'Land Valuation Report': {
    title: 'LAND VALUATION REPORT',
    generateContent: (data: FormData) => `LAND VALUATION REPORT

CLIENT DETAILS:
Name: ${data.clientName || data.partyName || '_____________'}
Address: ${data.clientAddress || data.address || '_____________'}
PAN: ${data.panNumber || '__________'}

LAND DETAILS:
Location: ${data.landLocation || data.address || '_____________'}
Survey No: ${data.surveyNumber || '_______'}
Area: ${data.landArea || '_______'} sq.ft.
Classification: ${data.landClassification || 'Agricultural/Non-Agricultural'}

VALUATION DETAILS:
Date of Valuation: ${data.valuationDate || data.currentDate || new Date().toLocaleDateString()}
Purpose: ${data.valuationPurpose || 'Tax Assessment'}
Method: ${data.valuationMethod || 'Comparable Sales Method'}

MARKET ANALYSIS:
Comparable Sale 1: Rs. ${data.rate1 || '_______'} per sq.ft.
Comparable Sale 2: Rs. ${data.rate2 || '_______'} per sq.ft.
Comparable Sale 3: Rs. ${data.rate3 || '_______'} per sq.ft.
Average Market Rate: Rs. ${data.averageRate || '_______'} per sq.ft.

VALUATION:
Land Value: Rs. ${data.landValue || '_______'}
Per sq.ft. Rate: Rs. ${data.perSqftRate || '_______'}

CERTIFICATE:
I certify that the above valuation represents the fair market value of the land.

${data.valuatorName || '_____________'}
Registered Valuer
Registration No: ${data.valuatorRegNo || '_______'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Building Valuation': {
    title: 'BUILDING VALUATION REPORT',
    generateContent: (data: FormData) => `BUILDING VALUATION REPORT

PROPERTY DETAILS:
Owner: ${data.ownerName || data.partyName || '_____________'}
Property Address: ${data.propertyAddress || data.address || '_____________'}
Building Type: ${data.buildingType || 'Residential'}
Age of Building: ${data.buildingAge || '_______'} years

CONSTRUCTION DETAILS:
Built-up Area: ${data.builtupArea || '_______'} sq.ft.
Carpet Area: ${data.carpetArea || '_______'} sq.ft.
Construction Quality: ${data.constructionQuality || 'Good'}
Year of Construction: ${data.constructionYear || '_______'}

VALUATION METHODOLOGY:
Approach Used: ${data.approach || 'Cost Approach'}
Construction Cost: Rs. ${data.constructionCost || '_______'} per sq.ft.
Depreciation: ${data.depreciation || '_______'}%
Current Replacement Cost: Rs. ${data.replacementCost || '_______'}

VALUATION:
Land Value: Rs. ${data.landValue || '_______'}
Building Value: Rs. ${data.buildingValue || '_______'}
Total Property Value: Rs. ${data.totalPropertyValue || '_______'}

${data.valuatorName || 'Certified Valuer'}
Registration: ${data.valuatorRegNo || '_______'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Market Value Assessment': {
    title: 'MARKET VALUE ASSESSMENT REPORT',
    generateContent: (data: FormData) => `MARKET VALUE ASSESSMENT REPORT

PROPERTY IDENTIFICATION:
Owner: ${data.propertyOwner || data.partyName || '_____________'}
Property: ${data.propertyDescription || '_____________'}
Location: ${data.propertyLocation || data.address || '_____________'}
Survey/Plot No: ${data.plotNumber || '_______'}

MARKET ANALYSIS:
Valuation Date: ${data.valuationDate || data.currentDate}
Market Conditions: ${data.marketConditions || 'Stable'}
Demand-Supply: ${data.demandSupply || 'Balanced'}

COMPARABLE SALES:
Sale 1: ${data.comp1Address || '_______'} - Rs. ${data.comp1Rate || '_______'}/sq.ft.
Sale 2: ${data.comp2Address || '_______'} - Rs. ${data.comp2Rate || '_______'}/sq.ft.
Sale 3: ${data.comp3Address || '_______'} - Rs. ${data.comp3Rate || '_______'}/sq.ft.

ADJUSTMENTS:
Location: ${data.locationAdjustment || '0'}%
Size: ${data.sizeAdjustment || '0'}%
Condition: ${data.conditionAdjustment || '0'}%

FAIR MARKET VALUE:
Adjusted Rate: Rs. ${data.adjustedRate || '_______'} per sq.ft.
Total Area: ${data.totalArea || '_______'} sq.ft.
Market Value: Rs. ${data.marketValue || '_______'}

${data.valuatorName || 'Registered Valuer'}
Valuer Registration No: ${data.valuatorRegNo || '_______'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  'Company Valuation': {
    title: 'COMPANY VALUATION REPORT',
    generateContent: (data: FormData) => `COMPANY VALUATION REPORT

COMPANY DETAILS:
Name: ${data.companyName || data.firmName || '_____________'}
CIN: ${data.cin || '_______'}
PAN: ${data.panNumber || '__________'}
Registered Office: ${data.registeredOffice || data.address || '_____________'}

VALUATION DETAILS:
Valuation Date: ${data.valuationDate || data.currentDate}
Purpose: ${data.valuationPurpose || 'Income Tax Assessment'}
Standard: ${data.valuationStandard || 'International Valuation Standards'}
Approach: ${data.valuationApproach || 'Income Approach'}

FINANCIAL SUMMARY (Rs. in Lakhs):
Revenue: ${data.revenue || '_______'}
EBITDA: ${data.ebitda || '_______'}
PAT: ${data.pat || '_______'}
Total Assets: ${data.totalAssets || '_______'}
Net Worth: ${data.netWorth || '_______'}

VALUATION METHODOLOGY:
Method Used: ${data.method || 'DCF Method'}
Discount Rate: ${data.discountRate || '_______'}%
Terminal Growth: ${data.terminalGrowth || '_______'}%
Projection Period: ${data.projectionPeriod || '5'} years

VALUATION CONCLUSION:
Enterprise Value: Rs. ${data.enterpriseValue || '_______'} Lakhs
Equity Value: Rs. ${data.equityValue || '_______'} Lakhs
Value per Share: Rs. ${data.valuePerShare || '_______'}

${data.valuatorName || 'Certified Valuer'}
Membership No: ${data.membershipNo || '_______'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  // ============= ROC CATEGORY TEMPLATES =============
  
  'Annual Return Filing': {
    title: 'FORM MGT-7 - ANNUAL RETURN',
    generateContent: (data: FormData) => `FORM MGT-7
ANNUAL RETURN
[Pursuant to section 92(3) of the Companies Act, 2013]

I. REGISTRATION AND OTHER DETAILS:
1. CIN: ${data.cin || '_______'}
2. Registration Date: ${data.incorporationDate || '_______'}
3. Company Name: ${data.companyName || data.firmName || '_____________'}
4. Company Category: ${data.companyCategory || 'Company limited by shares'}
5. Company Sub-Category: ${data.companySubCategory || 'Non-govt company'}
6. Class of Company: ${data.companyClass || 'Private'}

II. REGISTERED OFFICE ADDRESS:
${data.registeredOffice || data.address || '_____________'}
Pin Code: ${data.pinCode || '_______'}
State: ${data.state || '_______'}
Country: India

III. CONTACT DETAILS:
Email: ${data.companyEmail || data.email || '_______'}
Telephone: ${data.companyPhone || '_______'}
Website: ${data.website || '_______'}

IV. PRINCIPAL BUSINESS ACTIVITIES:
Main Division: ${data.mainDivision || 'Manufacturing'}
Business Activity: ${data.businessActivity || 'Trading'}
NIC Code: ${data.nicCode || '_______'}
% of Turnover: ${data.turnoverPercentage || '100'}%

V. PARTICULARS OF HOLDING AND SUBSIDIARY:
${data.subsidiaryDetails || 'NA - No holding/subsidiary companies'}

VI. SHARE CAPITAL:
Authorized Capital: Rs. ${data.authorizedCapital || '_______'}
Total Paid-up Capital: Rs. ${data.paidupCapital || '_______'}

VII. PARTICULARS OF MEMBERS:
Total Members: ${data.totalMembers || '_______'}
Promoters: ${data.promoterCount || '_______'}
Public: ${data.publicCount || '_______'}

VIII. PARTICULARS OF DIRECTORS AND KMP:
${data.directorDetails || 'As per Form DIR-12 filed'}

IX. MEETINGS OF MEMBERS:
AGM Date: ${data.agmDate || '_______'}
Extraordinary Meetings: ${data.egmCount || '0'}

X. REMUNERATION OF DIRECTORS AND KMP:
Total Remuneration: Rs. ${data.totalRemuneration || '_______'} Lakhs

For ${data.companyName || data.firmName || '_____________'}

${data.directorName || data.partyName || '_____________'}
Director
DIN: ${data.directorDIN || '_______'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  'Financial Statement Filing': {
    title: 'BOARD RESOLUTION FOR FINANCIAL STATEMENT FILING',
    generateContent: (data: FormData) => `BOARD RESOLUTION
${data.companyName || data.firmName || '_____________'}
CIN: ${data.cin || '_______'}

RESOLUTION FOR APPROVAL OF FINANCIAL STATEMENTS

Date of Meeting: ${data.meetingDate || data.currentDate}
Venue: ${data.meetingVenue || 'Registered Office'}

PRESENT:
1. ${data.director1 || '_______'} - Chairman
2. ${data.director2 || '_______'} - Director
3. ${data.director3 || '_______'} - Director

RESOLVED THAT:

1. The Audited Financial Statements for the Financial Year ended ${data.fyEndDate || '31st March, 2025'} as prepared by the management and audited by ${data.auditorName || 'M/s. _______'}, Chartered Accountants, be and are hereby approved.

2. The following Financial Statements are approved:
   - Balance Sheet as at ${data.fyEndDate || '31st March, 2025'}
   - Statement of Profit & Loss for the year ended ${data.fyEndDate || '31st March, 2025'}
   - Cash Flow Statement for the year ended ${data.fyEndDate || '31st March, 2025'}
   - Statement of Changes in Equity for the year ended ${data.fyEndDate || '31st March, 2025'}
   - Notes to Financial Statements

3. The Company Secretary is authorized to file the Financial Statements with the Registrar of Companies within the prescribed time limit.

4. The Board also approves the Board Report for the Financial Year ${data.financialYear || '2024-25'}.

FINANCIAL HIGHLIGHTS:
Total Income: Rs. ${data.totalIncome || '_______'} Lakhs
Total Expenses: Rs. ${data.totalExpenses || '_______'} Lakhs
Profit After Tax: Rs. ${data.profitAfterTax || '_______'} Lakhs

For ${data.companyName || data.firmName || '_____________'}

${data.chairmanName || data.partyName || '_____________'}
Chairman & Managing Director
DIN: ${data.chairmanDIN || '_______'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  'Board Resolution': {
    title: 'BOARD RESOLUTION',
    generateContent: (data: FormData) => `BOARD RESOLUTION
${data.companyName || data.firmName || '_____________'}
CIN: ${data.cin || '_______'}

EXTRACT OF RESOLUTION PASSED AT THE MEETING OF BOARD OF DIRECTORS

Date: ${data.resolutionDate || data.currentDate}
Time: ${data.meetingTime || '11:00 AM'}
Venue: ${data.meetingVenue || 'Registered Office'}

MEMBERS PRESENT:
1. ${data.member1 || data.partyName || '_______'} - Director (DIN: ${data.din1 || '_______'})
2. ${data.member2 || '_______'} - Director (DIN: ${data.din2 || '_______'})

RESOLUTION:

RESOLVED THAT ${data.resolutionSubject || '_______'}

DETAILS:
${data.resolutionDetails || 'As per the discussion and deliberation, the Board hereby resolves to approve the above matter.'}

FURTHER RESOLVED THAT:
${data.furtherResolved || 'The authorized persons are empowered to take all necessary actions.'}

VOTING:
In Favour: ${data.votesInFavour || 'All Directors'}
Against: ${data.votesAgainst || 'Nil'}
Abstained: ${data.abstained || 'Nil'}

This resolution is passed unanimously.

For ${data.companyName || data.firmName || '_____________'}

${data.chairperson || data.partyName || '_____________'}
Chairperson
Date: ${data.currentDate}
Place: ${data.place || '_______'}

${data.companySecretary || '_____________'}
Company Secretary
Date: ${data.currentDate}`
  },

  'Company Registration': {
    title: 'APPLICATION FOR INCORPORATION OF COMPANY',
    generateContent: (data: FormData) => `APPLICATION FOR INCORPORATION OF COMPANY
FORM INC-7

1. PROPOSED NAME OF THE COMPANY:
   ${data.proposedName1 || data.companyName || '_____________'}

2. CATEGORY OF COMPANY:
   ${data.companyCategory || 'Company limited by shares'}

3. SUB-CATEGORY OF COMPANY:
   ${data.companySubCategory || 'Non-govt company'}

4. CLASS OF COMPANY:
   ${data.companyClass || 'Private'}

5. REGISTERED OFFICE:
   Address: ${data.registeredOffice || data.address || '_____________'}
   State: ${data.state || '_______'}
   Pin Code: ${data.pinCode || '_______'}

6. AUTHORIZED SHARE CAPITAL:
   Rs. ${data.authorizedCapital || '_______'} divided into ${data.numberOfShares || '_______'} equity shares of Rs. ${data.faceValue || '10'} each.

7. SUBSCRIBERS TO MEMORANDUM:
   
   Subscriber 1:
   Name: ${data.subscriber1 || data.partyName || '_______'}
   Father's Name: ${data.subscriber1Father || '_______'}
   Address: ${data.subscriber1Address || data.address || '_______'}
   Nationality: ${data.subscriber1Nationality || 'Indian'}
   Occupation: ${data.subscriber1Occupation || 'Business'}
   Shares: ${data.subscriber1Shares || '_______'}
   
   Subscriber 2:
   Name: ${data.subscriber2 || '_______'}
   Father's Name: ${data.subscriber2Father || '_______'}
   Address: ${data.subscriber2Address || '_______'}
   Nationality: ${data.subscriber2Nationality || 'Indian'}
   Occupation: ${data.subscriber2Occupation || 'Business'}
   Shares: ${data.subscriber2Shares || '_______'}

8. FIRST DIRECTORS:
   
   Director 1:
   Name: ${data.director1 || data.partyName || '_______'}
   DIN: ${data.director1DIN || '_______'}
   Nationality: Indian
   
   Director 2:
   Name: ${data.director2 || '_______'}
   DIN: ${data.director2DIN || '_______'}
   Nationality: Indian

9. OBJECTS:
   Main Object: ${data.mainObject || 'To carry on the business of trading in all types of goods'}

DECLARATION:
We, the subscribers to the Memorandum of Association, declare that all the requirements of the Companies Act, 2013 and rules made thereunder in respect of registration have been complied with.

${data.subscriber1 || data.partyName || '_____________'}
Subscriber
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  // ============= GST CATEGORY TEMPLATES =============
  
  'New GST Registration': {
    title: 'APPLICATION FOR GST REGISTRATION',
    generateContent: (data: FormData) => `GOODS AND SERVICES TAX
APPLICATION FOR REGISTRATION
FORM GST REG-01

PART A - BUSINESS DETAILS

1. LEGAL NAME OF BUSINESS:
   ${data.legalName || data.partyName || '_____________'}

2. TRADE NAME (if different):
   ${data.tradeName || data.firmName || '_____________'}

3. PERMANENT ACCOUNT NUMBER (PAN):
   ${data.panNumber || '__________'}

4. CONSTITUTION OF BUSINESS:
   ${data.constitution || 'Proprietorship'}

5. DATE OF COMMENCEMENT OF BUSINESS:
   ${data.commencementDate || '_______'}

6. REASON FOR OBTAINING REGISTRATION:
   ${data.registrationReason || 'Aggregate turnover in a financial year exceeded Rs. 20 Lakh'}

PART B - PRINCIPAL PLACE OF BUSINESS

Address: ${data.principalAddress || data.address || '_____________'}
State: ${data.state || '_______'}
District: ${data.district || '_______'}
Pin Code: ${data.pinCode || '_______'}
Email: ${data.businessEmail || data.email || '_______'}
Mobile: ${data.businessMobile || '_______'}
Landline: ${data.businessPhone || '_______'}

PART C - ADDITIONAL PLACE OF BUSINESS
${data.additionalPlaces || 'Not Applicable'}

PART D - PARTICULARS OF PARTNERS/DIRECTORS/MEMBERS/KARTA

Name: ${data.partnerName || data.partyName || '_____________'}
Designation: ${data.designation || 'Proprietor'}
PAN: ${data.partnerPAN || data.panNumber || '__________'}
Mobile: ${data.partnerMobile || '_______'}
Email: ${data.partnerEmail || data.email || '_______'}

PART E - PARTICULARS OF BANK ACCOUNT

Bank Name: ${data.bankName || '_____________'}
Branch: ${data.bankBranch || '_______'}
Account Number: ${data.accountNumber || '_____________'}
IFSC Code: ${data.ifscCode || '_____________'}
Account Type: ${data.accountType || 'Current'}

PART F - DETAILS OF BUSINESS ACTIVITIES

Nature of Business Activity: ${data.businessNature || 'Wholesale/Retail Trading'}
Description of Goods/Services: ${data.goodsDescription || 'Trading of various goods'}

HSN/SAC Codes:
1. ${data.hsnCode1 || '_______'} - ${data.hsnDesc1 || '_______'}
2. ${data.hsnCode2 || '_______'} - ${data.hsnDesc2 || '_______'}

DECLARATION:
I hereby solemnly affirm and declare that the information given hereinabove is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.

${data.authorizedSignatory || data.partyName || '_____________'}
Authorized Signatory
Designation: ${data.designation || 'Proprietor'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'GSTR-1 Filing': {
    title: 'FORM GSTR-1 - DETAILS OF OUTWARD SUPPLIES',
    generateContent: (data: FormData) => `FORM GSTR-1
DETAILS OF OUTWARD SUPPLIES OF GOODS OR SERVICES OR BOTH

GSTIN: ${data.gstin || data.gstNumber || '_____________'}
Legal Name: ${data.legalName || data.partyName || '_____________'}
Trade Name: ${data.tradeName || data.firmName || '_____________'}
Return Period: ${data.returnPeriod || 'March 2025'}

3. B2B SUPPLIES:
3.1 Invoice-wise Details:
GSTIN of Recipient | Invoice No | Invoice Date | Invoice Value | Place of Supply | Reverse Charge | Invoice Type | Rate | Taxable Value | Integrated Tax | Central Tax | State/UT Tax | Cess
${data.b2bDetails || '[To be filled as per actual invoices]'}

4. B2C SUPPLIES:
4A. B2C (Large) - where invoice value is more than Rs. 2.5 Lakh:
Place of Supply | Rate | Taxable Value | Integrated Tax | Central Tax | State/UT Tax | Cess
${data.b2clDetails || data.state || '_______'} | ${data.gstRate || '18'}% | ${data.b2clTaxableValue || '_______'} | ${data.b2clIGST || '_______'} | ${data.b2clCGST || '_______'} | ${data.b2clSGST || '_______'} | ${data.b2clCess || '0'}

4B. B2C (Small) - where invoice value is upto Rs. 2.5 Lakh:
Type | Place of Supply | Rate | Taxable Value | Integrated Tax | Central Tax | State/UT Tax | Cess
OE | ${data.state || '_______'} | ${data.gstRate || '18'}% | ${data.b2csTaxableValue || '_______'} | ${data.b2csIGST || '0'} | ${data.b2csCGST || '_______'} | ${data.b2csSGST || '_______'} | ${data.b2csCess || '0'}

5. EXPORTS:
5A. Exports (with payment of tax):
Export Type | Invoice No | Invoice Date | Invoice Value | Port Code | Shipping Bill No | Shipping Bill Date | Rate | Taxable Value
WPAY | ${data.exportInvoiceNo || '_______'} | ${data.exportInvoiceDate || '_______'} | ${data.exportInvoiceValue || '_______'} | ${data.portCode || '_______'} | ${data.shippingBillNo || '_______'} | ${data.shippingBillDate || '_______'} | ${data.exportRate || '0'}% | ${data.exportTaxableValue || '_______'}

6. NIL RATED, EXEMPTED AND NON-GST OUTWARD SUPPLIES:
Type of Supply | Nil Rated | Exempted | Non-GST
Intra-State | ${data.intraNilRated || '0'} | ${data.intraExempted || '0'} | ${data.intraNonGST || '0'}
Inter-State | ${data.interNilRated || '0'} | ${data.interExempted || '0'} | ${data.interNonGST || '0'}

HSN-WISE SUMMARY OF OUTWARD SUPPLIES:
HSN Code | Description | UQC | Total Quantity | Value | Taxable Value | Integrated Tax | Central Tax | State/UT Tax | Cess
${data.hsnSummary || '[HSN-wise summary to be provided]'}

VERIFICATION:
I hereby solemnly affirm and declare that the information given above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.

${data.authorizedSignatory || data.partyName || '_____________'}
Authorized Signatory
Name: ${data.signatoryName || data.partyName || '_____________'}
Designation: ${data.designation || 'Proprietor'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'GSTR-3B Filing': {
    title: 'FORM GSTR-3B - MONTHLY RETURN',
    generateContent: (data: FormData) => `FORM GSTR-3B
MONTHLY RETURN

GSTIN: ${data.gstin || data.gstNumber || '_____________'}
Legal Name: ${data.legalName || data.partyName || '_____________'}
Trade Name: ${data.tradeName || data.firmName || '_____________'}
Return Period: ${data.returnPeriod || 'March 2025'}
Filing Date: ${data.filingDate || data.currentDate}

3.1 OUTWARD TAXABLE SUPPLIES (OTHER THAN ZERO RATED, NIL RATED AND EXEMPTED):
(a) Total Taxable Value: Rs. ${data.totalTaxableValue || '_______'}
(b) Integrated Tax: Rs. ${data.totalIGST || '_______'}
(c) Central Tax: Rs. ${data.totalCGST || '_______'}
(d) State/UT Tax: Rs. ${data.totalSGST || '_______'}
(e) Cess: Rs. ${data.totalCess || '_______'}

3.2 OUTWARD TAXABLE SUPPLIES (ZERO RATED):
(a) Total Taxable Value: Rs. ${data.zeroRatedValue || '0'}
(b) Integrated Tax: Rs. ${data.zeroRatedIGST || '0'}

4. ELIGIBLE ITC:
4A. ITC Available:
(1) From GSTR-2A:
    (a) Integrated Tax: Rs. ${data.itcIGST || '_______'}
    (b) Central Tax: Rs. ${data.itcCGST || '_______'}
    (c) State/UT Tax: Rs. ${data.itcSGST || '_______'}
    (d) Cess: Rs. ${data.itcCess || '_______'}

4B. ITC Reversed:
(1) As per Rules: Rs. ${data.itcReversed || '0'}

4C. Net ITC Available:
(a) Integrated Tax: Rs. ${data.netITCIGST || '_______'}
(b) Central Tax: Rs. ${data.netITCCGST || '_______'}
(c) State/UT Tax: Rs. ${data.netITCSGST || '_______'}
(d) Cess: Rs. ${data.netITCCess || '_______'}

5. TAX PAYABLE:
5.1 From Output Tax:
(a) Integrated Tax: Rs. ${data.payableIGST || '_______'}
(b) Central Tax: Rs. ${data.payableCGST || '_______'}
(c) State/UT Tax: Rs. ${data.payableSGST || '_______'}
(d) Cess: Rs. ${data.payableCess || '_______'}

6. PAYMENT OF TAX:
6.1 Tax Paid through ITC:
(a) Integrated Tax: Rs. ${data.paidThroughITCIGST || '_______'}
(b) Central Tax: Rs. ${data.paidThroughITCCGST || '_______'}
(c) State/UT Tax: Rs. ${data.paidThroughITCSGST || '_______'}
(d) Cess: Rs. ${data.paidThroughITCCess || '_______'}

6.2 Tax/Cess Paid in Cash:
(a) Integrated Tax: Rs. ${data.paidInCashIGST || '_______'}
(b) Central Tax: Rs. ${data.paidInCashCGST || '_______'}
(c) State/UT Tax: Rs. ${data.paidInCashSGST || '_______'}
(d) Cess: Rs. ${data.paidInCashCess || '_______'}

VERIFICATION:
I hereby solemnly affirm and declare that the information given above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.

${data.authorizedSignatory || data.partyName || '_____________'}
Authorized Signatory
Designation: ${data.designation || 'Proprietor'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'GST Refund Application': {
    title: 'APPLICATION FOR REFUND OF GST',
    generateContent: (data: FormData) => `APPLICATION FOR REFUND OF TAX/INPUT TAX CREDIT
FORM GST RFD-01

GSTIN: ${data.gstin || data.gstNumber || '_____________'}
Legal Name: ${data.legalName || data.partyName || '_____________'}
Trade Name: ${data.tradeName || data.firmName || '_____________'}

REFUND DETAILS:
1. Type of Refund: ${data.refundType || 'Export without payment of tax'}
2. Tax Period: ${data.taxPeriod || 'March 2025'}
3. Reason for Refund: ${data.refundReason || 'ITC accumulated due to inverted duty structure'}

AMOUNT CLAIMED FOR REFUND:
(a) Integrated Tax: Rs. ${data.refundIGST || '_______'}
(b) Central Tax: Rs. ${data.refundCGST || '_______'}
(c) State/UT Tax: Rs. ${data.refundSGST || '_______'}
(d) Cess: Rs. ${data.refundCess || '_______'}
Total Refund Claimed: Rs. ${data.totalRefundClaimed || data.refundAmount || '_______'}

BANK ACCOUNT DETAILS:
Bank Name: ${data.bankName || '_____________'}
Branch Name: ${data.branchName || '_______'}
Account Number: ${data.accountNumber || '_____________'}
IFSC Code: ${data.ifscCode || '_____________'}
Account Holder Name: ${data.accountHolderName || data.partyName || '_____________'}

EXPORT DETAILS (if applicable):
Shipping Bill No: ${data.shippingBillNo || '_______'}
Shipping Bill Date: ${data.shippingBillDate || '_______'}
Port of Export: ${data.portOfExport || '_______'}
Export Value: Rs. ${data.exportValue || '_______'}

DOCUMENTS ATTACHED:
1. Export Documents (if applicable)
2. Invoices and Shipping Bills
3. Bank Realization Certificate
4. Chartered Accountant Certificate (if required)
5. Relevant Correspondence

DECLARATION:
I hereby declare that:
1. I have not received any refund of the amount claimed.
2. The refund claimed is in accordance with the provisions of law.
3. All statements made are true and correct.

${data.authorizedSignatory || data.partyName || '_____________'}
Authorized Signatory
Name: ${data.signatoryName || data.partyName || '_____________'}
Designation: ${data.designation || 'Proprietor'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}

FOR OFFICE USE ONLY:
Application Received on: _______
ARN: _______
Acknowledgment No: _______`
  }
};

// Helper function to check if a template exists
export const hasTemplate = (formName: string): boolean => {
  return formName in formTemplates;
};

// Helper function to generate form content
export const generateFormContent = (formName: string, data: FormData): GeneratedForm | null => {
  if (!hasTemplate(formName)) {
    return null;
  }
  
  const formData = {
    ...data,
    currentDate: data.currentDate || new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    })
  };
  
  return {
    title: formTemplates[formName].title,
    content: formTemplates[formName].generateContent(formData)
  };
};

// Helper function to get all available template names
export const getAvailableTemplates = (): string[] => {
  return Object.keys(formTemplates);
};
