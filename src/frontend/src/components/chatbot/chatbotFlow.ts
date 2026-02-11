export type ChatbotIntent =
  | 'welcome'
  | 'partner_onboarding'
  | 'insurance_services'
  | 'claims_support'
  | 'contact_team'
  | 'whatsapp_connect';

export interface ChatbotMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export interface ChatbotQuickReply {
  label: string;
  intent: ChatbotIntent;
}

export interface ChatbotFlowNode {
  intent: ChatbotIntent;
  message: string;
  quickReplies?: ChatbotQuickReply[];
  action?: () => void;
}

export const chatbotFlow: Record<ChatbotIntent, ChatbotFlowNode> = {
  welcome: {
    intent: 'welcome',
    message: 'Hello! 👋 Welcome to PB Partners Hub. How can we assist you today?',
    quickReplies: [
      { label: 'Partner Onboarding Help', intent: 'partner_onboarding' },
      { label: 'Insurance Services', intent: 'insurance_services' },
      { label: 'Claims & Support', intent: 'claims_support' },
      { label: 'Contact Team', intent: 'contact_team' },
    ],
  },
  partner_onboarding: {
    intent: 'partner_onboarding',
    message:
      'We help with partner onboarding assistance, policy issuance & process help, documentation guidance, and daily partner query support. Would you like to connect with our team?',
    quickReplies: [
      { label: 'Connect on WhatsApp', intent: 'whatsapp_connect' },
      { label: 'Back to Menu', intent: 'welcome' },
    ],
  },
  insurance_services: {
    intent: 'insurance_services',
    message:
      'We provide support for:\n• Life Insurance\n• Health Insurance\n• Motor Insurance\n• General Insurance\n• Policy Renewal & Servicing\n\nWould you like to know more?',
    quickReplies: [
      { label: 'Connect on WhatsApp', intent: 'whatsapp_connect' },
      { label: 'Back to Menu', intent: 'welcome' },
    ],
  },
  claims_support: {
    intent: 'claims_support',
    message:
      'Our team provides complete claims & service coordination support. We can help you with claims processing, documentation, and follow-ups. Would you like to connect with our support team?',
    quickReplies: [
      { label: 'Connect on WhatsApp', intent: 'whatsapp_connect' },
      { label: 'Back to Menu', intent: 'welcome' },
    ],
  },
  contact_team: {
    intent: 'contact_team',
    message:
      'You can reach us at:\n📧 Email: info@pbpartnershub.in\n📞 Mobile: 7972584060\n💬 WhatsApp: 7709446589\n\nWould you like to connect on WhatsApp now?',
    quickReplies: [
      { label: 'Connect on WhatsApp', intent: 'whatsapp_connect' },
      { label: 'Back to Menu', intent: 'welcome' },
    ],
  },
  whatsapp_connect: {
    intent: 'whatsapp_connect',
    message: 'Great! Opening WhatsApp now...',
    quickReplies: [{ label: 'Back to Menu', intent: 'welcome' }],
  },
};
