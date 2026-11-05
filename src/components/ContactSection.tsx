"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import api from "../lib/api";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await api.post("/contact", formData);
      setStatus("success");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="wrap contact-section__inner">
        <div className="contact-section__copy">
          <h2>Have a shipment coming in? Let&apos;s get it moving.</h2>
          <p>
            Tell us what you&apos;re importing and where it needs to go. We
            support courier and cargo imports, customs clearance coordination,
            warehousing in Vancouver and Toronto, and Canada-wide last-mile
            delivery. Prefer to talk? Call{" "}
            <a href="tel:+16729683390">(672) 968-3390</a> or{" "}
            <a href="mailto:info@dcwsolution.ca">email our team</a>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
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
            <label htmlFor="contact-service">Service required</label>
            <select
              id="contact-service"
              value={formData.service}
              onChange={(event) =>
                setFormData({ ...formData, service: event.target.value })
              }
            >
              <option value="">Select a service</option>
              <option value="last-mile">Last-Mile Delivery</option>
              <option value="customs">Customs Clearance</option>
              <option value="warehousing">
                Warehousing (Vancouver &amp; Toronto)
              </option>
              <option value="courier">Courier Import Handling</option>
              <option value="cargo">Cargo Import Handling</option>
              <option value="india-canada">India → Canada Door-to-Door</option>
              <option value="other">Other / Not sure</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message">Shipment details</label>
            <textarea
              id="contact-message"
              rows={3}
              required
              value={formData.message}
              onChange={(event) =>
                setFormData({ ...formData, message: event.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="button"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              "Sending..."
            ) : (
              <>
                <Send size={18} aria-hidden="true" /> Request a quote
              </>
            )}
          </button>
          {status === "success" && (
            <p
              className="contact-form__status contact-form__status--success"
              role="status"
            >
              Message sent successfully! We will contact you soon.
            </p>
          )}
          {status === "error" && (
            <p
              className="contact-form__status contact-form__status--error"
              role="alert"
            >
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
