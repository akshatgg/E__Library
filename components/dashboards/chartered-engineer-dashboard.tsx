"use client"

import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Download, Phone, Mail, MessageSquare, FileText, BookOpen, Award, MapPin, Check, FileCheck } from "lucide-react";

// Define TypeScript interfaces
interface ServiceItem {
  id: number;
  title: string;
  description: string;
}

interface SampleCertificate {
  id: number;
  label: string;
  link: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  serviceNeeded?: string;
  message?: string;
}

// Sample data that would normally come from Redux
const initialServices: ServiceItem[] = [
  { id: 1, title: "Building Structural Stability Certificate", description: "Certification for the structural integrity and stability of buildings for loan, mortgage, or compliance purposes." },
  { id: 2, title: "Plant & Machinery Valuation", description: "Expert valuation of industrial equipment, machinery, and plants for financial, insurance, or asset management needs." },
  { id: 3, title: "Construction Cost Estimation", description: "Detailed cost assessment for construction projects, renovations, or repairs with itemized breakdowns." },
  { id: 4, title: "Property Valuation Certificate", description: "Valuation of residential, commercial, or industrial properties for banks, tax authorities, or legal purposes." },
  { id: 5, title: "Technical Due Diligence", description: "Comprehensive assessment of structural, mechanical, and technical aspects of properties and industrial facilities." },
  { id: 6, title: "Project Completion Certificate", description: "Professional certification confirming completion of construction projects as per approved plans and specifications." },
  { id: 7, title: "Defect Assessment Report", description: "Detailed analysis of structural or construction defects with remedial recommendations." },
  { id: 8, title: "FSI/FAR Certification", description: "Verification and certification of Floor Space Index or Floor Area Ratio for compliance with building regulations." },
  { id: 9, title: "Expert Witness Services", description: "Professional engineering testimony for court cases, arbitrations, and legal disputes." }
];

const initialSampleCertificates: SampleCertificate[] = [
  { id: 1, label: "Building Stability Certificate Sample", link: "/samples/stability-certificate.pdf" },
  { id: 2, label: "Machinery Valuation Report Sample", link: "/samples/machinery-valuation.pdf" },
  { id: 3, label: "Property Valuation Certificate Sample", link: "/samples/property-valuation.pdf" },
  { id: 4, label: "Project Completion Certificate Sample", link: "/samples/completion-certificate.pdf" }
];

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  serviceNeeded: "",
  message: ""
};

export function CharteredEngineerDashboard() {
  // State management (replacing Redux in this standalone component)
  const [services] = useState<ServiceItem[]>(initialServices);
  const [sampleCertificates] = useState<SampleCertificate[]>(initialSampleCertificates);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Define enhanced input styles for form fields
  const inputClassName = "mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500";

  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.serviceNeeded) errors.serviceNeeded = "Please select a service";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Send form data to API
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: "Chartered Engineer Service Request: " + formData.serviceNeeded,
            category: "Chartered Engineer",
            message: `Service Requested: ${formData.serviceNeeded}\n\n${formData.message || "No additional message provided."}`,
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setFormSubmitted(true);
          toast({
            title: "Email sent successfully! ✅",
            description: "Your request has been emailed to our team. We'll contact you shortly.",
            variant: "default",
            className: "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800",
          });
          setFormData(initialFormData);
          
          // Reset form after showing success for 5 seconds
          setTimeout(() => {
            setFormSubmitted(false);
          }, 5000);
        } else {
          toast({
            title: "Email sending failed",
            description: result.message || "An error occurred. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Email sending failed",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chartered Engineer Services – iTax Easy Private Limited</h1>
          <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">Professional Engineering Certification & Valuation Services</p>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Trusted since 2019 | Based in Gwalior, Serving PAN India</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Who We Are Section */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Who We Are
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
              <p>iTax Easy Private Limited is a government-registered, GST-compliant, MSME-certified company based in Gwalior, Madhya Pradesh. Established in 2019, we offer Chartered Engineer services for individuals, businesses, builders, banks, and legal professionals.</p>
              <p>Our services are led by a Registered Chartered Engineer (IEI) and Director of the company to ensure technical accuracy, compliance, and timely delivery.</p>
            </CardContent>
          </Card>

          {/* Our Services Section */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Our Chartered Engineer Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left text-gray-700 dark:text-gray-300">Service</th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left text-gray-700 dark:text-gray-300">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors">
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{s.title}</td>
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">{s.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Authorized & Recognized Section */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Authorised & Recognised For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                  <span>Bank Mortgage & Loan Documentation</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                  <span>Municipal / GDA / PWD / Smart City Compliance</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                  <span>Legal Proceedings & Civil Engineering Disputes</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                  <span>Government Tender and Licensing Requirements</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Sample Certificates Section */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Download Sample Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 dark:text-gray-300">(Click to download sample PDFs)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sampleCertificates.map(cert => (
                  <a 
                    key={cert.id} 
                    href={cert.link} 
                    download 
                    className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-650 transition-colors"
                  >
                    <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-800 dark:text-gray-200">{cert.label}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Locations Section */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Service Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">While headquartered in Gwalior, we serve clients in: <span className="font-medium">Morena • Vidisha • Bhopal • Jhansi • Delhi NCR • PAN India</span> (online & site visits)</p>
            </CardContent>
          </Card>

          {/* Why Choose Us Section */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Why Choose iTax Easy?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>6+ Years of Trusted Experience</span>
                </li>
                <li className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>Certified Chartered Engineer (IEI)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>Government, Legal & Financial Institution Ready</span>
                </li>
                <li className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>Tax + Legal + Technical Expertise Under One Roof</span>
                </li>
                <li className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>On-Time Reports with Verified Formats</span>
                </li>
                <li className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>Affordable & Transparent Pricing</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Consultation Form Section */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Book a Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Email Sent Successfully!</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Your request has been emailed to our team at info@itaxeasy.com.<br />
                    We'll get back to you soon regarding your certification needs.
                  </p>
                  <Button 
                    onClick={() => setFormSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormField('name', e.target.value)}
                      className="mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormField('email', e.target.value)}
                    className={inputClassName}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormField('phone', e.target.value)}
                    className="mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="service" className="text-gray-700 dark:text-gray-300">Service Needed</Label>
                  <Select
                    value={formData.serviceNeeded}
                    onValueChange={(value) => updateFormField('serviceNeeded', value)}
                  >
                    <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(s => (
                        <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.serviceNeeded && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.serviceNeeded}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => updateFormField('message', e.target.value)}
                    className="mt-1 min-h-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                  Request a Certification
                </Button>
              </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information Section */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us Today</CardTitle>
            </CardHeader>
            <CardContent>
              <address className="not-italic text-gray-700 dark:text-gray-300 mb-6">
                <p className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  G-41, Gandhi Nagar, Padav, Gwalior (MP)
                </p>
                <p className="flex items-center gap-2 mb-2">
                  <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <a href="tel:+919425113371" className="text-blue-600 dark:text-blue-400 hover:underline">+91 9425113371</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <a href="mailto:info@itaxeasy.com" className="text-blue-600 dark:text-blue-400 hover:underline">info@itaxeasy.com</a>
                </p>
              </address>
              <a 
                href="https://wa.me/919425113371" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
              >
                Talk to an Engineer on WhatsApp
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default CharteredEngineerDashboard;
