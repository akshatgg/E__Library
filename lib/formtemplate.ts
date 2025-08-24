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

  // ============= VAL CATEGORY TEMPLATES =============
  
  'Property Valuation Report': {
    title: 'PROPERTY VALUATION REPORT',
    generateContent: (data: FormData) => `PROPERTY VALUATION REPORT

CLIENT DETAILS:
Name: ${data.clientName || data.partyName || '_____________'}
Address: ${data.clientAddress || data.address || '_____________'}
PAN: ${data.panNumber || '__________'}

PROPERTY DETAILS:
Property Type: ${data.propertyType || 'Residential'}
Property Address: ${data.propertyAddress || data.address || '_____________'}
Area: ${data.area || '_______'} sq.ft.
Built-up Area: ${data.builtupArea || '_______'} sq.ft.

VALUATION DETAILS:
Date of Valuation: ${data.valuationDate || data.currentDate || new Date().toLocaleDateString()}
Purpose: ${data.valuationPurpose || 'Tax Assessment'}
Method: ${data.valuationMethod || 'Comparable Sales Method'}

VALUATION:
Land Value: Rs. ${data.landValue || '_______'}
Building Value: Rs. ${data.buildingValue || '_______'}
Total Market Value: Rs. ${data.totalValue || '_______'}

CERTIFICATE:
I certify that the above valuation represents the fair market value of the property.

${data.valuatorName || '_____________'}
Registered Valuer
Registration No: ${data.valuatorRegNo || '_______'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Company Valuation': {
    title: 'COMPANY VALUATION REPORT',
    generateContent: (data: FormData) => `COMPANY VALUATION REPORT

COMPANY DETAILS:
Name: ${data.companyName || data.firmName || '_____________'}
CIN: ${data.cin || '_______'}
PAN: ${data.panNumber || '__________'}
Address: ${data.address || '_____________'}

VALUATION DETAILS:
Valuation Date: ${data.valuationDate || data.currentDate}
Purpose: ${data.purpose || 'Income Tax Assessment'}
Method: ${data.method || 'DCF Method'}

FINANCIAL HIGHLIGHTS:
Revenue: Rs. ${data.revenue || '_______'} Lakhs
Net Profit: Rs. ${data.netProfit || '_______'} Lakhs
Total Assets: Rs. ${data.totalAssets || '_______'} Lakhs
Net Worth: Rs. ${data.netWorth || '_______'} Lakhs

VALUATION SUMMARY:
Fair Value per Share: Rs. ${data.valuePerShare || '_______'}
Total Company Value: Rs. ${data.totalCompanyValue || '_______'} Lakhs

${data.valuatorName || 'Certified Valuer'}
Registration No: ${data.valuatorRegNo || '_______'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  // ============= ROC CATEGORY TEMPLATES =============
  
  'Annual Return Filing': {
    title: 'FORM MGT-7 - ANNUAL RETURN',
    generateContent: (data: FormData) => `FORM MGT-7
ANNUAL RETURN

COMPANY DETAILS:
1. CIN: ${data.cin || '_______'}
2. Company Name: ${data.companyName || data.firmName || '_____________'}
3. Address: ${data.registeredOffice || data.address || '_____________'}
4. Email: ${data.companyEmail || data.email || '_______'}

FINANCIAL YEAR: From ${data.fyFrom || '01/04/2024'} To ${data.fyTo || '31/03/2025'}

PRINCIPAL BUSINESS ACTIVITIES:
1. ${data.businessActivity1 || 'Trading and Commerce'}

SHARE CAPITAL:
Authorized Capital: Rs. ${data.authorizedCapital || '_______'}
Paid-up Capital: Rs. ${data.paidupCapital || '_______'}

DIRECTORS:
1. Name: ${data.director1 || '_______'} DIN: ${data.din1 || '_______'}

MEETINGS:
Board Meetings Held: ${data.boardMeetings || '_______'}
AGM Date: ${data.agmDate || '_______'}

For ${data.companyName || data.firmName || '_____________'}

${data.directorName || data.partyName || '_____________'}
Director
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  'Company Registration': {
    title: 'APPLICATION FOR COMPANY REGISTRATION',
    generateContent: (data: FormData) => `APPLICATION FOR INCORPORATION OF COMPANY

COMPANY DETAILS:
Proposed Name: ${data.companyName || data.firmName || '_____________'}
Class of Company: ${data.companyClass || 'Private Limited'}
Category: ${data.companyCategory || 'Company Limited by Shares'}

REGISTERED OFFICE:
Address: ${data.registeredOffice || data.address || '_____________'}
State: ${data.state || '_______'}
Pin Code: ${data.pincode || '_______'}

AUTHORIZED CAPITAL: Rs. ${data.authorizedCapital || '_______'}

DIRECTORS:
1. Name: ${data.director1 || data.partyName || '_______'}
   DIN: ${data.din1 || '_______'}
   PAN: ${data.directorPAN1 || data.panNumber || '_______'}

SUBSCRIBERS:
1. ${data.subscriber1 || data.partyName || '_______'} - Shares: ${data.shares1 || '_______'}

OBJECTS:
Main Object: ${data.mainObject || 'To carry on business of trading'}

DECLARATION:
We declare that all requirements of Companies Act, 2013 have been complied with.

${data.director1 || data.partyName || '_____________'}
First Director
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  // ============= GST CATEGORY TEMPLATES =============
  
  'New GST Registration': {
    title: 'APPLICATION FOR GST REGISTRATION',
    generateContent: (data: FormData) => `APPLICATION FOR REGISTRATION UNDER GST
FORM GST REG-01

APPLICANT DETAILS:
1. Legal Name: ${data.legalName || data.partyName || '_____________'}
2. Trade Name: ${data.tradeName || data.firmName || '_____________'}
3. PAN: ${data.panNumber || '__________'}
4. Constitution: ${data.constitution || 'Proprietorship'}

BUSINESS DETAILS:
Principal Place of Business:
${data.principalAddress || data.address || '_____________'}
Pin Code: ${data.pincode || '_______'}
State: ${data.state || '_______'}

Nature of Business: ${data.businessNature || 'Trading'}
Commencement Date: ${data.commencementDate || '_______'}
Reason for Registration: ${data.registrationReason || 'Aggregate turnover exceeded threshold'}

BANK DETAILS:
Bank Name: ${data.bankName || '_____________'}
Account Number: ${data.accountNumber || '_____________'}
IFSC: ${data.ifscCode || '_____________'}

PROMOTER DETAILS:
Name: ${data.partnerName || data.partyName || '_____________'}
PAN: ${data.partnerPAN || data.panNumber || '__________'}
Mobile: ${data.mobile || '_______'}
Email: ${data.email || '_______'}

DECLARATION:
I declare that the information given above is true and correct.

${data.authorizedSignatory || data.partyName || '_____________'}
Designation: ${data.designation || 'Proprietor'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  'GSTR-1 Filing': {
    title: 'FORM GSTR-1 - OUTWARD SUPPLIES',
    generateContent: (data: FormData) => `FORM GSTR-1
DETAILS OF OUTWARD SUPPLIES

GSTIN: ${data.gstin || data.gstNumber || '_____________'}
Legal Name: ${data.legalName || data.partyName || '_____________'}
Trade Name: ${data.tradeName || data.firmName || '_____________'}
Period: ${data.period || 'March 2025'}

B2B SUPPLIES:
Total Value: Rs. ${data.b2bValue || '_______'}
Taxable Value: Rs. ${data.b2bTaxable || '_______'}
IGST: Rs. ${data.igst || '_______'}
CGST: Rs. ${data.cgst || '_______'}
SGST: Rs. ${data.sgst || '_______'}

B2C SUPPLIES:
Total Value: Rs. ${data.b2cValue || '_______'}
Taxable Value: Rs. ${data.b2cTaxable || '_______'}

EXPORTS:
Export Value: Rs. ${data.exportValue || '_______'}

NIL RATED SUPPLIES:
Value: Rs. ${data.nilRated || '_______'}

TOTAL OUTWARD SUPPLIES: Rs. ${data.totalOutward || '_______'}

VERIFICATION:
I declare that the information given above is true and correct.

${data.authorizedSignatory || data.partyName || '_____________'}
Designation: ${data.designation || 'Authorized Signatory'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  'GST Refund Application': {
    title: 'APPLICATION FOR GST REFUND',
    generateContent: (data: FormData) => `To,
The Assistant Commissioner
GST Department
${data.place || 'New Delhi'}

Subject: Application for GST Refund for ${data.period || 'March 2025'}

Sir/Madam,

I, ${data.partyName || '_____________'}, having GSTIN ${data.gstin || data.gstNumber || '_____________'}, request refund of GST as per details below:

REFUND DETAILS:
Period: ${data.period || 'March 2025'}
Refund Amount: Rs. ${data.refundAmount || '_______'}
Reason: ${data.refundReason || 'Export without payment of tax'}

BANK DETAILS:
Bank: ${data.bankName || '_____________'}
Account: ${data.accountNumber || '_____________'}
IFSC: ${data.ifscCode || '_____________'}

I declare that the claim is correct and I have not received refund for this period from any other authority.

For ${data.firmName || '_____________'}

${data.partnerName || data.partyName || '_____________'}
Partner/Proprietor
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
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
  
  // Financial Information
  refundAmount?: string;
  excessAmount?: string;
  actualTax?: string;
  tdsAmount?: string;
  taxLiability?: string;
  financialYear?: string;
  
  // Bank Details
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  
  // Office/Department Details
  wardNumber?: string;
  itOfficeAddress?: string;
  authorityName?: string;
  authorityAddress?: string;
  
  // Dates
  orderDate?: string;
  paymentDate?: string;
  challanNumber?: string;
  hearingDate?: string;
  requestedDate?: string;
  
  // Gift Deed Specific
  gifteeName?: string;
  gifteefather?: string;
  gifteeAddress?: string;
  gifteePan?: string;
  giftAmount?: string;
  giftAmountWords?: string;
  giftGiverName?: string;
  giftGiverAddress?: string;
  giftGiverPan?: string;
  relationship?: string;
  propertyDescription?: string;
  
  // Share Transfer Specific
  transfereeName?: string;
  transfereeAddress?: string;
  transfereePan?: string;
  numberOfShares?: string;
  faceValue?: string;
  companyName?: string;
  
  // Appeal/Stay Specific
  applicantType?: string;
  demandAmount?: string;
  appealOrderDate?: string;
  appealNumber?: string;
  deletedAmount?: string;
  excessPayment?: string;
  additionAmount?: string;
  errorDescription?: string;
  additionalGrounds?: string;
  appealFee?: string;
  stayOrderDate?: string;
  stayExpiryDate?: string;
  extensionPeriod?: string;
  depositPercentage?: string;
  modificationRequest?: string;
  
  // Will Specific
  age?: string;
  executorName?: string;
  residentialProperty?: string;
  residentialBeneficiary?: string;
  bankAccountBeneficiary?: string;
  otherAssets?: string;
  otherBeneficiary?: string;
  residueBeneficiaries?: string;
  originalWillDate?: string;
  clauseNumber?: string;
  newClause?: string;
  deceasedName?: string;
  deathDate?: string;
  willDate?: string;
  executorContact?: string;
  
  // Error/Rectification Specific
  mistakeDescription?: string;
  correctPosition?: string;
  errorDetails?: string;
  supportingDocs?: string;
  computationError?: string;
  correctComputation?: string;
  
  // Partnership/Trust Specific
  partner1Name?: string;
  partner1Address?: string;
  partner1Pan?: string;
  partner1Capital?: string;
  partner2Name?: string;
  partner2Address?: string;
  partner2Pan?: string;
  partner2Capital?: string;
  businessNature?: string;
  businessAddress?: string;
  profitRatio?: string;
  partnershipDuration?: string;
  
  // Authority Specific
  authorizeeName?: string;
  authorityPurpose?: string;
  validTill?: string;
  validFrom?: string;
  powers?: string;
  authorizationPurpose?: string;
  authorizationScope?: string;
  
  // Calculation Specific
  salaryIncome?: string;
  housePropertyIncome?: string;
  businessIncome?: string;
  capitalGains?: string;
  otherIncome?: string;
  totalIncome?: string;
  deduction80C?: string;
  deduction80D?: string;
  otherDeductions?: string;
  taxableIncome?: string;
  taxCalculation?: string;
  principalAmount?: string;
  interestRate?: string;
  fromDate?: string;
  toDate?: string;
  interestCalculation?: string;
  totalInterest?: string;
  baseAmount?: string;
  penaltyRate?: string;
  penaltyCalculation?: string;
  totalPenalty?: string;
  
  // Affidavit Specific
  statement1?: string;
  statement2?: string;
  statement3?: string;
  annualIncome?: string;
  declarationDate?: string;
  immovableProperty?: string;
  movableProperty?: string;
  bankAccounts?: string;
  investments?: string;
  
  // Trust Specific
  settlorName?: string;
  settlorAddress?: string;
  trustee1Name?: string;
  trustee2Name?: string;
  trustName?: string;
  trustObjects?: string;
  trustProperty?: string;
  trusteePowers?: string;
  
  // General Purpose
  reason?: string;
  purpose?: string;
  recipientName?: string;
  recipientAddress?: string;
  applicationSubject?: string;
  applicationContent?: string;
  requestSubject?: string;
  requestContent?: string;
  informationRequested?: string;
  informationPurpose?: string;
  adjournmentReason?: string;
  extensionReason?: string;
  postponementReason?: string;
  eventName?: string;
  scheduledDate?: string;
  returnFilingDate?: string;
  processingDate?: string;
  returnIncome?: string;
  returnTax?: string;
  taxPaid?: string;
  refundDemand?: string;
  reassessmentReason?: string;
  additionalInfo?: string;
  
  // Amendment Specific
  originalDeedType?: string;
  originalDeedDate?: string;
  parties?: string;
  amendments?: string;
  partySignatures?: string;
  
  // Other fields as needed
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
  
  // REFUND SUBCATEGORY
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
As per my computation and the provisions of Income Tax Act, 1961, I have paid excess tax of Rs. ${data.refundAmount || '_______'} during the financial year. The excess payment was made through:
- Advance Tax: Rs. ${data.advanceTax || '_______'}
- TDS: Rs. ${data.tdsAmount || '_______'}
- Self Assessment Tax: Rs. ${data.selfAssessmentTax || '_______'}

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
- Total Tax Paid: Rs. ${data.totalTaxPaid || '_______'}
- Actual Tax Liability: Rs. ${data.actualTaxLiability || '_______'}
- Excess Payment: Rs. ${data.excessAmount || '_______'}
- Assessment Year: ${data.assYear || '2024-25'}

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
3. Tax Credit u/s 115JAA: Rs. ${data.taxCredit115JAA || '_______'}
4. Other Credits: Rs. ${data.otherCredits || '_______'}

Total Credit Eligible for Refund: Rs. ${data.totalCredit || '_______'}

I have filed my return for A.Y. ${data.assYear || '2024-25'} and the above credits are available for refund as per the provisions of Income Tax Act.

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

I, ${data.partyName || '_____________'}, PAN: ${data.panNumber || '__________'}, have paid excess advance tax for the Assessment Year ${data.assYear || '2024-25'}.

ADVANCE TAX PAYMENT DETAILS:
- 1st Installment (15th June): Rs. ${data.installment1 || '_______'}
- 2nd Installment (15th Sep): Rs. ${data.installment2 || '_______'}
- 3rd Installment (15th Dec): Rs. ${data.installment3 || '_______'}
- 4th Installment (15th Mar): Rs. ${data.installment4 || '_______'}

Total Advance Tax Paid: Rs. ${data.totalAdvanceTax || '_______'}
Actual Tax Liability: Rs. ${data.actualTaxLiability || '_______'}
Excess Payment: Rs. ${data.excessAdvanceTax || '_______'}

The excess payment occurred due to changes in income/circumstances during the year. I request refund of the excess amount.

Bank Details for Refund:
Bank: ${data.bankName || '_____________'}
Account: ${data.accountNumber || '_____________'}
IFSC: ${data.ifscCode || '_____________'}

Thanking you,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  // ASSESSMENT SUBCATEGORY
  'Self Assessment Tax': {
    title: 'SELF ASSESSMENT TAX PAYMENT CHALLAN',
    generateContent: (data: FormData) => `CHALLAN NO. ${data.challanNumber || '_____________'}
INCOME TAX DEPARTMENT
SELF ASSESSMENT TAX PAYMENT

Assessee Details:
Name: ${data.partyName || '_____________'}
PAN: ${data.panNumber || '__________'}
Assessment Year: ${data.assYear || '2024-25'}
Address: ${data.address || '_____________'}

Tax Computation:
Total Income: Rs. ${data.totalIncome || '_______'}
Tax on Total Income: Rs. ${data.taxOnIncome || '_______'}
Add: Surcharge: Rs. ${data.surcharge || '_______'}
Add: Education Cess: Rs. ${data.educationCess || '_______'}
Total Tax Liability: Rs. ${data.totalTaxLiability || '_______'}

Less: Advance Tax Paid: Rs. ${data.advanceTaxPaid || '_______'}
Less: TDS: Rs. ${data.tdsDeducted || '_______'}
Less: TCS: Rs. ${data.tcsCollected || '_______'}

Self Assessment Tax Payable: Rs. ${data.selfAssessmentTax || '_______'}

Payment Details:
Challan No: ${data.challanNumber || '_______'}
Date of Payment: ${data.paymentDate || '_______'}
Bank: ${data.bankName || '_______'}

I declare that the above information is true and correct.

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Regular Assessment': {
    title: 'NOTICE FOR REGULAR ASSESSMENT',
    generateContent: (data: FormData) => `INCOME TAX DEPARTMENT
NOTICE UNDER SECTION 143(2)

To,
${data.partyName || '_____________'}
PAN: ${data.panNumber || '__________'}
${data.address || '_____________'}

Assessment Year: ${data.assYear || '2024-25'}
Case ID: ${data.caseId || '_______'}

You are required to appear before the undersigned on ${data.hearingDate || '_______'} at ${data.hearingTime || '11:00 AM'} for assessment proceedings under Section 143(3) of the Income Tax Act, 1961.

DISCREPANCIES NOTED:
1. ${data.discrepancy1 || 'Income not offered to tax'}
2. ${data.discrepancy2 || 'Excessive claims'}
3. ${data.discrepancy3 || 'Other matters'}

DOCUMENTS REQUIRED:
- Books of Accounts
- Vouchers and Bills
- Bank Statements
- Investment Proofs
- Any other relevant documents

Failure to appear may result in ex-parte assessment.

${data.assessingOfficer || 'Income Tax Officer'}
Ward No: ${data.wardNumber || '_____'}
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
Original/Revised: ${data.returnType || 'Original'}

Summary of TDS:
Total No. of Employees: ${data.totalEmployees || '_______'}
Total Salary Paid: Rs. ${data.totalSalary || '_______'}
Total TDS Deducted: Rs. ${data.totalTDS || '_______'}
Total TDS Deposited: Rs. ${data.totalTDSDeposited || '_______'}

Challan Details:
Challan 1: ${data.challan1 || '_______'} - Rs. ${data.amount1 || '_______'}
Challan 2: ${data.challan2 || '_______'} - Rs. ${data.amount2 || '_______'}
Challan 3: ${data.challan3 || '_______'} - Rs. ${data.amount3 || '_______'}

DECLARATION:
I, ${data.authorizedPerson || data.partyName || '_____________'}, declare that the information given above is true and correct.

Signature: _______________
Name: ${data.authorizedPerson || data.partyName || '_____________'}
Designation: ${data.designation || 'Authorized Signatory'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Form 16 Generation': {
    title: 'FORM 16 - CERTIFICATE OF DEDUCTION OF TAX FROM SALARY',
    generateContent: (data: FormData) => `FORM 16
[See rule 31(1)(a)]
Certificate of deduction of tax from salary

Part A
1. Name and address of the Employer: ${data.employerName || data.firmName || '_____________'}
   ${data.employerAddress || data.address || '_____________'}

2. TAN of the Deductor: ${data.tanNumber || '__________'}

3. PAN of the Deductor: ${data.employerPAN || '__________'}

4. CIT(TDS) where annual return/statement for the F.Y. is filed: ${data.citTDS || '_______'}

5. Employee Details:
   Name: ${data.employeeName || data.partyName || '_____________'}
   PAN: ${data.employeePAN || data.panNumber || '__________'}
   Employee Code: ${data.employeeCode || '_______'}
   Address: ${data.employeeAddress || data.address || '_____________'}

6. Period: From ${data.periodFrom || '01/04/2024'} To ${data.periodTo || '31/03/2025'}

7. Assessment Year: ${data.assYear || '2025-26'}

Part B
Details of Salary paid and any other income and tax deducted:

1. Gross Salary:
   (a) Salary as per provisions: Rs. ${data.basicSalary || '_______'}
   (b) Value of perquisites: Rs. ${data.perquisites || '_______'}
   (c) Profits in lieu of salary: Rs. ${data.profitsInLieu || '_______'}
   Total: Rs. ${data.grossSalary || '_______'}

2. Less: Allowances to the extent exempt: Rs. ${data.exemptAllowances || '_______'}

3. Balance (1-2): Rs. ${data.balanceIncome || '_______'}

4. Deductions under Chapter VI-A:
   Section 80C: Rs. ${data.sec80C || '_______'}
   Section 80D: Rs. ${data.sec80D || '_______'}
   Other Sections: Rs. ${data.otherDeductions || '_______'}
   Total: Rs. ${data.totalDeductions || '_______'}

5. Total Income (3-4): Rs. ${data.totalIncome || '_______'}

6. Tax on total income: Rs. ${data.taxOnIncome || '_______'}

7. Education Cess: Rs. ${data.educationCess || '_______'}

8. Total Tax Payable: Rs. ${data.totalTaxPayable || '_______'}

9. Relief under section 89: Rs. ${data.reliefSec89 || '_______'}

10. Net Tax Payable: Rs. ${data.netTaxPayable || '_______'}

11. Total TDS: Rs. ${data.totalTDS || '_______'}

This is to certify that the tax deducted as shown above has been paid to the credit of Central Government.

Signature: _______________
${data.authorizedSignatory || '_____________'}
Designation: ${data.designation || 'HR Manager'}
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
${data.itOfficeAddress || data.place || 'New Delhi'}

Subject: Reply to Notice under Section ${data.noticeSection || '143(2)'} dated ${data.noticeDate || '_______'}

Respected Sir/Madam,

With reference to your notice dated ${data.noticeDate || '_______'} under Section ${data.noticeSection || '143(2)'} of the Income Tax Act, 1961, I, ${data.partyName || '_____________'}, PAN: ${data.panNumber || '__________'}, submit my reply as follows:

ASSESSEE DETAILS:
Name: ${data.partyName || '_____________'}
PAN: ${data.panNumber || '__________'}
Assessment Year: ${data.assYear || '2024-25'}
Address: ${data.address || '_____________'}

REPLY TO QUERIES:

1. ${data.query1 || 'Regarding undisclosed income'}: 
   ${data.reply1 || 'The income has been properly disclosed in the return filed.'}

2. ${data.query2 || 'Regarding investments made'}:
   ${data.reply2 || 'All investments are made from disclosed sources of income.'}

3. ${data.query3 || 'Regarding expenses claimed'}:
   ${data.reply3 || 'All expenses are genuine and supported by proper vouchers.'}

DOCUMENTS ENCLOSED:
1. ${data.document1 || 'Copy of Books of Accounts'}
2. ${data.document2 || 'Bank Statements'}
3. ${data.document3 || 'Investment Proofs'}
4. ${data.document4 || 'Bills and Vouchers'}

I submit that the return filed is correct and complete. I request you to kindly consider the above submission and close the case.

I remain available for any clarification if required.

Thanking you,
Yours faithfully,

${data.partyName || '_____________'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}

Enclosures: As mentioned above`
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

I, ${data.partyName || '_____________'}, PAN: ${data.panNumber || '__________'}, request for a personal hearing in connection with the assessment proceedings for Assessment Year ${data.assYear || '2024-25'}.

CASE DETAILS:
Case ID: ${data.caseId || '_______'}
Notice Date: ${data.noticeDate || '_______'}
Last Date for Compliance: ${data.lastDate || '_______'}

GROUNDS FOR HEARING:

1. ${data.ground1 || 'To explain the facts and circumstances of the case'}
2. ${data.ground2 || 'To present additional evidence'}
3. ${data.ground3 || 'To clarify doubts regarding income computation'}
4. ${data.ground4 || 'To seek guidance on tax implications'}

I request you to kindly grant me a hearing on any date convenient to you after ${data.preferredDate || '_______'}.

My preferred timings are: ${data.preferredTime || '11:00 AM to 4:00 PM'}

I assure you of my cooperation and timely appearance.

Thanking you,
Yours faithfully,

${data.partyName || '_____________'}
Contact: ${data.phone || '_______'}
Email: ${data.email || '_______'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  // ============= VAL CATEGORY TEMPLATES =============
  
  'Property Valuation Report': {
    title: 'PROPERTY VALUATION REPORT',
    generateContent: (data: FormData) => `PROPERTY VALUATION REPORT

CLIENT DETAILS:
Name: ${data.clientName || data.partyName || '_____________'}
Address: ${data.clientAddress || data.address || '_____________'}
PAN: ${data.panNumber || '__________'}

PROPERTY DETAILS:
Property Type: ${data.propertyType || 'Residential/Commercial'}
Property Address: ${data.propertyAddress || '_____________'}
Survey No: ${data.surveyNumber || '_______'}
Area: ${data.area || '_______'} sq.ft.
Built-up Area: ${data.builtupArea || '_______'} sq.ft.

VALUATION DETAILS:
Date of Valuation: ${data.valuationDate || data.currentDate || new Date().toLocaleDateString()}
Purpose of Valuation: ${data.valuationPurpose || 'Tax Assessment'}
Method Used: ${data.valuationMethod || 'Comparable Sales Method'}

COMPARABLE SALES:
Sale 1: ${data.comparable1 || '_______'} - Rs. ${data.rate1 || '_______'} per sq.ft.
Sale 2: ${data.comparable2 || '_______'} - Rs. ${data.rate2 || '_______'} per sq.ft.
Sale 3: ${data.comparable3 || '_______'} - Rs. ${data.rate3 || '_______'} per sq.ft.

Average Rate: Rs. ${data.averageRate || '_______'} per sq.ft.

FACTORS CONSIDERED:
1. Location and Accessibility
2. Age and Condition of Property
3. Amenities Available
4. Market Trends
5. Legal Status

VALUATION:
Land Value: Rs. ${data.landValue || '_______'}
Building Value: Rs. ${data.buildingValue || '_______'}
Total Market Value: Rs. ${data.totalValue || '_______'}

CERTIFICATE:
I certify that the above valuation has been carried out as per standard valuation practices and represents the fair market value of the property as on ${data.valuationDate || data.currentDate}.

${data.valuatorName || '_____________'}
Registered Valuer
Registration No: ${data.valuatorRegNo || '_______'}
Date: ${data.currentDate || new Date().toLocaleDateString()}
Place: ${data.place || '_______'}`
  },

  'Company Valuation': {
    title: 'COMPANY VALUATION REPORT',
    generateContent: (data: FormData) => `COMPANY VALUATION REPORT

COMPANY DETAILS:
Name: ${data.companyName || '_____________'}
CIN: ${data.cin || '_______'}
PAN: ${data.panNumber || '__________'}
Address: ${data.address || '_____________'}

VALUATION DETAILS:
Valuation Date: ${data.valuationDate || data.currentDate}
Valuation Purpose: ${data.purpose || 'Income Tax Assessment'}
Valuation Method: ${data.method || 'DCF Method'}

FINANCIAL HIGHLIGHTS:
Revenue (Current Year): Rs. ${data.revenue || '_______'} Lakhs
EBITDA: Rs. ${data.ebitda || '_______'} Lakhs
Net Profit: Rs. ${data.netProfit || '_______'} Lakhs
Total Assets: Rs. ${data.totalAssets || '_______'} Lakhs
Net Worth: Rs. ${data.netWorth || '_______'} Lakhs

VALUATION SUMMARY:
Asset Value: Rs. ${data.assetValue || '_______'} Lakhs
Earnings Value: Rs. ${data.earningsValue || '_______'} Lakhs
Market Value: Rs. ${data.marketValue || '_______'} Lakhs

Fair Value per Share: Rs. ${data.valuePerShare || '_______'}
Total Company Value: Rs. ${data.totalCompanyValue || '_______'} Lakhs

${data.valuatorName || 'Certified Valuer'}
Registration No: ${data.valuatorRegNo || '_______'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  // ============= ROC CATEGORY TEMPLATES =============
  
  'Annual Return Filing': {
    title: 'FORM MGT-7 - ANNUAL RETURN',
    generateContent: (data: FormData) => `FORM MGT-7
ANNUAL RETURN
[Pursuant to section 92(3) of the Companies Act, 2013 and rule 12(1) of the Companies (Management and Administration) Rules, 2014]

COMPANY DETAILS:
1. CIN: ${data.cin || '_______'}
2. Company Name: ${data.companyName || '_____________'}
3. Address: ${data.registeredOffice || data.address || '_____________'}
4. Email: ${data.companyEmail || data.email || '_______'}
5. Telephone: ${data.companyPhone || '_______'}

FINANCIAL YEAR: From ${data.fyFrom || '01/04/2024'} To ${data.fyTo || '31/03/2025'}

PRINCIPAL BUSINESS ACTIVITIES:
1. ${data.businessActivity1 || 'Trading and Commerce'}
2. ${data.businessActivity2 || 'Manufacturing'}

PARTICULARS OF HOLDING AND SUBSIDIARY COMPANIES:
${data.subsidiaryDetails || 'Not Applicable'}

SHARE CAPITAL:
Authorized Capital: Rs. ${data.authorizedCapital || '_______'}
Issued Capital: Rs. ${data.issuedCapital || '_______'}
Subscribed Capital: Rs. ${data.subscribedCapital || '_______'}
Paid-up Capital: Rs. ${data.paidupCapital || '_______'}

DIRECTORS DETAILS:
1. Name: ${data.director1 || '_______'} DIN: ${data.din1 || '_______'}
2. Name: ${data.director2 || '_______'} DIN: ${data.din2 || '_______'}

MEETINGS:
Board Meetings Held: ${data.boardMeetings || '_______'}
AGM Date: ${data.agmDate || '_______'}

COMPLIANCE CERTIFICATES:
All applicable provisions of Companies Act, 2013 have been complied with.

For ${data.companyName || '_____________'}

${data.directorName || '_____________'}
Director
DIN: ${data.directorDIN || '_______'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  // ============= GST CATEGORY TEMPLATES =============
  
  'New GST Registration': {
    title: 'APPLICATION FOR GST REGISTRATION',
    generateContent: (data: FormData) => `APPLICATION FOR REGISTRATION UNDER GST
FORM GST REG-01

APPLICANT DETAILS:
1. Legal Name: ${data.legalName || data.partyName || '_____________'}
2. Trade Name: ${data.tradeName || '_____________'}
3. PAN: ${data.panNumber || '__________'}
4. Constitution of Business: ${data.constitution || 'Proprietorship'}

BUSINESS DETAILS:
Principal Place of Business:
${data.principalAddress || data.address || '_____________'}
Pin Code: ${data.pincode || '_______'}
State: ${data.state || '_______'}

Additional Places of Business:
${data.additionalPlaces || 'Not Applicable'}

BUSINESS ACTIVITIES:
Nature of Business: ${data.businessNature || 'Trading'}
Date of Commencement: ${data.commencementDate || '_______'}
Reason for Registration: ${data.registrationReason || 'Aggregate turnover exceeded threshold'}

PRODUCTS/SERVICES:
1. ${data.product1 || 'Trading of Goods'} - HSN: ${data.hsn1 || '_______'}
2. ${data.product2 || 'Services'} - HSN: ${data.hsn2 || '_______'}

BANK DETAILS:
Bank Name: ${data.bankName || '_____________'}
Branch: ${data.bankBranch || '_______'}
Account Number: ${data.accountNumber || '_____________'}
IFSC: ${data.ifscCode || '_____________'}

PROMOTER/PARTNER DETAILS:
Name: ${data.partnerName || data.partyName || '_____________'}
PAN: ${data.partnerPAN || data.panNumber || '__________'}
DIN/Membership No: ${data.din || '_______'}
Mobile: ${data.mobile || '_______'}
Email: ${data.email || '_______'}

DECLARATION:
I/We hereby declare that the information given above is true and correct to the best of my/our knowledge and belief.

${data.authorizedSignatory || data.partyName || '_____________'}
Designation: ${data.designation || 'Proprietor'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  },

  'GSTR-1 Filing': {
    title: 'FORM GSTR-1 - OUTWARD SUPPLIES',
    generateContent: (data: FormData) => `FORM GSTR-1
DETAILS OF OUTWARD SUPPLIES OF GOODS OR SERVICES OR BOTH

GSTIN: ${data.gstin || data.gstNumber || '_____________'}
Legal Name: ${data.legalName || data.partyName || '_____________'}
Trade Name: ${data.tradeName || '_____________'}
Period: ${data.period || 'March 2025'}

3.1 - BUSINESS TO BUSINESS SUPPLIES:
Place of Supply | Invoice Value | Taxable Value | Integrated Tax | Central Tax | State/UT Tax | Cess
${data.b2bDetails || 'State wise summary to be filled'}

4 - BUSINESS TO CONSUMER SUPPLIES:
4A - B2C (Large) [Invoice value > Rs. 2.5 Lakh]:
Place of Supply: ${data.b2clPlace || '_______'}
Invoice Value: Rs. ${data.b2clValue || '_______'}
Taxable Value: Rs. ${data.b2clTaxable || '_______'}

4B - B2C (Small) [Invoice value ≤ Rs. 2.5 Lakh]:
Place of Supply: ${data.b2csPlace || '_______'}
Total Value: Rs. ${data.b2csValue || '_______'}
Taxable Value: Rs. ${data.b2csTaxable || '_______'}

5 - EXPORTS:
Export without Payment: Rs. ${data.exportWoPayment || '_______'}
Export with Payment: Rs. ${data.exportWithPayment || '_______'}

6 - NIL RATED, EXEMPTED AND NON-GST OUTWARD SUPPLIES:
Nil Rated: Rs. ${data.nilRated || '_______'}
Exempted: Rs. ${data.exempted || '_______'}
Non-GST: Rs. ${data.nonGST || '_______'}

HSN-WISE SUMMARY:
HSN Code | Description | UQC | Total Qty | Value | Taxable Value | IGST | CGST | SGST/UTGST | Cess
${data.hsnSummary || 'HSN wise details to be filled'}

TOTAL OUTWARD SUPPLIES: Rs. ${data.totalOutward || '_______'}

VERIFICATION:
I hereby solemnly affirm and declare that the information given above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.

${data.authorizedSignatory || data.partyName || '_____________'}
Designation: ${data.designation || 'Authorized Signatory'}
Date: ${data.currentDate}
Place: ${data.place || '_______'}`
  }
};

// Helper function to get all available template names
export const getAvailableTemplates = (): string[] => {
  return Object.keys(formTemplates);
};

  'Excess Payment Refund': {
    title: 'EXCESS PAYMENT REFUND APPLICATION',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
WARD NO. ${data.wardNumber || '___'}
${data.itOfficeAddress || 'NEW DELHI'}

**SUBJECT: REFUND OF EXCESS PAYMENT FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

With reference to my PAN ${data.panNumber || '_______________'}, I would like to bring to your kind notice that:

1. I have made excess payment of Rs. ${data.excessAmount || '_______________'} towards Income Tax for A.Y. ${data.assYear}.

2. The excess payment was made vide Challan No. ${data.challanNumber || '_______________'} dated ${data.paymentDate || '_______________'}.

3. As per the assessment completed, my actual tax liability is Rs. ${data.actualTax || '_______________'}.

4. Therefore, I am entitled for refund of Rs. ${data.refundAmount || '_______________'}.

I request you to kindly process the refund and credit to my bank account.

Yours faithfully,

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'TDS Refund Application': {
    title: 'TDS REFUND APPLICATION',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
TDS CELL
${data.itOfficeAddress || 'NEW DELHI'}

**SUBJECT: REFUND OF EXCESS TDS DEDUCTED FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

I, ${data.partyName}, PAN: ${data.panNumber || '_______________'}, submit that:

1. TDS of Rs. ${data.tdsAmount || '_______________'} has been deducted from my income during F.Y. ${data.financialYear || '_______________'}.

2. As per my Income Tax Return filed for A.Y. ${data.assYear}, my total tax liability is Rs. ${data.taxLiability || '_______________'}.

3. After adjusting advance tax and self-assessment tax, I am entitled for TDS refund of Rs. ${data.refundAmount || '_______________'}.

4. Form 16/16A and other supporting documents are enclosed.

I request you to process my TDS refund claim at the earliest.

Yours faithfully,

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}

Enclosures:
1. Form 16/16A
2. Copy of ITR
3. Bank Account Details`
  },

  // GIFT DEED CATEGORY
  'Property Gift Deed': {
    title: 'PROPERTY GIFT DEED',
    generateContent: (data: FormData) => `GIFT DEED

THIS DEED OF GIFT is made on this ${data.currentDate} between:

DONOR: ${data.partyName}
S/o: ${data.fatherName || '_______________'}
Address: ${data.address}
PAN: ${data.panNumber || '_______________'}
                                        (Party of the First Part)
AND

DONEE: ${data.gifteeName || '_______________'}
S/o: ${data.gifteefather || '_______________'}
Address: ${data.gifteeAddress || '_______________'}
PAN: ${data.gifteePan || '_______________'}
                                        (Party of the Second Part)

WHEREAS the Donor is the absolute owner of the property described in Schedule hereunder and desires to make a gift of the same to the Donee out of love and affection.

NOW THIS DEED WITNESSETH AS FOLLOWS:

1. The Donor hereby transfers by way of gift the property described in the Schedule to the Donee.

2. The Donee hereby accepts the gift of the said property.

3. The property is transferred free from all encumbrances.

SCHEDULE OF PROPERTY:
${data.propertyDescription || 'Property details to be filled'}

IN WITNESS WHEREOF the parties have executed this deed on the date first written above.

DONOR:                           DONEE:
${data.partyName}               ${data.gifteeName || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}

Witnesses:
1. _________________          2. _________________`
  },

  'Cash Gift Declaration': {
    title: 'CASH GIFT DECLARATION',
    generateContent: (data: FormData) => `CASH GIFT DECLARATION

I, ${data.partyName}, S/o ${data.fatherName || '_______________'}, residing at ${data.address}, PAN: ${data.panNumber || '_______________'}, hereby declare that:

1. I have received a cash gift of Rs. ${data.giftAmount || '_______________'} (Rupees ${data.giftAmountWords || '_______________'} only) from ${data.giftGiverName || '_______________'}.

2. The relationship between me and the gift giver is ${data.relationship || '_______________'}.

3. This gift has been received out of love and affection without any consideration.

4. The gift giver's details are as follows:
   Name: ${data.giftGiverName || '_______________'}
   Address: ${data.giftGiverAddress || '_______________'}
   PAN: ${data.giftGiverPan || '_______________'}

5. This declaration is made for Income Tax purposes under Section 56(2)(x) of the Income Tax Act, 1961.

I declare that the above information is true and correct.

Signature: _______________
Name: ${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}

Witness:
Name: _______________
Signature: _______________`
  },

  'Share Gift Transfer': {
    title: 'SHARE GIFT TRANSFER DEED',
    generateContent: (data: FormData) => `SHARE GIFT TRANSFER DEED

This Deed is executed on ${data.currentDate} between:

TRANSFEROR: ${data.partyName}
Address: ${data.address}
PAN: ${data.panNumber || '_______________'}

TRANSFEREE: ${data.transfereeName || '_______________'}
Address: ${data.transfereeAddress || '_______________'}
PAN: ${data.transfereePan || '_______________'}

WHEREAS the Transferor is the holder of ${data.numberOfShares || '___'} equity shares of ${data.companyName || '_______________'} and desires to gift the same to the Transferee.

NOW THEREFORE, the Transferor hereby gifts ${data.numberOfShares || '___'} equity shares of face value Rs. ${data.faceValue || '___'} each in ${data.companyName || '_______________'} to the Transferee out of love and affection.

The Transferee accepts the gift of the said shares.

Transferor:                    Transferee:
${data.partyName}             ${data.transfereeName || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // STAY CATEGORY
  'Stay Application': {
    title: 'STAY APPLICATION',
    generateContent: (data: FormData) => `TO,
THE HONOURABLE ${data.authorityName || 'COMMISSIONER OF INCOME TAX (APPEALS)'}
${data.authorityAddress || 'NEW DELHI'}

**SUBJECT: APPLICATION FOR STAY OF DEMAND FOR A.Y. ${data.assYear}**

RESPECTFULLY SHEWETH:

1. That the applicant ${data.partyName} is a ${data.applicantType || 'Individual'} having PAN ${data.panNumber || '_______________'}.

2. That the Assessing Officer has raised a demand of Rs. ${data.demandAmount || '_______________'} for A.Y. ${data.assYear} vide order dated ${data.orderDate || '_______________'}.

3. That the applicant has filed an appeal against the said order and the same is pending adjudication.

4. That the demand raised is excessive and without proper basis as detailed in the appeal.

5. That the applicant will suffer irreparable hardship if the demand is not stayed pending disposal of the appeal.

PRAYER:

It is therefore most respectfully prayed that this Hon'ble Authority may be pleased to:

a) Stay the operation of demand raised for A.Y. ${data.assYear}
b) Grant any other relief as deemed fit

AND YOUR PETITIONER SHALL EVER PRAY.

${data.partyName}
PAN: ${data.panNumber || '_______________'}
Address: ${data.address}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}

Enclosures:
1. Copy of Assessment Order
2. Copy of Appeal filed
3. Financial documents`
  },

  'Stay Extension Request': {
    title: 'STAY EXTENSION REQUEST',
    generateContent: (data: FormData) => `TO,
THE HONOURABLE ${data.authorityName || 'COMMISSIONER OF INCOME TAX (APPEALS)'}

**SUBJECT: APPLICATION FOR EXTENSION OF STAY FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

With reference to the stay granted vide order dated ${data.stayOrderDate || '_______________'} for A.Y. ${data.assYear}, I respectfully submit:

1. That stay was granted for a period expiring on ${data.stayExpiryDate || '_______________'}.

2. That the appeal is still pending adjudication before your good office.

3. That due to voluminous nature of the case, more time is required for final disposal.

4. That if stay is not extended, the applicant will suffer irreparable loss.

I therefore request for extension of stay for a further period of ${data.extensionPeriod || '6 months'} or till disposal of appeal, whichever is earlier.

Yours faithfully,

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Stay Modification': {
    title: 'STAY MODIFICATION APPLICATION',
    generateContent: (data: FormData) => `TO,
THE HONOURABLE ${data.authorityName || 'COMMISSIONER OF INCOME TAX (APPEALS)'}

**SUBJECT: APPLICATION FOR MODIFICATION OF STAY CONDITIONS FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

With reference to the conditional stay granted vide order dated ${data.stayOrderDate || '_______________'}, I submit:

1. That stay was granted subject to deposit of ${data.depositPercentage || '20'}% of the demand amount.

2. That due to financial hardship, compliance with the condition is difficult.

3. That the case has strong merits as evident from the appeal filed.

I request modification of stay conditions to:
${data.modificationRequest || 'Reduce deposit amount to 10% of demand'}

Yours faithfully,

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // APPEAL EFFECT CATEGORY
  'Appeal Filing': {
    title: 'APPEAL BEFORE CIT(A)',
    generateContent: (data: FormData) => `TO,
THE COMMISSIONER OF INCOME TAX (APPEALS)
${data.appealOrderDate || 'NEW DELHI'}

**APPEAL UNDER SECTION 246A OF THE INCOME TAX ACT, 1961**

Appellant: ${data.partyName}
PAN: ${data.panNumber || '_______________'}
A.Y.: ${data.assYear}

GROUNDS OF APPEAL:

1. That the order passed by the Assessing Officer is bad in law and contrary to facts.

2. That the addition of Rs. ${data.additionAmount || '_______________'} is unjustified and without basis.

3. That the Assessing Officer has erred in ${data.errorDescription || 'not considering the submissions made'}.

4. That the penalty levied is not sustainable in law.

${data.additionalGrounds || ''}

PRAYER:

It is therefore prayed that this Hon'ble Authority may be pleased to:

a) Delete the addition of Rs. ${data.additionAmount || '_______________'}
b) Cancel the penalty imposed
c) Grant any other relief deemed fit

VERIFICATION:

I, ${data.partyName}, verify that the contents of the appeal are true to my knowledge.

${data.partyName}
Appellant

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}

Fee paid: Rs. ${data.appealFee || '250'} vide Challan No. ${data.challanNumber || '_______________'}`
  },

  'Appeal Effect Request': {
    title: 'APPEAL EFFECT REQUEST',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
WARD NO. ${data.wardNumber || '___'}

**SUBJECT: REQUEST FOR GIVING EFFECT TO CIT(A) ORDER FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

With reference to the order dated ${data.appealOrderDate || '_______________'} passed by CIT(A) in Appeal No. ${data.appealNumber || '_______________'} for A.Y. ${data.assYear}, I submit:

1. That the CIT(A) has deleted the addition of Rs. ${data.deletedAmount || '_______________'}.

2. That consequent to the above, excess payment of Rs. ${data.excessPayment || '_______________'} has been made.

3. That the appeal effect has not been given so far.

I request you to kindly give effect to the CIT(A) order and process the refund of Rs. ${data.refundAmount || '_______________'}.

Copy of CIT(A) order is enclosed.

Yours faithfully,

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}

Enclosure: Copy of CIT(A) Order`
  },

  'Cross Appeal': {
    title: 'CROSS APPEAL',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX APPELLATE TRIBUNAL
${data.authorityAddress || 'NEW DELHI'}

**CROSS APPEAL UNDER SECTION 253 OF THE INCOME TAX ACT, 1961**

Cross Appellant: ${data.partyName}
Respondent: ACIT/DCIT, Ward ${data.wardNumber || '___'}
A.Y.: ${data.assYear}
CIT(A) Appeal No.: ${data.appealNumber || '_______________'}

GROUNDS OF CROSS APPEAL:

1. That the CIT(A) erred in confirming the addition of Rs. ${data.additionAmount || '_______________'}.

2. That the CIT(A) failed to appreciate the legal position regarding ${data.errorDescription || '_______________'}.

3. That the order of CIT(A) is contrary to established judicial precedents.

${data.additionalGrounds || ''}

PRAYER:

It is prayed that this Hon'ble Tribunal may be pleased to delete the addition confirmed by CIT(A).

${data.partyName}
Cross Appellant

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // WILL DEED CATEGORY
  'Will Registration': {
    title: 'LAST WILL AND TESTAMENT',
    generateContent: (data: FormData) => `LAST WILL AND TESTAMENT

I, ${data.partyName}, S/o ${data.fatherName || '_______________'}, aged ${data.age || '___'} years, residing at ${data.address}, being of sound mind and memory, do hereby revoke all former Wills and Codicils made by me and declare this to be my Last Will and Testament.

1. I appoint ${data.executorName || '_______________'} as the Executor of this Will.

2. I direct that all my just debts and funeral expenses be paid.

3. I bequeath my properties as follows:

   a) Residential Property: ${data.residentialProperty || '_______________'} to ${data.residentialBeneficiary || '_______________'}
   
   b) Bank Accounts: All bank accounts to ${data.bankAccountBeneficiary || '_______________'}
   
   c) Other Assets: ${data.otherAssets || '_______________'} to ${data.otherBeneficiary || '_______________'}

4. The residue of my estate to be distributed equally among ${data.residueBeneficiaries || '_______________'}.

5. This Will shall be governed by Indian laws.

IN WITNESS WHEREOF, I have set my hand on this ${data.currentDate}.

TESTATOR:
${data.partyName}

WITNESSES:
1. _______________     2. _______________

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Will Amendment': {
    title: 'CODICIL TO WILL',
    generateContent: (data: FormData) => `CODICIL TO THE LAST WILL AND TESTAMENT

I, ${data.partyName}, having made my Last Will and Testament dated ${data.originalWillDate || '_______________'}, do hereby make this Codicil.

WHEREAS I desire to make certain amendments to my said Will:

1. I hereby revoke Clause ${data.clauseNumber || '___'} of my Will.

2. I substitute the said clause with the following:
   "${data.newClause || '_______________'}"

3. In all other respects, I confirm my said Will.

This Codicil shall be read as part of my Will.

${data.partyName}
Testator

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}

Witnesses:
1. _______________     2. _______________`
  },

  'Will Execution': {
    title: 'WILL EXECUTION NOTICE',
    generateContent: (data: FormData) => `NOTICE OF WILL EXECUTION

TO ALL CONCERNED,

Notice is hereby given that ${data.deceasedName || '_______________'}, who died on ${data.deathDate || '_______________'}, had executed a Will dated ${data.willDate || '_______________'}.

As per the said Will, ${data.executorName || '_______________'} has been appointed as the Executor.

All persons having claims against the estate are required to submit the same within 30 days.

All beneficiaries named in the Will are requested to contact the undersigned.

${data.executorName || '_______________'}
Executor

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}

Contact: ${data.executorContact || '_______________'}`
  },

  // 154 APPLICATION CATEGORY
  'Rectification Application': {
    title: 'RECTIFICATION APPLICATION UNDER SECTION 154',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
WARD NO. ${data.wardNumber || '___'}

**SUBJECT: APPLICATION FOR RECTIFICATION UNDER SECTION 154 FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

I, ${data.partyName}, PAN: ${data.panNumber || '_______________'}, submit that there is a mistake apparent from record in the assessment order dated ${data.orderDate || '_______________'} for A.Y. ${data.assYear}.

The mistake is as follows:
${data.mistakeDescription || '_______________'}

The correct position should be:
${data.correctPosition || '_______________'}

I request you to rectify the mistake under Section 154 of the Income Tax Act.

Yours faithfully,

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Error Correction': {
    title: 'ERROR CORRECTION APPLICATION',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
WARD NO. ${data.wardNumber || '___'}

**SUBJECT: CORRECTION OF ERROR IN ASSESSMENT ORDER FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

With reference to the assessment order dated ${data.orderDate || '_______________'}, I submit that there is an apparent error which needs correction.

Error Details:
${data.errorDetails || '_______________'}

Supporting Documents:
${data.supportingDocs || '_______________'}

I request immediate correction of the error.

Yours faithfully,

${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Computational Error': {
    title: 'COMPUTATIONAL ERROR RECTIFICATION',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
WARD NO. ${data.wardNumber || '___'}

**SUBJECT: RECTIFICATION OF COMPUTATIONAL ERROR FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

There is a computational error in the assessment order dated ${data.orderDate || '_______________'}.

Error in Computation:
${data.computationError || '_______________'}

Correct Computation:
${data.correctComputation || '_______________'}

I request rectification of the computational error.

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // EARLY FIXATION CATEGORY
  'Early Assessment': {
    title: 'EARLY ASSESSMENT REQUEST',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
WARD NO. ${data.wardNumber || '___'}

**SUBJECT: REQUEST FOR EARLY ASSESSMENT FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

I request early completion of assessment for A.Y. ${data.assYear} due to ${data.reason || 'urgent business requirements'}.

All documents are ready and available for scrutiny.

I undertake to cooperate fully for early completion.

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Fixation Request': {
    title: 'FIXATION REQUEST',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
WARD NO. ${data.wardNumber || '___'}

**SUBJECT: REQUEST FOR FIXATION OF HEARING DATE FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

I request fixation of hearing date for assessment proceedings for A.Y. ${data.assYear}.

I am ready with all documents and request early fixation.

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Timeline Extension': {
    title: 'TIMELINE EXTENSION REQUEST',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
WARD NO. ${data.wardNumber || '___'}

**SUBJECT: REQUEST FOR EXTENSION OF TIME FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

I request extension of time for ${data.purpose || 'submission of documents'} for A.Y. ${data.assYear}.

Reason for extension: ${data.extensionReason || '_______________'}

I request extension till ${data.requestedDate || '_______________'}.

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // AUTHORITY CATEGORY
  'Authority Letter': {
    title: 'AUTHORITY LETTER',
    generateContent: (data: FormData) => `AUTHORITY LETTER

I, ${data.partyName}, PAN: ${data.panNumber || '_______________'}, hereby authorize ${data.authorizeeName || '_______________'} to:

${data.authorityPurpose || '_______________'}

This authority is valid till ${data.validTill || '_______________'}.

${data.partyName}
Signature

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Power of Attorney': {
    title: 'POWER OF ATTORNEY',
    generateContent: (data: FormData) => `POWER OF ATTORNEY

I, ${data.partyName}, S/o ${data.fatherName || '_______________'}, hereby appoint ${data.authorizeeName || '_______________'} as my attorney to:

${data.powers || '_______________'}

This Power of Attorney is valid from ${data.validFrom || '_______________'} to ${data.validTill || '_______________'}.

${data.partyName}
Principal

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}

Witnesses:
1. _______________     2. _______________`
  },

  'Authorization Form': {
    title: 'AUTHORIZATION FORM',
    generateContent: (data: FormData) => `AUTHORIZATION FORM

I, ${data.partyName}, hereby authorize ${data.authorizeeName || '_______________'} to act on my behalf for:

${data.authorizationPurpose || '_______________'}

Scope of Authorization: ${data.authorizationScope || '_______________'}

Valid till: ${data.validTill || '_______________'}

${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // GENERAL CATEGORY
  'General Application': {
    title: 'GENERAL APPLICATION',
    generateContent: (data: FormData) => `TO,
${data.recipientName || 'THE CONCERNED OFFICER'}
${data.recipientAddress || '_______________'}

**SUBJECT: ${data.applicationSubject || '_______________'}**

Respected Sir/Madam,

${data.applicationContent || '_______________'}

I request your kind consideration and necessary action.

Yours faithfully,

${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Miscellaneous Request': {
    title: 'MISCELLANEOUS REQUEST',
    generateContent: (data: FormData) => `TO,
${data.recipientName || 'THE CONCERNED AUTHORITY'}

**SUBJECT: ${data.requestSubject || '_______________'}**

Respected Sir/Madam,

${data.requestContent || '_______________'}

${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Information Request': {
    title: 'INFORMATION REQUEST',
    generateContent: (data: FormData) => `TO,
${data.recipientName || 'THE INFORMATION OFFICER'}

**SUBJECT: REQUEST FOR INFORMATION UNDER RTI ACT**

Respected Sir/Madam,

I request the following information:
${data.informationRequested || '_______________'}

Purpose: ${data.informationPurpose || '_______________'}

${data.partyName}
Address: ${data.address}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // CALCULATION CATEGORY
  'Tax Calculation': {
    title: 'TAX CALCULATION WORKSHEET',
    generateContent: (data: FormData) => `TAX CALCULATION FOR A.Y. ${data.assYear}

Name: ${data.partyName}
PAN: ${data.panNumber || '_______________'}

COMPUTATION OF INCOME:

1. Salary Income: Rs. ${data.salaryIncome || '0'}
2. House Property Income: Rs. ${data.housePropertyIncome || '0'}
3. Business Income: Rs. ${data.businessIncome || '0'}
4. Capital Gains: Rs. ${data.capitalGains || '0'}
5. Other Sources: Rs. ${data.otherIncome || '0'}

Total Income: Rs. ${data.totalIncome || '0'}

Less: Deductions under Chapter VI-A
80C: Rs. ${data.deduction80C || '0'}
80D: Rs. ${data.deduction80D || '0'}
Others: Rs. ${data.otherDeductions || '0'}

Taxable Income: Rs. ${data.taxableIncome || '0'}

Tax Calculation:
${data.taxCalculation || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Interest Calculation': {
    title: 'INTEREST CALCULATION',
    generateContent: (data: FormData) => `INTEREST CALCULATION FOR A.Y. ${data.assYear}

Name: ${data.partyName}
PAN: ${data.panNumber || '_______________'}

Principal Amount: Rs. ${data.principalAmount || '_______________'}
Rate of Interest: ${data.interestRate || '___'}% per annum
Period: From ${data.fromDate || '_______________'} to ${data.toDate || '_______________'}

Calculation:
${data.interestCalculation || '_______________'}

Total Interest: Rs. ${data.totalInterest || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Penalty Calculation': {
    title: 'PENALTY CALCULATION',
    generateContent: (data: FormData) => `PENALTY CALCULATION FOR A.Y. ${data.assYear}

Name: ${data.partyName}
PAN: ${data.panNumber || '_______________'}

Base Amount: Rs. ${data.baseAmount || '_______________'}
Penalty Rate: ${data.penaltyRate || '___'}%

Calculation:
${data.penaltyCalculation || '_______________'}

Total Penalty: Rs. ${data.totalPenalty || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // ADJOURNMENT CATEGORY
  'Hearing Adjournment': {
    title: 'HEARING ADJOURNMENT REQUEST',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
WARD NO. ${data.wardNumber || '___'}

**SUBJECT: REQUEST FOR ADJOURNMENT OF HEARING FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

The hearing in my case is fixed on ${data.hearingDate || '_______________'}. I request adjournment due to ${data.adjournmentReason || '_______________'}.

I request the hearing to be rescheduled to ${data.requestedDate || '_______________'}.

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Date Extension': {
    title: 'DATE EXTENSION REQUEST',
    generateContent: (data: FormData) => `TO,
THE CONCERNED OFFICER

**SUBJECT: REQUEST FOR EXTENSION OF DATE**

Respected Sir/Madam,

I request extension of date for ${data.purpose || '_______________'} from ${data.scheduledDate || '_______________'} to ${data.requestedDate || '_______________'}.

Reason: ${data.extensionReason || '_______________'}

${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Postponement Request': {
    title: 'POSTPONEMENT REQUEST',
    generateContent: (data: FormData) => `TO,
${data.recipientName || 'THE CONCERNED AUTHORITY'}

**SUBJECT: REQUEST FOR POSTPONEMENT**

Respected Sir/Madam,

I request postponement of ${data.eventName || '_______________'} scheduled on ${data.scheduledDate || '_______________'}.

Reason for postponement: ${data.postponementReason || '_______________'}

${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // AFFIDAVIT CATEGORY
  'General Affidavit': {
    title: 'AFFIDAVIT',
    generateContent: (data: FormData) => `AFFIDAVIT

I, ${data.partyName}, S/o ${data.fatherName || '_______________'}, aged ${data.age || '___'} years, residing at ${data.address}, do hereby solemnly affirm and declare as under:

1. ${data.statement1 || '_______________'}

2. ${data.statement2 || '_______________'}

3. ${data.statement3 || '_______________'}

I further declare that the above statements are true to the best of my knowledge and belief.

DEPONENT
${data.partyName}

VERIFICATION:
I, the above named deponent, do hereby verify that the contents of this affidavit are true to the best of my knowledge and belief.

Verified at ${data.place || 'Fatehpur'} on this ${data.currentDate}.

DEPONENT
${data.partyName}`
  },

  'Income Affidavit': {
    title: 'INCOME AFFIDAVIT',
    generateContent: (data: FormData) => `INCOME AFFIDAVIT

I, ${data.partyName}, S/o ${data.fatherName || '_______________'}, residing at ${data.address}, do hereby solemnly affirm and declare as under:

1. That my annual income for F.Y. ${data.financialYear || '_______________'} is Rs. ${data.annualIncome || '_______________'}.

2. That the sources of my income are:
   a) Salary: Rs. ${data.salaryIncome || '0'}
   b) Business: Rs. ${data.businessIncome || '0'}
   c) Other Sources: Rs. ${data.otherIncome || '0'}

3. That I have filed my Income Tax Return for A.Y. ${data.assYear} showing the above income.

4. That the above statements are true to the best of my knowledge.

DEPONENT
${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Asset Declaration': {
    title: 'ASSET DECLARATION AFFIDAVIT',
    generateContent: (data: FormData) => `ASSET DECLARATION AFFIDAVIT

I, ${data.partyName}, do hereby declare my assets as on ${data.declarationDate || data.currentDate}:

IMMOVABLE PROPERTY:
${data.immovableProperty || '_______________'}

MOVABLE PROPERTY:
${data.movableProperty || '_______________'}

BANK ACCOUNTS:
${data.bankAccounts || '_______________'}

INVESTMENTS:
${data.investments || '_______________'}

I declare that the above information is true and complete.

${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // PARTNERSHIP/TRUST DEED CATEGORY
  'Partnership Deed': {
    title: 'PARTNERSHIP DEED',
    generateContent: (data: FormData) => `PARTNERSHIP DEED

This Partnership Deed is executed on ${data.currentDate} between:

FIRST PARTNER: ${data.partner1Name || '_______________'}
Address: ${data.partner1Address || '_______________'}
PAN: ${data.partner1Pan || '_______________'}

SECOND PARTNER: ${data.partner2Name || '_______________'}
Address: ${data.partner2Address || '_______________'}
PAN: ${data.partner2Pan || '_______________'}

TERMS AND CONDITIONS:

1. Name of Partnership: ${data.firmName}
2. Business: ${data.businessNature || '_______________'}
3. Principal Place of Business: ${data.businessAddress || '_______________'}

CAPITAL CONTRIBUTION:
- ${data.partner1Name || 'First Partner'}: Rs. ${data.partner1Capital || '_______________'}
- ${data.partner2Name || 'Second Partner'}: Rs. ${data.partner2Capital || '_______________'}

PROFIT SHARING RATIO: ${data.profitRatio || '50:50'}

DURATION: ${data.partnershipDuration || 'Till mutually decided'}

IN WITNESS WHEREOF the parties have executed this deed.

${data.partner1Name || 'FIRST PARTNER'}          ${data.partner2Name || 'SECOND PARTNER'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}

Witnesses:
1. _______________     2. _______________`
  },

  'Trust Formation': {
    title: 'TRUST DEED',
    generateContent: (data: FormData) => `TRUST DEED

This Trust Deed is executed on ${data.currentDate} by:

SETTLOR: ${data.settlorName || '_______________'}
Address: ${data.settlorAddress || '_______________'}

IN FAVOUR OF:

TRUSTEES:
1. ${data.trustee1Name || '_______________'}
2. ${data.trustee2Name || '_______________'}

NAME OF TRUST: ${data.trustName || '_______________'}

OBJECTS OF TRUST:
${data.trustObjects || '_______________'}

TRUST PROPERTY:
${data.trustProperty || '_______________'}

POWERS OF TRUSTEES:
${data.trusteePowers || '_______________'}

SETTLOR                    TRUSTEES
${data.settlorName || '_______________'}    1. ${data.trustee1Name || '_______________'}
                           2. ${data.trustee2Name || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Deed Amendment': {
    title: 'DEED AMENDMENT',
    generateContent: (data: FormData) => `AMENDMENT TO ${data.originalDeedType || 'DEED'}

This Amendment is made on ${data.currentDate} to the ${data.originalDeedType || 'Deed'} dated ${data.originalDeedDate || '_______________'}.

PARTIES: ${data.parties || '_______________'}

AMENDMENTS:
${data.amendments || '_______________'}

All other terms of the original deed remain unchanged.

PARTIES:
${data.partySignatures || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  // ASSESSMENT CATEGORY
  'Self Assessment': {
    title: 'SELF ASSESSMENT STATEMENT',
    generateContent: (data: FormData) => `SELF ASSESSMENT STATEMENT FOR A.Y. ${data.assYear}

Name: ${data.partyName}
PAN: ${data.panNumber || '_______________'}

I hereby assess my income and tax liability as follows:

Total Income: Rs. ${data.totalIncome || '_______________'}
Tax Payable: Rs. ${data.taxLiability || '_______________'}
TDS/Advance Tax: Rs. ${data.taxPaid || '_______________'}
Balance Tax Payable: Rs. ${data.refundDemand || '_______________'}

I declare that the assessment is correct.

${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Return Assessment': {
    title: 'RETURN ASSESSMENT STATEMENT',
    generateContent: (data: FormData) => `RETURN ASSESSMENT FOR A.Y. ${data.assYear}

Assessee: ${data.partyName}
PAN: ${data.panNumber || '_______________'}

Return Filed on: ${data.returnFilingDate || '_______________'}
Processing Date: ${data.processingDate || '_______________'}

Assessment Summary:
Total Income as per Return: Rs. ${data.returnIncome || '_______________'}
Tax as per Return: Rs. ${data.returnTax || '_______________'}
Tax Paid: Rs. ${data.taxPaid || '_______________'}
Refund/Demand: Rs. ${data.refundDemand || '_______________'}

${data.partyName}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  },

  'Reassessment Application': {
    title: 'REASSESSMENT APPLICATION',
    generateContent: (data: FormData) => `TO,
THE INCOME TAX OFFICER
WARD NO. ${data.wardNumber || '___'}

**SUBJECT: APPLICATION FOR REASSESSMENT FOR A.Y. ${data.assYear}**

Respected Sir/Madam,

I request reassessment for A.Y. ${data.assYear} due to ${data.reassessmentReason || '_______________'}.

Additional Information:
${data.additionalInfo || '_______________'}

Supporting Documents:
${data.supportingDocs || '_______________'}

${data.partyName}
PAN: ${data.panNumber || '_______________'}

Date: ${data.currentDate}
Place: ${data.place || 'Fatehpur'}`
  }
};

// Helper function to get available templates
export const getAvailableTemplates = (): string[] => {
  return Object.keys(formTemplates);
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
  
  // Add current date to data if not provided
  const formData: FormData = {
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
