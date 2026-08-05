"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DONATE_FLOW_URL } from "@/lib/site"
import { SegmentRouteLink } from "@/components/segment-route-link"

const navItems = [
  {
    label: "Nosotros",
    href: "#about",
    children: [
      { label: "Nuestra historia", href: "/nuestra-historia" },
      { label: "Nuestros pastores", href: "/nuestros-lideres" },
      { label: "Lo que creemos", href: "/lo-que-creemos" },
    ],
  },
  {
    label: "Segmentos",
    href: "#segmentos",
    children: [
      { label: "Kids", href: "/segmentos/kids" },
      { label: "Teens", href: "/segmentos/teens" },
      { label: "Jóvenes", href: "/segmentos/jovenes" },
      { label: "Escogidas", href: "/segmentos/escogidas" },
      { label: "Red de Hombres", href: "/segmentos/red-hombres" },
      { label: "Raíces", href: "/segmentos/raices" },
    ],
  },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md text-primary-foreground">
      {/* Main Nav */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/alef-clean.webp"
                alt="Logo Somos la Voz"
                fill
                className="object-cover"
              />
            </div>
            <span
              className="text-lg sm:text-xl font-bold tracking-tight text-primary-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Somos la Voz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-foreground border-primary-foreground/10">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        {child.href.startsWith("http") ? (
                          <a
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                          >
                            {child.label}
                          </a>
                        ) : child.href.startsWith("/segmentos/") ? (
                          <SegmentRouteLink
                            href={child.href}
                            className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                          >
                            {child.label}
                          </SegmentRouteLink>
                        ) : (
                          <Link
                            href={child.href}
                            className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                          >
                            {child.label}
                          </Link>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                  {...(item.href.startsWith("http")
                    ? { target: "_blank" as const, rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href={DONATE_FLOW_URL} target="_blank" rel="noopener noreferrer">
                Ofrenda ahora
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-foreground border-t border-primary-foreground/10">
          <div
            className="px-4 py-4 space-y-3"
            style={{
              maxHeight: "calc(100vh - 4rem)",
              overflowY: "auto",
            }}
          >
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2 text-primary-foreground/90 hover:text-primary-foreground font-medium"
                  onClick={() => setIsOpen(false)}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank" as const, rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-2">
                    {item.children.map((child) =>
                      child.href.startsWith("http") ? (
                        <a
                          key={child.label}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-1 text-sm text-primary-foreground/60 hover:text-primary-foreground"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </a>
                      ) : child.href.startsWith("/segmentos/") ? (
                        <SegmentRouteLink
                          key={child.label}
                          href={child.href}
                          className="block py-1 text-sm text-primary-foreground/60 hover:text-primary-foreground"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </SegmentRouteLink>
                      ) : (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block py-1 text-sm text-primary-foreground/60 hover:text-primary-foreground"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href={DONATE_FLOW_URL} target="_blank" rel="noopener noreferrer">
                  Ofrenda ahora
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
