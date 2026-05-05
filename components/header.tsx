"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { SettingsDialog } from "@/components/SettingsDialog"
import { 
  Menu, X, Linkedin, Github, MessageCircle, 
  Home, User, GraduationCap, Briefcase, Cpu, Mail 
} from "lucide-react"

const getNavItems = (t: (key: string) => string) => [
  { label: t("nav.home"), href: "/#home", icon: <Home size={22} /> },
  { label: t("nav.about"), href: "/#about", icon: <User size={22} /> },
  { label: t("nav.education"), href: "/#education", icon: <GraduationCap size={22} /> },
  { label: t("nav.projects"), href: "/#products", icon: <Briefcase size={22} /> },
  { label: t("nav.all_products"), href: "/products", icon: <Briefcase size={22} /> },
  { label: t("nav.skills"), href: "/#skills", icon: <Cpu size={22} /> },
  { label: t("nav.contact"), href: "/#contact", icon: <Mail size={22} /> },
]

export function Header() {
  const { t } = useLanguage()
  const navItems = getNavItems(t)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          background: scrolled || mobileMenuOpen
            ? "var(--glass)"
            : "transparent",
          backdropFilter: scrolled || mobileMenuOpen ? "blur(25px)" : "none",
          borderBottom: (scrolled || mobileMenuOpen) ? "1px solid var(--border)" : "none",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", height: "70px", justifyContent: "space-between" }}>
            {/* Menu Toggle - Now on the left */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "0.5rem 1.1rem",
                borderRadius: "16px",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.03em",
              }}
              className="hover:bg-[rgba(108,99,255,0.2)] hover:border-[#6c63ff]/50 hover:scale-105 active:scale-95"
            >
              <Menu size={18} className="text-[#6c63ff]" />
              <span>{t("nav.menu")}</span>
            </button>

            {/* Quick Actions - Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginRight: "0.5rem" }} className="hidden sm:flex">
                <a href="https://linkedin.com/in/abhishek-chougale-573786268" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted-foreground)" }} className="hover:text-[#0077b5] transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted-foreground)" }} className="hover:text-[var(--foreground)] transition-colors">
                  <Github size={18} />
                </a>
              </div>
              <SettingsDialog />
              <a
                href="#contact"
                className="btn-primary"
                style={{ padding: "0.45rem 1.2rem", fontSize: "0.85rem", borderRadius: "12px" }}
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>
        </div>

        {/* App-Style Navigation Overlay */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--background)",
            backdropFilter: "blur(40px)",
            zIndex: 150,
            display: "flex",
            flexDirection: "column",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
            opacity: mobileMenuOpen ? 1 : 0,
            pointerEvents: mobileMenuOpen ? "all" : "none",
          }}
        >
          {/* Header Area */}
          <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: "80px", padding: "0 1.5rem" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6c63ff", boxShadow: "0 0 10px #6c63ff" }}></div>
                <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--muted-foreground)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("nav.menu")}</span>
             </div>
             <button 
               onClick={() => setMobileMenuOpen(false)}
               style={{ 
                 background: "rgba(255, 255, 255, 0.05)", 
                 border: "1px solid rgba(255, 255, 255, 0.1)", 
                 borderRadius: "50%", 
                 width: "45px",
                 height: "45px",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
                 color: "white",
                 cursor: "pointer",
                 transition: "all 0.3s ease"
               }}
               className="hover:bg-white/10 hover:rotate-90"
             >
               <X size={20} />
             </button>
          </div>

          {/* Grid Layout Section */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(2, 1fr)", 
              gap: "1.25rem", 
              width: "100%", 
              maxWidth: "420px" 
            }}>
              {navItems.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{ 
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    padding: "2rem 1rem",
                    borderRadius: "28px",
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    transform: mobileMenuOpen ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
                    opacity: mobileMenuOpen ? 1 : 0,
                    transitionDelay: `${idx * 0.05}s`,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-[rgba(108,99,255,0.12)] hover:border-[#6c63ff]/40 hover:translate-y-[-8px] active:scale-95 group"
                >
                  <div style={{ 
                    background: "rgba(255, 255, 255, 0.03)", 
                    padding: "0.85rem", 
                    borderRadius: "18px",
                    color: "var(--muted-foreground)",
                    transition: "all 0.3s ease"
                  }} className="group-hover:text-[#6c63ff] group-hover:bg-[#6c63ff]/10">
                    {item.icon}
                  </div>
                  <span style={{ fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.02em" }}>{item.label}</span>
                </a>
              ))}
            </div>
            
            <div style={{ 
              marginTop: "3rem", 
              width: "100%", 
              maxWidth: "420px",
              transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileMenuOpen ? 1 : 0,
              transition: "all 0.5s ease 0.4s"
            }}>
              <a
                href="#contact"
                className="btn-primary"
                style={{ 
                  width: "100%", 
                  justifyContent: "center",
                  fontSize: "1rem",
                  padding: "1.1rem",
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(108, 99, 255, 0.2)"
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.buildSomething")}
              </a>
            </div>

            {/* Bottom Footer / Socials */}
            <div style={{ 
              marginTop: "auto", 
              display: "flex", 
              alignItems: "center",
              gap: "2.5rem",
              paddingBottom: "1rem",
              opacity: mobileMenuOpen ? 0.6 : 0,
              transition: "opacity 0.8s ease 0.6s"
            }}>
                <a href="https://linkedin.com/in/abhishek-chougale-573786268" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                  <Linkedin size={22} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                  <Github size={22} />
                </a>
                <a href="https://wa.me/9325519485" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                  <MessageCircle size={22} />
                </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
