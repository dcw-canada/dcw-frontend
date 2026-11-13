"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "react-toastify";
import api from "../lib/api";

const EMPTY_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  _gotcha: "",
};

export default function ContactSection() {
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      // Honeypot – silently succeed for bots
      if (formData._gotcha) {
        setStatus("success");
        return;
      }

      await api.post("/contact", {
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim(),
      });

      setStatus("success");
      toast.success(
        "Thank you! Your inquiry has been sent to our dispatch team.",
      );
      setFormData({ ...EMPTY_FORM });
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Failed to submit inquiry. Please check your connection or call us directly.";
      toast.error(msg);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="wrap contact-section__inner">
        <div className="contact-section__copy">
          <h2>Have a shipment coming in? Let&apos;s get it moving.</h2>
          <p>
            Tell us what you&apos;re importing and where it needs to go.
            <br /> We support courier and cargo imports, customs clearance
            coordination, warehousing in Vancouver and Toronto, and Canada-wide
            last-mile delivery.
            <br /> Prefer to talk? Call{" "}
            <a href="tel:+16729683390">(672) 968-3390</a> <br />
            <span>or email us at : </span>
            <a href="mailto:info@dcwsolution.ca">info@dcwsolution.ca</a>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          {/* Honeypot — hidden from users, catches bots */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={formData._gotcha}
            onChange={(e) =>
              setFormData({ ...formData, _gotcha: e.target.value })
            }
            style={{ position: "absolute", left: "-9999px", opacity: 0 }}
            aria-hidden="true"
          />

          <div className="contact-form__row">
            <div>
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={(event) =>
                  setFormData({ ...formData, company: event.target.value })
                }
              />
            </div>
          </div>
          <div className="contact-form__row">
            <div>
              <label htmlFor="contact-email">Work email</label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="contact-phone">Phone</label>
              <input
                id="contact-phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(event) =>
                  setFormData({ ...formData, phone: event.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-service">Primary service needed</label>
            <select
              id="contact-service"
              value={formData.service}
              onChange={(event) =>
                setFormData({ ...formData, service: event.target.value })
              }
            >
              <option value="">Select a service</option>
              <option value="customs">Customs clearance coordination</option>
              <option value="warehousing">Warehousing &amp; fulfillment</option>
              <option value="freight">Freight forwarding &amp; drayage</option>
              <option value="delivery">
                Courier &amp; final-mile delivery
              </option>
              <option value="all">Full end-to-end import package</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message">Shipment details</label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Origin, port of arrival, volume, special handling or timeline requirements..."
              value={formData.message}
              onChange={(event) =>
                setFormData({ ...formData, message: event.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="button button--full"
            disabled={status === "loading"}
          >
            <Send size={16} />
            {status === "loading" ? "Submitting..." : "Send shipment details"}
          </button>
          {status === "success" && (
            <p className="contact-form__message contact-form__message--success">
              Inquiry sent. Our team will review your shipment details and reach
              out within 1 business day.
            </p>
          )}
          {status === "error" && (
            <p className="contact-form__message contact-form__message--error">
              Could not submit your inquiry. Please try again or call our team
              directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
