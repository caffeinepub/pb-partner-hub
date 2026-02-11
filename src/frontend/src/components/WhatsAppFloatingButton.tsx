import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WHATSAPP_CONFIG } from '@/constants/whatsapp';

export default function WhatsAppFloatingButton() {
  const handleClick = () => {
    window.open(WHATSAPP_CONFIG.getWhatsAppUrl('Hello! I would like to know more about PB Partners Hub.'), '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-40 bg-[#25D366] hover:bg-[#20BA5A]"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
}
