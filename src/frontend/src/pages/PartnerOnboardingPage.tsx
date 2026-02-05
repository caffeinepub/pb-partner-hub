import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';
import { CheckCircle, CreditCard, Fingerprint, Building2, GraduationCap, Phone, Mail, Camera, Upload, X, FileCheck } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import { useUploadDocument } from '@/hooks/useQueries';
import { DocumentType } from '@/backend';

const requiredDocuments = [
  {
    icon: CreditCard,
    title: 'PAN Card',
    description: 'Valid Permanent Account Number card',
    docType: DocumentType.panCard,
  },
  {
    icon: Fingerprint,
    title: 'Aadhaar Card',
    description: 'Government-issued identity proof',
    docType: DocumentType.aadhaarCard,
  },
  {
    icon: Building2,
    title: 'Bank Account Details',
    description: 'Active bank account information',
    docType: DocumentType.bankDetails,
  },
  {
    icon: GraduationCap,
    title: '10th Pass Certificate / Highest Education',
    description: 'Educational qualification proof',
    docType: DocumentType.educationCertificate,
  },
  {
    icon: Phone,
    title: 'Mobile Number',
    description: 'Active mobile number for verification',
    docType: DocumentType.mobileNumber,
  },
  {
    icon: Mail,
    title: 'Email ID',
    description: 'Valid email address for communication',
    docType: DocumentType.email,
  },
  {
    icon: Camera,
    title: 'Selfie (Live Photo)',
    description: 'Recent photograph for identity verification',
    docType: DocumentType.selfie,
  },
];

const requirements = [
  'Valid government-issued ID proof (Aadhaar, PAN, etc.)',
  'Business registration documents',
  'IRDAI certification (if applicable)',
  'Bank account details',
  'GST registration (if applicable)',
  'Professional qualification certificates',
  'Address proof (business and residential)',
  'Recent passport-size photographs',
];

interface UploadedFile {
  file: File;
  docType: DocumentType;
  progress: number;
}

export default function PartnerOnboardingPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const uploadDocument = useUploadDocument();

  const handleFileSelect = (files: FileList | null, docType?: DocumentType) => {
    if (!files) return;

    const newFiles = Array.from(files).map((file) => ({
      file,
      docType: docType || DocumentType.panCard,
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFileDocType = (index: number, docType: DocumentType) => {
    setUploadedFiles((prev) =>
      prev.map((file, i) => (i === index ? { ...file, docType } : file))
    );
  };

  const handleUploadAll = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('No files to upload', {
        description: 'Please select at least one document to upload.',
      });
      return;
    }

    try {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const { file, docType } = uploadedFiles[i];

        // Update progress
        setUploadedFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, progress: 50 } : f))
        );

        // Read file as bytes
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        // Upload to backend
        await uploadDocument.mutateAsync({
          docType,
          fileName: file.name,
          fileContent: bytes,
        });

        // Update progress to complete
        setUploadedFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, progress: 100 } : f))
        );
      }

      toast.success('Documents uploaded successfully!', {
        description: 'Your documents have been submitted. We will review them within 48 hours.',
      });

      // Clear uploaded files after successful upload
      setTimeout(() => {
        setUploadedFiles([]);
      }, 2000);
    } catch (error) {
      toast.error('Upload failed', {
        description: 'Please try again or contact support.',
      });
    }
  };

  return (
    <>
      <SEO
        title="Partner Onboarding"
        description="Learn about our streamlined partner onboarding process. Get started with PBPartners through our comprehensive step-by-step onboarding program. Contact us at 7972584060 (Mobile) or 7709446589 (WhatsApp)."
        canonical="/partner-onboarding"
      />

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Partner <span className="text-primary">Onboarding</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Join our network of successful insurance partners through our streamlined onboarding
              process designed for efficiency and ease.
            </p>
          </div>
        </div>
      </section>

      {/* Documents Required for Insurance Agent Partner Registration */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 text-sm px-4 py-1.5" variant="secondary">
                100% FREE Registration | No Charges
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Documents Required for Insurance Agent Partner Registration
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started with your insurance partner journey. Here's everything you need to register.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
              {requiredDocuments.map((doc) => (
                <Card key={doc.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <doc.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base mb-1">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <p className="text-xl md:text-2xl font-semibold">
                    Registration is completely FREE. No hidden charges.
                  </p>
                  <p className="text-base opacity-90">
                    Start your journey as an insurance partner today. Our team is ready to assist you with the registration process.
                  </p>
                  <div className="pt-4">
                    <a
                      href="https://wa.me/7709446589"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button
                        size="lg"
                        variant="secondary"
                        className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6 h-auto"
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        Call / WhatsApp Now
                      </Button>
                    </a>
                  </div>
                  <p className="text-sm opacity-75 pt-2">
                    Click to connect instantly via WhatsApp at 7709446589
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Upload Your Documents
              </h2>
              <p className="text-lg text-muted-foreground">
                Upload all required documents in one go. We accept PDF, JPG, PNG formats.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                {/* Drag and Drop Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    Drag and drop your files here
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click the button below to browse
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />
                  <label htmlFor="file-upload">
                    <Button type="button" variant="outline" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported formats: PDF, JPG, PNG (Max 10MB per file)
                  </p>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="font-semibold text-lg mb-4">Selected Documents</h3>
                    {uploadedFiles.map((uploadedFile, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30"
                      >
                        <FileCheck className="h-8 w-8 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{uploadedFile.file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          {uploadedFile.progress > 0 && (
                            <div className="mt-2">
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${uploadedFile.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <select
                          value={uploadedFile.docType}
                          onChange={(e) =>
                            updateFileDocType(index, e.target.value as DocumentType)
                          }
                          className="px-3 py-2 border rounded-md bg-background text-sm"
                        >
                          <option value={DocumentType.panCard}>PAN Card</option>
                          <option value={DocumentType.aadhaarCard}>Aadhaar Card</option>
                          <option value={DocumentType.bankDetails}>Bank Details</option>
                          <option value={DocumentType.educationCertificate}>
                            Education Certificate
                          </option>
                          <option value={DocumentType.mobileNumber}>Mobile Number</option>
                          <option value={DocumentType.email}>Email ID</option>
                          <option value={DocumentType.selfie}>Selfie</option>
                        </select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                          disabled={uploadedFile.progress > 0}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <Button
                      onClick={handleUploadAll}
                      size="lg"
                      className="w-full mt-6"
                      disabled={uploadDocument.isPending}
                    >
                      {uploadDocument.isPending ? 'Uploading...' : 'Upload All Documents'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Additional Documentation
              </h2>
              <p className="text-lg text-muted-foreground">
                To ensure a smooth onboarding process, please have the following documents ready
                before you begin your application.
              </p>
              <div className="space-y-3">
                {requirements.map((requirement) => (
                  <div key={requirement} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="/assets/generated/insurance-documents.dim_600x400.jpg"
                alt="Insurance documents"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Expected Timeline</CardTitle>
                <CardDescription className="text-base">
                  From application to activation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">48 Hours</div>
                  <div className="text-lg text-muted-foreground">After Complete Documents Received</div>
                </div>
                <p className="text-center text-muted-foreground">
                  48 hours required after complete documents are received. Our team will review your application and documents promptly to ensure quick activation.
                </p>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">What Happens Next?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• You'll receive email updates at each stage of the process</li>
                    <li>• Our team may contact you for additional information if needed</li>
                    <li>• Once approved, you'll receive login credentials and training schedule</li>
                    <li>• Your dedicated account manager will be assigned upon activation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Need Help with Onboarding?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Our onboarding support team is here to assist you every step of the way. Contact us
                for guidance or to clarify any questions about the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90"
                  >
                    Contact Support Team
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    View All Services
                  </Button>
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-primary-foreground/20">
                <p className="text-sm opacity-75">
                  <strong>Onboarding Support:</strong>
                  <br />
                  Email:{' '}
                  <a href="mailto:info@pbpartnershub.in" className="hover:underline">
                    info@pbpartnershub.in
                  </a>
                  ,{' '}
                  <a href="mailto:support@pbpartnershub.in" className="hover:underline">
                    support@pbpartnershub.in
                  </a>
                  ,{' '}
                  <a href="mailto:Prashant.pbp47@gmail.com" className="hover:underline">
                    Prashant.pbp47@gmail.com
                  </a>
                  <br />
                  Mobile:{' '}
                  <a href="tel:7972584060" className="hover:underline">
                    7972584060
                  </a>{' '}
                  | WhatsApp:{' '}
                  <a
                    href="https://wa.me/7709446589"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    7709446589
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
