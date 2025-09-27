"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { cn } from "@/lib/utils";

import { FloatingLabelInput } from "./floation-input";
import { ContactFormData, contactSchema } from "./schema";
import { useTransition } from "react";
import { sendContactEmail } from "./actions/mutation";
import { toast } from "sonner";
import { LoadingSwap } from "@/components/ui/loading-swap";

interface Props {
  initialMessage?: string;
}

export function ContactForm({ initialMessage }: Props) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: initialMessage ?? "",
    },
  });

  function onSubmit(values: ContactFormData) {
    startTransition(async () => {
      const result = await sendContactEmail(values)

      if (result.success) {
        form.reset()
        toast.success('Message send successful', {description: "We'll get back to you soon."})
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex w-full flex-col gap-4 rounded-md bg-card p-4 sm:p-6 lg:col-span-2 lg:p-9")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FloatingLabelInput control={form.control} label="Name" name="name" />

        <FloatingLabelInput control={form.control} label="Email" name="email" type="email" />

        <FloatingLabelInput control={form.control} label="Phone number" name="phone" type="tel" />

        <FloatingLabelInput control={form.control} isTextarea label="Message" name="message" />

        <Button className="w-full" size="lg" type="submit" disabled={isPending}>
          <LoadingSwap isLoading={isPending}>
            
          Send Message
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
