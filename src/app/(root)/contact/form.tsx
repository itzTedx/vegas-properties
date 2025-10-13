"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingSwap } from "@/components/ui/loading-swap";

import { cn } from "@/lib/utils";

import { sendContactEmail } from "./actions/mutation";
import { FloatingLabelInput } from "./floating-input";
import { ContactFormData, contactSchema } from "./schema";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: searchParams.get("message") ?? "",
    },
  });

  function onSubmit(values: ContactFormData) {
    startTransition(async () => {
      const result = await sendContactEmail(values);

      if (result.success) {
        form.reset();
        toast.success("Message send successful", { description: "We'll get back to you soon." });
      }
    });
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

        <Button className="w-full" disabled={isPending} size="lg" type="submit">
          <LoadingSwap isLoading={isPending}>Send Message</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
