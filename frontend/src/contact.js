// Business contact number transcribed from the branded vehicle photograph.
// Confirm it with YouthDrive before publication.
export const CONTACT_PHONE_DISPLAY = '063 190 4941';
export const CONTACT_PHONE_TEL = '+27631904941';
export const WHATSAPP_BASE = 'https://wa.me/27631904941';
export const LEARNER_URL = import.meta.env.VITE_LEARNER_URL || (import.meta.env.DEV ? 'http://localhost:5175/' : '/learn/');
export function whatsappLink(message) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}
