import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Search, Users, Calendar, Phone, Loader2, LogIn, Mail, Building2 } from 'lucide-react';
import SEO from '@/components/SEO';
import { useGetAllContactFormSubmissions, useIsCallerAdmin } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import type { ContactFormSubmission } from '../backend';

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: contactSubmissions = [], isLoading: entriesLoading } = useGetAllContactFormSubmissions();

  const isAuthenticated = !!identity;

  // Filter entries based on search term
  const filteredEntries = useMemo(() => {
    if (!searchTerm) return contactSubmissions;
    const term = searchTerm.toLowerCase();
    return contactSubmissions.filter(
      (entry) =>
        entry.name.toLowerCase().includes(term) ||
        entry.email.toLowerCase().includes(term) ||
        entry.phone.toLowerCase().includes(term) ||
        entry.company.toLowerCase().includes(term)
    );
  }, [contactSubmissions, searchTerm]);

  // Format timestamp to readable date
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Message', 'Date'];
    const rows = filteredEntries.map((entry) => [
      entry.name,
      entry.email,
      entry.phone,
      entry.company,
      entry.message,
      formatDate(entry.timestamp),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <SEO
          title="Admin Dashboard"
          description="Admin dashboard for PB Partner Hub - Login required"
          canonical="/admin"
        />
        <section className="py-20 md:py-28 min-h-[80vh] flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <LogIn className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              <CardDescription>
                Please log in with your admin credentials to access the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={login}
                disabled={loginStatus === 'logging-in'}
                size="lg"
                className="w-full"
              >
                {loginStatus === 'logging-in' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </section>
      </>
    );
  }

  // Show loading state while checking admin status
  if (isAdminLoading) {
    return (
      <>
        <SEO
          title="Admin Dashboard"
          description="Admin dashboard for PB Partner Hub"
          canonical="/admin"
        />
        <section className="py-20 md:py-28 min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Verifying access...</p>
          </div>
        </section>
      </>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <>
        <SEO
          title="Admin Dashboard"
          description="Admin dashboard for PB Partner Hub - Access Denied"
          canonical="/admin"
        />
        <section className="py-20 md:py-28 min-h-[80vh] flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <Users className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Access Denied</CardTitle>
              <CardDescription>
                You do not have permission to access this page. Please contact the administrator if
                you believe this is an error.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Admin Dashboard"
        description="Admin dashboard for managing contact form submissions at PB Partner Hub."
        canonical="/admin"
      />

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-2">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                Manage contact form submissions and partner inquiries
              </p>
            </div>
            <img
              src="/assets/generated/admin-dashboard.dim_800x600.jpg"
              alt="Admin dashboard"
              className="hidden md:block h-24 w-24 rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contactSubmissions.length}</div>
                <p className="text-xs text-muted-foreground">Contact form submissions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredEntries.length}</div>
                <p className="text-xs text-muted-foreground">Matching search criteria</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latest Entry</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {contactSubmissions.length > 0 ? 'Today' : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">Most recent submission</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Submissions Table */}
      <section className="py-8 md:py-12 pb-20">
        <div className="container">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">Contact Submissions</CardTitle>
                  <CardDescription>
                    View and manage all contact form submissions
                  </CardDescription>
                </div>
                <Button onClick={handleExportCSV} disabled={filteredEntries.length === 0}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, phone, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Loading State */}
              {entriesLoading && (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading submissions...</p>
                </div>
              )}

              {/* Empty State */}
              {!entriesLoading && contactSubmissions.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No submissions yet</h3>
                  <p className="text-muted-foreground">
                    Contact form submissions will appear here.
                  </p>
                </div>
              )}

              {/* No Results State */}
              {!entriesLoading && contactSubmissions.length > 0 && filteredEntries.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria.
                  </p>
                </div>
              )}

              {/* Data Table */}
              {!entriesLoading && filteredEntries.length > 0 && (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map((entry, index) => (
                        <TableRow key={`${entry.email}-${index}`}>
                          <TableCell className="font-medium">{entry.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[200px]">{entry.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              {entry.phone}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[150px]">{entry.company || 'N/A'}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="truncate max-w-[200px] block">{entry.message}</span>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">{formatDate(entry.timestamp)}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">Received</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
