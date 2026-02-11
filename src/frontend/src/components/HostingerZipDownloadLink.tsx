import { useState, useEffect } from 'react';
import { Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function HostingerZipDownloadLink() {
  const [zipAvailable, setZipAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if the ZIP file is available
    const checkZipAvailability = async () => {
      try {
        const response = await fetch('/hostinger-site.zip', { method: 'HEAD' });
        setZipAvailable(response.ok);
      } catch (error) {
        setZipAvailable(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkZipAvailability();
  }, []);

  if (isChecking) {
    return null; // Don't show anything while checking
  }

  if (zipAvailable) {
    return (
      <Button
        variant="outline"
        size="sm"
        asChild
        className="inline-flex items-center gap-2"
      >
        <a
          href="/hostinger-site.zip"
          download="hostinger-site.zip"
        >
          <Download className="h-4 w-4" />
          Download Hostinger ZIP
        </a>
      </Button>
    );
  }

  return (
    <Alert variant="default" className="mt-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-sm">
        <strong>Hostinger ZIP not available.</strong> To generate the deployment package, run this command from the{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">frontend</code> directory:
        <pre className="bg-muted p-2 rounded mt-2 mb-2 overflow-x-auto">
          <code className="text-xs font-mono">node scripts/build-hostinger-zip.mjs</code>
        </pre>
        This will create <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">hostinger-site.zip</code> with your production-ready website.
        For detailed instructions, see the <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">HOSTINGER_ZIP_README.md</code> file in the frontend directory.
      </AlertDescription>
    </Alert>
  );
}
