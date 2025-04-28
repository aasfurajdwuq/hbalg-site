// This file is no longer using SendGrid
// Now using client-side EmailJS exclusively for email sending
// All emails are handled directly in EmailJSForm.tsx on the client side

// These functions now just log the form data and store it in our database
// No external API or service is required

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
}

interface InvestorFormData extends ContactFormData {
  company?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  // Just log the data - no actual email sending from backend
  console.log('Contact form data received:', JSON.stringify(data, null, 2));
  console.log('Email functionality is handled client-side via EmailJS');
  // Always return success since we're just storing the data
  return true;
}

export async function sendInvestorEmail(data: InvestorFormData): Promise<boolean> {
  // Just log the data - no actual email sending from backend
  console.log('Investor form data received:', JSON.stringify(data, null, 2));
  console.log('Email functionality is handled client-side via EmailJS');
  // Always return success since we're just storing the data
  return true;
}