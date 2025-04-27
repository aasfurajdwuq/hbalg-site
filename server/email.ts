import sgMail from '@sendgrid/mail';

// Verify API key configuration
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

// Initialize SendGrid if API key is available
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid API initialized successfully');
} else {
  console.warn('SENDGRID_API_KEY not set - email features will be disabled');
}

// Email address to receive notifications
const RECIPIENT_EMAIL = "support@hbalg.com";

// FROM_EMAIL must be a verified sender in SendGrid
// Using a Gmail-based sender which is more likely to be already verified
const FROM_EMAIL = "xteriorwashers@gmail.com"; // This matches one of the email addresses used in testing

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
  // Validate API key is present before attempting to send
  if (!SENDGRID_API_KEY) {
    console.error('ERROR: Cannot send contact email - SendGrid API key is not configured');
    return false;
  }
  
  try {
    console.log('Attempting to send contact email with data:', JSON.stringify(data));
    
    const msg = {
      to: RECIPIENT_EMAIL,
      from: FROM_EMAIL,
      replyTo: data.email, // Set reply-to as the submitter's email
      subject: `New Contact Form Submission: ${data.subject || 'Contact Request'}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject || 'N/A'}
Message: ${data.message}

--- 
You can reply directly to this email to respond to ${data.name}.
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
<p><strong>Message:</strong> ${data.message}</p>
<hr>
<p><em>You can reply directly to this email to respond to ${data.name}.</em></p>
      `,
    };

    console.log('Prepared email message:', JSON.stringify(msg, null, 2));
    
    // Use a test email to the sender before sending the actual email to verify SendGrid is working
    try {
      console.log('Sending test verification email...');
      await sgMail.send({
        to: FROM_EMAIL,
        from: FROM_EMAIL,
        subject: 'SendGrid Test - DO NOT REPLY',
        text: 'This is a test email to verify SendGrid is working properly.',
        html: '<p>This is a test email to verify SendGrid is working properly.</p>',
      });
      console.log('Test email sent successfully!');
    } catch (testError: any) {
      console.error('Test email failed:', testError);
      if (testError.response) {
        console.error('SendGrid test error details:', testError.response.body);
        
        // Check for common SendGrid errors
        if (testError.code === 403) {
          console.error('SendGrid authorization error. Please check API key permissions.');
        } else if (testError.code === 401) {
          console.error('SendGrid authentication error. API key may be invalid.');
        }
      }
      // Continue anyway - the test might fail but the actual email might still work
    }
    
    const result = await sgMail.send(msg);
    console.log('SendGrid API response:', JSON.stringify(result));
    console.log('Contact email sent successfully to', RECIPIENT_EMAIL);
    return true;
  } catch (error: any) {
    console.error('Error sending contact email:', error);
    
    if (error.response) {
      console.error('SendGrid API error details:', error.response.body);
      
      // Provide detailed error messages for common SendGrid errors
      if (error.code === 403) {
        console.error('Access forbidden. Your SendGrid API key might not have the required permissions.');
      } else if (error.code === 401) {
        console.error('Authentication error. Your SendGrid API key might be invalid.');
      } else if (error.response.body && error.response.body.errors) {
        error.response.body.errors.forEach((err: any) => {
          console.error(`SendGrid error: ${err.message} (${err.field})`);
          
          // Special handling for sender verification errors
          if (err.message && err.message.includes('sender identity')) {
            console.error(`The sender email (${FROM_EMAIL}) is not verified in your SendGrid account.`);
            console.error('Please verify this sender in your SendGrid account or use a different verified sender.');
          }
        });
      }
    }
    
    return false;
  }
}

export async function sendInvestorEmail(data: InvestorFormData): Promise<boolean> {
  // Validate API key is present before attempting to send
  if (!SENDGRID_API_KEY) {
    console.error('ERROR: Cannot send investor email - SendGrid API key is not configured');
    return false;
  }
  
  try {
    console.log('Attempting to send investor email with data:', JSON.stringify(data));
    
    const msg = {
      to: RECIPIENT_EMAIL,
      from: FROM_EMAIL,
      replyTo: data.email, // Set reply-to as the investor's email
      subject: `New Investor Form Submission: ${data.subject || 'Investment Inquiry'}`,
      text: `
Name: ${data.name}
${data.company ? `Company: ${data.company}` : ''}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject || 'Investment Inquiry'}
Message: ${data.message}

--- 
You can reply directly to this email to respond to ${data.name}.
      `,
      html: `
<h2>New Investor Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Subject:</strong> ${data.subject || 'Investment Inquiry'}</p>
<p><strong>Message:</strong> ${data.message}</p>
<hr>
<p><em>You can reply directly to this email to respond to ${data.name}${data.company ? ` from ${data.company}` : ''}.</em></p>
      `,
    };

    console.log('Prepared investor email message:', JSON.stringify(msg, null, 2));
    
    // Skip the test email since we already tested it in the contact email function
    
    const result = await sgMail.send(msg);
    console.log('SendGrid API response for investor email:', JSON.stringify(result));
    console.log('Investor email sent successfully to', RECIPIENT_EMAIL);
    return true;
  } catch (error: any) {
    console.error('Error sending investor email:', error);
    
    if (error.response) {
      console.error('SendGrid API error details for investor email:', error.response.body);
      
      // Provide detailed error messages for common SendGrid errors
      if (error.code === 403) {
        console.error('Access forbidden. Your SendGrid API key might not have the required permissions.');
      } else if (error.code === 401) {
        console.error('Authentication error. Your SendGrid API key might be invalid.');
      } else if (error.response.body && error.response.body.errors) {
        error.response.body.errors.forEach((err: any) => {
          console.error(`SendGrid error: ${err.message} (${err.field})`);
          
          // Special handling for sender verification errors
          if (err.message && err.message.includes('sender identity')) {
            console.error(`The sender email (${FROM_EMAIL}) is not verified in your SendGrid account.`);
            console.error('Please verify this sender in your SendGrid account or use a different verified sender.');
          }
        });
      }
    }
    
    return false;
  }
}