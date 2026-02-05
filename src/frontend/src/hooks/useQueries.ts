import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContactFormSubmission, DocumentType, WhatsAppMessage, MessagePayload, MetaApiResponse, MetaApiConfig, MetaPhoneNumberStatus } from '../backend';
import { ExternalBlob } from '../backend';

// Submit contact form
export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      company: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitContactForm(data.name, data.email, data.phone, data.company, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactFormSubmissions'] });
    },
  });
}

// Upload document
export function useUploadDocument() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      docType: DocumentType;
      fileName: string;
      fileContent: Uint8Array;
    }) => {
      if (!actor) throw new Error('Actor not available');
      // Cast to Uint8Array<ArrayBuffer> to satisfy type requirements
      const bytes = new Uint8Array(data.fileContent.buffer.slice(0)) as Uint8Array<ArrayBuffer>;
      const blob = ExternalBlob.fromBytes(bytes);
      await actor.uploadDocument(data.docType, data.fileName, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submittedDocuments'] });
    },
  });
}

// Get all contact form submissions (admin only)
export function useGetAllContactFormSubmissions() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ContactFormSubmission[]>({
    queryKey: ['contactFormSubmissions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllContactFormSubmissions();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// Check if caller is admin
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// Get all WhatsApp messages (admin only)
export function useGetAllWhatsAppMessages() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WhatsAppMessage[]>({
    queryKey: ['whatsappMessages'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllWhatsAppMessages();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });
}

// Send WhatsApp message (admin only)
export function useSendWhatsAppMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      sender: string;
      recipient: string;
      content: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.sendWhatsAppMessage(data.sender, data.recipient, data.content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsappMessages'] });
    },
  });
}

// Send WhatsApp message via Meta API (admin only)
export function useSendWhatsAppMessageViaAPI() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<MetaApiResponse, Error, MessagePayload>({
    mutationFn: async (payload: MessagePayload) => {
      if (!actor) throw new Error('Actor not available');
      return actor.sendWhatsAppMessageViaAPI(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsappMessages'] });
    },
  });
}

// Get Meta API config (admin only)
export function useGetMetaApiConfig() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MetaApiConfig>({
    queryKey: ['metaApiConfig'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMetaApiConfig();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// Update Meta API config (admin only)
export function useUpdateMetaApiConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: MetaApiConfig) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateMetaApiConfig(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metaApiConfig'] });
      queryClient.invalidateQueries({ queryKey: ['whatsappIntegrationStatus'] });
      queryClient.invalidateQueries({ queryKey: ['whatsappTokenStatus'] });
      queryClient.invalidateQueries({ queryKey: ['phoneNumberStatus'] });
    },
  });
}

// Get WhatsApp integration status (admin only)
export function useGetWhatsAppIntegrationStatus() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<string>({
    queryKey: ['whatsappIntegrationStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getWhatsAppIntegrationStatus();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

// Get WhatsApp token status (admin only)
export function useGetWhatsAppTokenStatus() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<string>({
    queryKey: ['whatsappTokenStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getWhatsAppTokenStatus();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    refetchInterval: 60000, // Refetch every 60 seconds
  });
}

// Get WhatsApp account details (admin only)
export function useGetWhatsAppAccountDetails() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MetaApiConfig | null>({
    queryKey: ['whatsappAccountDetails'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getWhatsAppAccountDetails();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// Get phone number attachment status (admin only)
export function useGetPhoneNumberStatus() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MetaPhoneNumberStatus>({
    queryKey: ['phoneNumberStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.hasAtLeastOnePhoneNumberAttached();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    refetchInterval: 60000, // Refetch every 60 seconds
  });
}

// Backend health check (public endpoint)
export interface BackendHealth {
  version: string;
  timestamp: string;
  status: string;
}

export function useGetBackendHealth() {
  return useQuery<BackendHealth>({
    queryKey: ['backendHealth'],
    queryFn: async () => {
      const response = await fetch('/api/health');
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
      }
      const text = await response.text();
      
      // Parse the plain text response
      // Expected format: "Backend version: X.Y.Z | Deployed: YYYY-MM-DD HH:MM:SS | Status: OK"
      const versionMatch = text.match(/version:\s*([^\|]+)/i);
      const timestampMatch = text.match(/deployed:\s*([^\|]+)/i);
      const statusMatch = text.match(/status:\s*(.+)/i);
      
      return {
        version: versionMatch ? versionMatch[1].trim() : 'Unknown',
        timestamp: timestampMatch ? timestampMatch[1].trim() : 'Unknown',
        status: statusMatch ? statusMatch[1].trim() : 'Unknown',
      };
    },
    retry: 2,
    refetchInterval: 60000, // Refetch every 60 seconds
  });
}
