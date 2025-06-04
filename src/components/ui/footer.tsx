import {
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collections" },
    { name: "Subscriptions", href: "/subscriptions" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Terms & Condition", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "WhatsApp", icon: MessageCircle, href: "https://whatsapp.com" },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/white%20logo.webp"
                height={100}
                width={100}
                alt="Logo"
              />
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Your comprehensive virtual legal library with access to laws,
              decrees, and legal documents.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <a
                href="mailto:rrivera@bibliotecalegalthn.com"
                className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
              >
                rrivera@bibliotecalegalthn.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <p className="text-center text-slate-400 text-sm">
            © 2025 BIBLIOTECA LEGAL All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
