import { useState, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Settings, 
  Loader2, 
  LogIn, 
  CheckCheck, 
  Check, 
  Clock,
  XCircle,
  Users,
  MessageSquare,
  TrendingUp,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle2,
  Info,
  Phone,
  Copy,
  ExternalLink,
  RefreshCw,
  Server,
  UserCheck,
  Trash2,
  Plus
} from 'lucide-react';
import SEO from '@/components/SEO';
import { 
  useGetAllWhatsAppMessages, 
  useIsCallerAdmin, 
  useSendWhatsAppMessage,
  useSendWhatsAppMessageViaAPI,
  useGetMetaApiConfig,
  useUpdateMetaApiConfig,
  useGetWhatsAppIntegrationStatus,
  useGetWhatsAppTokenStatus,
  useGetPhoneNumberStatus,
  useGetBackendHealth,
  useGetApprovedRecipients,
  useAddApprovedRecipient,
  useRemoveApprovedRecipient,
  RecipientType
} from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { MessageStatus } from '../backend';
import { toast } from 'sonner';

export default function WhatsAppDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [businessAccountId, setBusinessAccountId] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [approvedRecipientsOpen, setApprovedRecipientsOpen] = useState(false);
  const [newRecipientPhone, setNewRecipientPhone] = useState('');
  const [newRecipientDescription, setNewRecipientDescription] = useState('');
  const [newRecipientType, setNewRecipientType] = useState<RecipientType>(RecipientType.individual);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: messages = [], isLoading: messagesLoading } = useGetAllWhatsAppMessages();
  const { data: metaApiConfig, isLoading: configLoading } = useGetMetaApiConfig();
  const { data: integrationStatus, isLoading: statusLoading } = useGetWhatsAppIntegrationStatus();
  const { data: tokenStatus, isLoading: tokenStatusLoading } = useGetWhatsAppTokenStatus();
  const { data: phoneNumberStatus, isLoading: phoneNumberStatusLoading } = useGetPhoneNumberStatus();
  const { data: backendHealth, isLoading: healthLoading, error: healthError, refetch: refetchHealth } = useGetBackendHealth();
  const { data: approvedRecipients = [], isLoading: approvedRecipientsLoading } = useGetApprovedRecipients();
  const sendMessageMutation = useSendWhatsAppMessage();
  const sendMessageViaAPIMutation = useSendWhatsAppMessageViaAPI();
  const updateConfigMutation = useUpdateMetaApiConfig();
  const addApprovedRecipientMutation = useAddApprovedRecipient();
  const removeApprovedRecipientMutation = useRemoveApprovedRecipient();

  const isAuthenticated = !!identity;

  // Load config into form when dialog opens
  useEffect(() => {
    if (settingsOpen && metaApiConfig) {
      setAccessToken(metaApiConfig.accessToken);
      setBusinessAccountId(metaApiConfig.whatsappBusinessAccountId);
      setPhoneNumberId(metaApiConfig.phoneNumberId);
    }
  }, [settingsOpen, metaApiConfig]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedContact]);

  // Get unique contacts from messages
  const contacts = useMemo(() => {
    const contactMap = new Map<string, { name: string; lastMessage: string; timestamp: bigint; unread: number }>();
    
    messages.forEach((msg) => {
      const contactNumber = msg.sender === '7709446589' ? msg.recipient : msg.sender;
      const existing = contactMap.get(contactNumber);
      
      if (!existing || msg.timestamp > existing.timestamp) {
        contactMap.set(contactNumber, {
          name: contactNumber,
          lastMessage: msg.content.substring(0, 50) + (msg.content.length > 50 ? '...' : ''),
          timestamp: msg.timestamp,
          unread: 0,
        });
      }
    });

    return Array.from(contactMap.entries()).map(([number, data]) => ({
      number,
      ...data,
    })).sort((a, b) => Number(b.timestamp - a.timestamp));
  }, [messages]);

  // Filter contacts based on search
  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts;
    const term = searchTerm.toLowerCase();
    return contacts.filter((contact) => 
      contact.number.toLowerCase().includes(term) ||
      contact.lastMessage.toLowerCase().includes(term)
    );
  }, [contacts, searchTerm]);

  // Get messages for selected contact
  const selectedMessages = useMemo(() => {
    if (!selectedContact) return [];
    return messages
      .filter((msg) => msg.sender === selectedContact || msg.recipient === selectedContact)
      .sort((a, b) => Number(a.timestamp - b.timestamp));
  }, [messages, selectedContact]);

  // Check if selected contact is approved
  const isSelectedContactApproved = useMemo(() => {
    if (!selectedContact) return false;
    return approvedRecipients.some(r => r.phoneNumber === selectedContact);
  }, [selectedContact, approvedRecipients]);

  // Format timestamp
  const formatTime = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  // Get status icon
  const getStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case MessageStatus.sent:
        return <Check className="h-3 w-3" />;
      case MessageStatus.delivered:
        return <CheckCheck className="h-3 w-3" />;
      case MessageStatus.read:
        return <CheckCheck className="h-3 w-3 text-primary" />;
      case MessageStatus.failed:
        return <XCircle className="h-3 w-3 text-destructive" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!messageContent.trim() || !selectedContact) return;

    try {
      await sendMessageMutation.mutateAsync({
        sender: '7709446589',
        recipient: selectedContact,
        content: messageContent.trim(),
      });
      setMessageContent('');
      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('Failed to send message');
      console.error('Send message error:', error);
    }
  };

  // Handle send via API
  const handleSendViaAPI = async () => {
    if (!messageContent.trim() || !selectedContact) return;

    // Check if recipient is approved
    if (!isSelectedContactApproved) {
      toast.error('Recipient not approved. Please add this number to the approved recipients list first.');
      return;
    }

    try {
      await sendMessageViaAPIMutation.mutateAsync({
        from: '7709446589',
        to: selectedContact,
        content: messageContent.trim(),
      });
      setMessageContent('');
      toast.success('Message sent via Meta API');
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to send message via API';
      if (errorMessage.includes('whitelisted') || errorMessage.includes('approved')) {
        toast.error('Recipient not approved. Please add this number to the approved recipients list first.');
      } else {
        toast.error(errorMessage);
      }
      console.error('Send via API error:', error);
    }
  };

  // Handle save settings
  const handleSaveSettings = async () => {
    if (!accessToken || !businessAccountId || !phoneNumberId) {
      toast.error('All fields are required');
      return;
    }

    try {
      await updateConfigMutation.mutateAsync({
        accessToken,
        whatsappBusinessAccountId: businessAccountId,
        phoneNumberId,
      });
      toast.success('Settings saved successfully');
      setSettingsOpen(false);
    } catch (error) {
      toast.error('Failed to save settings');
      console.error('Save settings error:', error);
    }
  };

  // Handle add approved recipient
  const handleAddApprovedRecipient = async () => {
    if (!newRecipientPhone.trim()) {
      toast.error('Phone number is required');
      return;
    }

    // Check if already exists
    if (approvedRecipients.some(r => r.phoneNumber === newRecipientPhone.trim())) {
      toast.error('This phone number is already approved');
      return;
    }

    try {
      await addApprovedRecipientMutation.mutateAsync({
        phoneNumber: newRecipientPhone.trim(),
        partnerId: 'admin',
        sourceSystem: 'PB Partners',
        recipientType: newRecipientType,
        description: newRecipientDescription.trim() || 'Approved recipient',
      });
      toast.success('Recipient approved successfully');
      setNewRecipientPhone('');
      setNewRecipientDescription('');
      setNewRecipientType(RecipientType.individual);
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to approve recipient';
      toast.error(errorMessage);
      console.error('Add approved recipient error:', error);
    }
  };

  // Handle remove approved recipient
  const handleRemoveApprovedRecipient = async (phoneNumber: string) => {
    try {
      await removeApprovedRecipientMutation.mutateAsync(phoneNumber);
      toast.success('Recipient removed from approved list');
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to remove recipient';
      toast.error(errorMessage);
      console.error('Remove approved recipient error:', error);
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const totalMessages = messages.length;
    const sentMessages = messages.filter(m => m.sender === '7709446589').length;
    const receivedMessages = messages.filter(m => m.recipient === '7709446589').length;
    const uniqueContacts = contacts.length;

    return {
      totalMessages,
      sentMessages,
      receivedMessages,
      uniqueContacts,
    };
  }, [messages, contacts]);

  // Determine connection status
  const isConnected = integrationStatus === 'Connected';
  const isTokenValid = tokenStatus === 'Valid';
  const hasPhoneNumber = phoneNumberStatus?.hasAnyNumberAttached ?? false;

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <SEO
          title="WhatsApp Messaging Dashboard"
          description="WhatsApp messaging dashboard for PB Partner Hub - Login required"
          canonical="/whatsapp"
        />
        <section className="py-20 md:py-28 min-h-[80vh] flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <LogIn className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              <CardDescription>
                Please log in with your admin credentials to access the WhatsApp dashboard.
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
          title="WhatsApp Messaging Dashboard"
          description="WhatsApp messaging dashboard for PB Partner Hub"
          canonical="/whatsapp"
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
          title="WhatsApp Messaging Dashboard"
          description="WhatsApp messaging dashboard for PB Partner Hub - Access Denied"
          canonical="/whatsapp"
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
        title="WhatsApp Messaging Dashboard"
        description="Manage WhatsApp messages and partner communications at PB Partner Hub."
        canonical="/whatsapp"
      />

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-2">
                WhatsApp <span className="text-primary">Messaging</span>
              </h1>
              <p className="text-muted-foreground">
                Manage partner communications and automated messages
              </p>
            </div>
            <img
              src="/assets/generated/whatsapp-dashboard.dim_800x600.png"
              alt="WhatsApp dashboard"
              className="hidden md:block h-24 w-24 rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Live Deployment Check Panel */}
      <section className="py-6 md:py-8">
        <div className="container">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  <CardTitle>Live Deployment Check</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => refetchHealth()}
                  disabled={healthLoading}
                  title="Refresh deployment status"
                >
                  <RefreshCw className={`h-4 w-4 ${healthLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              <CardDescription>
                Backend version and deployment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {healthLoading ? (
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Checking backend status...</span>
                </div>
              ) : healthError ? (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Health Check Failed</AlertTitle>
                  <AlertDescription className="space-y-2">
                    <p className="text-sm">
                      Unable to reach the backend health endpoint. The deployment may be in progress or the endpoint is unavailable.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Error: {healthError instanceof Error ? healthError.message : 'Unknown error'}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetchHealth()}
                      className="mt-3"
                    >
                      <RefreshCw className="h-3 w-3 mr-2" />
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : backendHealth ? (
                <div className="space-y-3">
                  <div className="flex items-start justify-between p-4 border rounded-lg bg-muted/30">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Backend Online</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Version</p>
                          <Badge variant="outline" className="font-mono">
                            {backendHealth.version}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Deployed</p>
                          <Badge variant="secondary" className="font-mono">
                            {backendHealth.timestamp}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <Badge 
                          variant={backendHealth.status.toLowerCase() === 'ok' ? 'outline' : 'destructive'}
                          className={backendHealth.status.toLowerCase() === 'ok' ? 'border-green-500 text-green-600' : ''}
                        >
                          {backendHealth.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last checked: {new Date().toLocaleTimeString('en-IN')} • Auto-refreshes every 60 seconds
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Approved Recipients Management Panel */}
      <section className="py-6 md:py-8">
        <div className="container">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  <CardTitle>Approved Recipients</CardTitle>
                </div>
                <Dialog open={approvedRecipientsOpen} onOpenChange={setApprovedRecipientsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Recipient
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Approved Recipient</DialogTitle>
                      <DialogDescription>
                        Add a phone number to the approved recipients list to enable Meta API messaging.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipientPhone">Phone Number</Label>
                        <Input
                          id="recipientPhone"
                          placeholder="e.g., 9168761915"
                          value={newRecipientPhone}
                          onChange={(e) => setNewRecipientPhone(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter the phone number without country code prefix
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipientType">Recipient Type</Label>
                        <Select
                          value={newRecipientType}
                          onValueChange={(value) => setNewRecipientType(value as RecipientType)}
                        >
                          <SelectTrigger id="recipientType">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={RecipientType.individual}>Individual</SelectItem>
                            <SelectItem value={RecipientType.corporateClient}>Corporate Client</SelectItem>
                            <SelectItem value={RecipientType.teamMember}>Team Member</SelectItem>
                            <SelectItem value={RecipientType.representative}>Representative</SelectItem>
                            <SelectItem value={RecipientType.automatedSystem}>Automated System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipientDescription">Description (Optional)</Label>
                        <Input
                          id="recipientDescription"
                          placeholder="e.g., Admin's WhatsApp number"
                          value={newRecipientDescription}
                          onChange={(e) => setNewRecipientDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setApprovedRecipientsOpen(false);
                          setNewRecipientPhone('');
                          setNewRecipientDescription('');
                          setNewRecipientType(RecipientType.individual);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddApprovedRecipient}
                        disabled={addApprovedRecipientMutation.isPending}
                      >
                        {addApprovedRecipientMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          'Add Recipient'
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                Manage approved phone numbers for Meta API messaging
              </CardDescription>
            </CardHeader>
            <CardContent>
              {approvedRecipientsLoading ? (
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Loading approved recipients...</span>
                </div>
              ) : approvedRecipients.length === 0 ? (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No Approved Recipients</AlertTitle>
                  <AlertDescription>
                    Add phone numbers to the approved list to enable Meta API messaging. Click "Add Recipient" to get started.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  {approvedRecipients.map((recipient) => (
                    <div
                      key={recipient.phoneNumber}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{recipient.phoneNumber}</span>
                          <Badge variant="outline" className="text-xs">
                            {recipient.recipientType}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{recipient.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveApprovedRecipient(recipient.phoneNumber)}
                        disabled={removeApprovedRecipientMutation.isPending}
                        title="Remove from approved list"
                      >
                        {removeApprovedRecipientMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-destructive" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integration Checklist Panel */}
      <section className="py-6 md:py-8">
        <div className="container">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                WhatsApp Integration Checklist
              </CardTitle>
              <CardDescription>
                Verify your Meta Business API configuration and webhook setup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Callback URL */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Callback URL</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Use this URL in your Meta Developer Console webhook configuration
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    https://pbpartnershub.in/api/webhook
                  </code>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard('https://pbpartnershub.in/api/webhook', 'Callback URL')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              {/* Verify Token */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Verify Token</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Enter this token in the Meta Developer Console webhook verification field
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    pbpartnershub
                  </code>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard('pbpartnershub', 'Verify Token')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <Separator />

              {/* Phone Number Status */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">Phone Numbers Attached</span>
                  </div>
                  {phoneNumberStatusLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : hasPhoneNumber ? (
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Ready
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="h-3 w-3 mr-1" />
                      Not Ready
                    </Badge>
                  )}
                </div>

                {phoneNumberStatusLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Checking phone number status...
                  </p>
                ) : phoneNumberStatus ? (
                  <>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-2xl font-bold">{Number(phoneNumberStatus.totalNumbers)}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-2xl font-bold">{Number(phoneNumberStatus.productionNumbers)}</div>
                        <div className="text-xs text-muted-foreground">Production</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-2xl font-bold">{Number(phoneNumberStatus.testNumbers)}</div>
                        <div className="text-xs text-muted-foreground">Test</div>
                      </div>
                    </div>

                    {!hasPhoneNumber ? (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Action Required: Attach a Phone Number</AlertTitle>
                        <AlertDescription className="space-y-2 mt-2">
                          <p className="text-sm">
                            Your webhook verification will remain pending until you attach at least one phone number to your WhatsApp Business Account.
                          </p>
                          <div className="text-sm space-y-1 mt-3">
                            <p className="font-medium">Steps to attach a phone number:</p>
                            <ol className="list-decimal list-inside space-y-1 ml-2">
                              <li>Go to Meta Developer Console → WhatsApp → Configuration</li>
                              <li>Click "Manage phone numbers"</li>
                              <li>Add a test number (fastest) or production number</li>
                              <li>Complete OTP verification for the number</li>
                              <li>Return to Webhook section and click "Verify and Save"</li>
                            </ol>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3"
                            onClick={() => window.open('https://developers.facebook.com/apps', '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-2" />
                            Open Meta Developer Console
                          </Button>
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert className="border-green-500/50 bg-green-500/10">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-600">Phone Number Attached</AlertTitle>
                        <AlertDescription className="text-green-600/80">
                          Your WhatsApp Business Account has {Number(phoneNumberStatus.totalNumbers)} phone number(s) attached. 
                          You can now verify your webhook in the Meta Developer Console.
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                ) : (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Unable to fetch phone number status. Please check your Meta API credentials.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Connection Status Alert */}
      <section className="py-4 md:py-6">
        <div className="container">
          {statusLoading || tokenStatusLoading ? (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertTitle>Checking connection status...</AlertTitle>
              <AlertDescription>
                Please wait while we verify your WhatsApp API connection.
              </AlertDescription>
            </Alert>
          ) : !isConnected ? (
            <Alert variant="destructive">
              <WifiOff className="h-4 w-4" />
              <AlertTitle>Not Connected</AlertTitle>
              <AlertDescription>
                WhatsApp API is not connected. Please configure your Meta Business API credentials in settings.
              </AlertDescription>
            </Alert>
          ) : !isTokenValid ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Token Expired</AlertTitle>
              <AlertDescription>
                Your Meta API access token has expired. Please update your credentials in settings to continue sending messages.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Connected</AlertTitle>
              <AlertDescription className="text-green-600/80">
                WhatsApp API is connected and ready to send messages. Token is valid.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalMessages}</div>
                <p className="text-xs text-muted-foreground">All conversations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sent Messages</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.sentMessages}</div>
                <p className="text-xs text-muted-foreground">Outgoing messages</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Received Messages</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.receivedMessages}</div>
                <p className="text-xs text-muted-foreground">Incoming messages</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Status</CardTitle>
                {isConnected && isTokenValid ? (
                  <Wifi className="h-4 w-4 text-green-600" />
                ) : (
                  <WifiOff className="h-4 w-4 text-destructive" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isConnected && isTokenValid ? (
                    <Badge variant="outline" className="border-green-500 text-green-600">Connected</Badge>
                  ) : (
                    <Badge variant="destructive">Disconnected</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {isConnected && isTokenValid ? 'Ready to send' : 'Check settings'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Messaging Interface */}
      <section className="py-8 md:py-12 pb-20">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
            {/* Contacts Sidebar */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Contacts</CardTitle>
                  <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>WhatsApp API Settings</DialogTitle>
                        <DialogDescription>
                          Configure your Meta Business API credentials for WhatsApp integration.
                        </DialogDescription>
                      </DialogHeader>
                      
                      {/* Current Configuration Info */}
                      {!configLoading && metaApiConfig && (
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertTitle>Current Configuration</AlertTitle>
                          <AlertDescription className="space-y-1 mt-2">
                            <div className="text-sm">
                              <span className="font-medium">Business Account ID:</span>{' '}
                              {metaApiConfig.whatsappBusinessAccountId}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Phone Number ID:</span>{' '}
                              {metaApiConfig.phoneNumberId}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Token Status:</span>{' '}
                              <Badge variant={isTokenValid ? 'outline' : 'destructive'} className="ml-1">
                                {tokenStatus || 'Unknown'}
                              </Badge>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="accessToken">Meta API Access Token</Label>
                          <Input
                            id="accessToken"
                            type="password"
                            placeholder="Enter your Meta API access token"
                            value={accessToken}
                            onChange={(e) => setAccessToken(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Your temporary access token from Meta Business API
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="businessAccountId">WhatsApp Business Account ID</Label>
                          <Input
                            id="businessAccountId"
                            placeholder="Enter your WhatsApp Business Account ID"
                            value={businessAccountId}
                            onChange={(e) => setBusinessAccountId(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Found in your Meta Business Suite settings
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumberId">Phone Number ID</Label>
                          <Input
                            id="phoneNumberId"
                            placeholder="Enter your Phone Number ID"
                            value={phoneNumberId}
                            onChange={(e) => setPhoneNumberId(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            The ID of your WhatsApp Business phone number
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setSettingsOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveSettings}
                          disabled={updateConfigMutation.isPending}
                        >
                          {updateConfigMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            'Save Settings'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  {messagesLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredContacts.length === 0 ? (
                    <div className="text-center py-12 px-4">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        {searchTerm ? 'No contacts found' : 'No conversations yet'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1 p-2">
                      {filteredContacts.map((contact) => (
                        <button
                          key={contact.number}
                          onClick={() => setSelectedContact(contact.number)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedContact === contact.number
                              ? 'bg-primary/10 border border-primary/20'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <span className="font-medium text-sm">{contact.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(contact.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {contact.lastMessage}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card>
              {selectedContact ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {selectedContact}
                          {isSelectedContactApproved && (
                            <Badge variant="outline" className="border-green-500 text-green-600">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Approved
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>WhatsApp conversation</CardDescription>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
                      {selectedMessages.length === 0 ? (
                        <div className="text-center py-12">
                          <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground">
                            No messages yet. Start the conversation!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {selectedMessages.map((msg, index) => {
                            const isOutgoing = msg.sender === '7709446589';
                            const showDate = index === 0 || 
                              formatDate(selectedMessages[index - 1].timestamp) !== formatDate(msg.timestamp);

                            return (
                              <div key={msg.id}>
                                {showDate && (
                                  <div className="flex items-center justify-center my-4">
                                    <Badge variant="secondary" className="text-xs">
                                      {formatDate(msg.timestamp)}
                                    </Badge>
                                  </div>
                                )}
                                <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
                                  <div
                                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                      isOutgoing
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                    }`}
                                  >
                                    <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                                    <div className="flex items-center justify-end gap-1 mt-1">
                                      <span className="text-xs opacity-70">
                                        {formatTime(msg.timestamp)}
                                      </span>
                                      {isOutgoing && (
                                        <span className="opacity-70">
                                          {getStatusIcon(msg.status)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </ScrollArea>
                    <Separator />
                    <div className="p-4">
                      {!isSelectedContactApproved && (
                        <Alert variant="destructive" className="mb-4">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Recipient Not Approved</AlertTitle>
                          <AlertDescription>
                            This phone number is not in the approved recipients list. Meta API messaging is disabled. 
                            Please add this number to the approved list to enable sending.
                          </AlertDescription>
                        </Alert>
                      )}
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Type your message..."
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="min-h-[60px] resize-none"
                        />
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={handleSendMessage}
                            disabled={!messageContent.trim() || sendMessageMutation.isPending}
                            size="icon"
                            title="Send message (stored locally)"
                          >
                            {sendMessageMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            onClick={handleSendViaAPI}
                            disabled={!messageContent.trim() || sendMessageViaAPIMutation.isPending || !isConnected || !isTokenValid || !isSelectedContactApproved}
                            size="icon"
                            variant="outline"
                            title={isSelectedContactApproved ? "Send via Meta API" : "Recipient must be approved first"}
                          >
                            {sendMessageViaAPIMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <MessageCircle className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Press Enter to send, Shift+Enter for new line. Use Meta API button to send via WhatsApp.
                      </p>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-[600px]">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a contact from the list to start messaging
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
