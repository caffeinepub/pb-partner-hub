import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatbotFlow, ChatbotMessage, ChatbotIntent } from './chatbotFlow';
import { WHATSAPP_CONFIG } from '@/constants/whatsapp';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [hasStarted, setHasStarted] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasStarted) {
      const welcomeMessage: ChatbotMessage = {
        id: Date.now().toString(),
        text: chatbotFlow.welcome.message,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setHasStarted(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleQuickReply = (intent: ChatbotIntent) => {
    const flowNode = chatbotFlow[intent];

    if (intent === 'whatsapp_connect') {
      window.open(
        WHATSAPP_CONFIG.getWhatsAppUrl('Hello! I would like to know more about PB Partners Hub.'),
        '_blank'
      );
    }

    const botMessage: ChatbotMessage = {
      id: Date.now().toString(),
      text: flowNode.message,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  const currentIntent = messages.length > 0 ? 'welcome' : 'welcome';
  const currentFlow = chatbotFlow[currentIntent];
  const lastMessage = messages[messages.length - 1];
  const lastIntent = Object.values(chatbotFlow).find((node) => node.message === lastMessage?.text)?.intent || 'welcome';
  const quickReplies = chatbotFlow[lastIntent]?.quickReplies || chatbotFlow.welcome.quickReplies;

  if (!isOpen) {
    return (
      <Button
        onClick={handleOpen}
        size="icon"
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-40"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 left-6 w-[350px] sm:w-[400px] shadow-2xl z-40 border-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-lg font-semibold">PB Partners Hub</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'bot'
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-4 space-y-2">
          {quickReplies?.map((reply) => (
            <Button
              key={reply.intent}
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto py-2 px-3"
              onClick={() => handleQuickReply(reply.intent)}
            >
              {reply.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
