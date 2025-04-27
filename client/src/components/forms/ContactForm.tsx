import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n";
import { apiRequest } from "@/lib/queryClient";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    console.log("Submitting form data:", data);
    try {
      const response = await apiRequest("POST", "/api/contact", {
        ...data,
        subject: "General Inquiry" // Add default subject if none provided
      });
      console.log("Server response:", response);
      toast({
        title: t("contact.form.success.title") || "Message Sent!",
        description: t("contact.form.success.message") || "Your message has been sent successfully to our team at kwph123@aol.com",
      });
      form.reset();
    } catch (error: any) {
      console.error("Failed to send email", error);
      
      // Check if there are validation errors
      if (error?.issues?.length) {
        // Handle validation errors
        error.issues.forEach((issue: any) => {
          if (issue.path && issue.path.length > 0) {
            const fieldName = issue.path[0] as keyof ContactFormValues;
            form.setError(fieldName, { 
              type: 'server', 
              message: issue.message 
            });
          }
        });
        
        toast({
          title: "Validation Error",
          description: "Please check the form for errors and try again.",
          variant: "destructive",
        });
      } else {
        // Handle other errors
        toast({
          title: t("contact.form.error.title") || "Message Failed",
          description: error?.message || t("contact.form.error.message") || 
            "There was a problem sending your message. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.form.name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("contact.form.namePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.form.email")}</FormLabel>
              <FormControl>
                <Input placeholder={t("contact.form.emailPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.form.phone") || "Phone Number"}</FormLabel>
              <FormControl>
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <PhoneInput
                      country={'dz'}
                      value={field.value}
                      onChange={field.onChange}
                      inputClass="!w-full !h-10 !pl-[58px] !rounded-md !border !border-input !bg-background !px-3 !py-2 !text-sm !ring-offset-background file:!border-0 file:!bg-transparent file:!text-sm file:!font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50"
                      buttonClass="!border-input !border !rounded-l-md !h-10 !bg-background"
                      dropdownClass="!bg-background !text-foreground"
                      placeholder="Phone Number"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.form.message")}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t("contact.form.messagePlaceholder") || "Please enter your message (minimum 10 characters)"} 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                {t("contact.form.messageHint") || "Please provide at least 10 characters"}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full bg-wheat hover:bg-wheat-dark text-charcoal-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
