export const WHATSAPP_CONFIG = {
  phoneNumber: '7709446589',
  getWhatsAppUrl: (message?: string) => {
    const baseUrl = `https://wa.me/917709446589`;
    if (message) {
      return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
    return baseUrl;
  },
};
