import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n";
import { apiRequest } from "@/lib/queryClient";

const investorFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  company: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type InvestorFormValues = z.infer<typeof investorFormSchema>;

const InvestorForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InvestorFormValues>({
    resolver: zodResolver(investorFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: InvestorFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/investor", data);
      toast({
        title: t("investors.form.success.title"),
        description: t("investors.form.success.message"),
      });
      form.reset();
    } catch (error) {
      toast({
        title: t("investors.form.error.title"),
        description: t("investors.form.error.message"),
        variant: "destructive",
      });
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
              <FormLabel>{t("investors.form.name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("investors.form.namePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("investors.form.company")}</FormLabel>
              <FormControl>
                <Input placeholder={t("investors.form.companyPlaceholder")} {...field} />
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
              <FormLabel>{t("investors.form.email")}</FormLabel>
              <FormControl>
                <Input placeholder={t("investors.form.emailPlaceholder")} {...field} />
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
              <FormLabel>{t("investors.form.message")}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t("investors.form.messagePlaceholder")} 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
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
            {isSubmitting ? t("investors.form.submitting") : t("investors.form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InvestorForm;
