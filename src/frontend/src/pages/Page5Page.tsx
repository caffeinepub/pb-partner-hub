import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page5Page() {
  return (
    <>
      <SEO
        title="Page 5"
        description="Page 5 of PB Partners Hub - Explore additional resources and information for insurance partners."
        canonical="/page-5"
      />
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-6">Page 5</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Page 5</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                This is a placeholder page for additional content. You can customize this page
                with relevant information about your services, products, or any other content
                that supports your business objectives.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Feel free to add sections, images, forms, or any other components that will
                help communicate your message effectively to your visitors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
