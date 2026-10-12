import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { generatePersonaMetadata } from "@/lib/theme";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import StyledComponentsRegistry from "@/components/ui/StyledComponentsRegistry";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = generatePersonaMetadata("personal");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#FAFAFA] text-[#0F0F0F] font-sans antialiased selection:bg-[#00FFD0] selection:text-[#0F0F0F]">
        <StyledComponentsRegistry>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
