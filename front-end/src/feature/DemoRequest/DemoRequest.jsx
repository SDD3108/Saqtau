"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Mail,
  LoaderCircle,
} from "lucide-react";
import { Button } from "@/src/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/src/ui/dialog";
import { Input } from "@/src/ui/input";
import { useSiteStore } from "@/src/store/DemoStore/demoStore";
import { demoSchema } from "@/src/feature/DemoRequest/demoSchema";
import { requestDemo } from "@/src/utils/api";
export default function DemoForm({ c, locale }) {
  const { demoOpen, setDemoOpen } = useSiteStore();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      consent: form.get("consent") === "on",
      locale,
      website: form.get("website"),
    };
    const valid = demoSchema.safeParse(data);
    if (!valid.success) {
      setError(c.invalid);
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await requestDemo(valid.data);
      setStatus("success");
    } catch {
      setStatus("error");
      setError(c.formError);
    }
  }
  return (
    <Dialog
      open={demoOpen}
      onOpenChange={(open) => {
        setDemoOpen(open);
        if (!open) {
          setStatus("idle");
          setError("");
        }
      }}
    >
      <DialogContent className="demo-dialog">
        <div className="dialog-icon">
          {status === "success" ? <CheckCircle2 /> : <Mail />}
        </div>
        <DialogTitle>
          {status === "success" ? c.success : c.formTitle}
        </DialogTitle>
        <DialogDescription>
          {status === "success" ? c.successText : c.formDesc}
        </DialogDescription>
        {status === "success" ? (
          <Button className="primary-btn" onClick={() => setDemoOpen(false)}>
            {c.done}
            <Check />
          </Button>
        ) : (
          <form onSubmit={submit} className="demo-form">
            <div className="name-fields">
              <label htmlFor="firstName">
                {c.firstName}
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  maxLength={80}
                  required
                  disabled={status === "sending"}
                />
              </label>
              <label htmlFor="lastName">
                {c.lastName}
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  maxLength={80}
                  required
                  disabled={status === "sending"}
                />
              </label>
            </div>
            <label htmlFor="email">
              {c.email}
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={254}
                required
                disabled={status === "sending"}
              />
            </label>
            <div className="honeypot" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="consent">
              <input
                type="checkbox"
                name="consent"
                required
                disabled={status === "sending"}
              />
              <span>{c.consent}</span>
            </label>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="primary-btn w-full"
              disabled={status === "sending"}
            >
              {status === "sending" ? c.sending : c.submit}
              {status === "sending" ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <ArrowUpRight />
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
