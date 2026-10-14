import "./globals.css";
import "./style/motion.css";
export const metadata = {
  title: "SaqtauAI",
  description:
    "SaqtauAI — HealthTech из Астаны. Наблюдение за самочувствием с помощью камеры смартфона. Узнайте о технологии rPPG и запросите демо.",
  metadataBase: new URL("https://saqtauai.com"),
  openGraph: {
    title: "SaqtauAI — Heart health, in focus",
    description: "Your smartphone camera. A moment for your wellbeing.",
    type: "website",
  },
  icons: { icon: "/logo.svg" },
};
export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
