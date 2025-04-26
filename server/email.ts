import sgMail from '@sendgrid/mail';

// Set the API key
if (!process.env.SENDGRID_API_KEY) {
  console.error("SENDGRID_API_KEY environment variable is not set!");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Email address to receive notifications
const RECIPIENT_EMAIL = "kwph123@aol.com";
const FROM_EMAIL = "noreply@harvestbrothers.com";

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
  try {
    const msg = {
      to: RECIPIENT_EMAIL,
      from: FROM_EMAIL,
      subject: `New Contact Form Submission: ${data.subject || 'Contact Request'}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Message: ${data.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Message:</strong> ${data.message}</p>
      `,
    };

    await sgMail.send(msg);
    console.log('Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
}

export async function sendInvestorEmail(data: InvestorFormData): Promise<boolean> {
  try {
    const msg = {
      to: RECIPIENT_EMAIL,
      from: FROM_EMAIL,
      subject: `New Investor Form Submission: ${data.subject}`,
      text: `
Name: ${data.name}
${data.company ? `Company: ${data.company}` : ''}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}
Message: ${data.message}
      `,
      html: `
<h2>New Investor Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Subject:</strong> ${data.subject}</p>
<p><strong>Message:</strong> ${data.message}</p>
      `,
    };

    await sgMail.send(msg);
    console.log('Investor email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending investor email:', error);
    return false;
  }
}