import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Logo />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              FlashFood delivers gourmet experiences from premium restaurants
              directly to your door. Taste excellence, delivered fast.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
              ].map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                  asChild
                >
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                "Browse Restaurants",
                "How It Works",
                "For Business",
                "Careers",
                "Press",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground">Support</h3>
            <ul className="space-y-4">
              {[
                "Help Center",
                "Safety Center",
                "Contact Us",
                "FAQ",
                "Refund Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">
                Stay Updated
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get exclusive deals and restaurant updates
              </p>
              <form className="flex gap-2">
                <Input
                  placeholder="Your email"
                  className="flex-1 bg-background"
                  type="email"
                />
                <Button type="submit" className="whitespace-nowrap">
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} FlashFood Technologies Inc. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-8 border-t border-border">
            {[
              { color: "bg-green-500", text: "Secure Payments" },
              { color: "bg-blue-500", text: "SSL Encrypted" },
              { color: "bg-yellow-500", text: "Verified Partners" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <div
                  className={`w-5 h-5 rounded-full ${badge.color}/20 flex items-center justify-center`}
                >
                  <div className={`w-2 h-2 rounded-full ${badge.color}`} />
                </div>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
