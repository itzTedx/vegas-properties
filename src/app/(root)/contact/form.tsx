"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { cn } from "@/lib/utils";

import { FloatingLabelInput } from "./floation-input";
import { ContactFormData, contactSchema } from "./schema";

interface Props {
  initialMessage?: string;
}

export function ContactForm({ initialMessage }: Props) {
  console.log("message", initialMessage);
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
    console.log(values);
    // TODO: Implement form submission
  }

  return (
    <Form {...form}>
      <form
        className={cn("col-span-2 flex w-full flex-col gap-4 rounded-md bg-card p-9")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FloatingLabelInput control={form.control} label="Name" name="name" />

        <FloatingLabelInput control={form.control} label="Email" name="email" type="email" />

        <FloatingLabelInput control={form.control} label="Phone number" name="phone" type="tel" />

        <FloatingLabelInput control={form.control} isTextarea label="Message" name="message" />

        <Button className="w-full" size="lg" type="submit">
          Send Message
        </Button>
      </form>
    </Form>
  );
}
