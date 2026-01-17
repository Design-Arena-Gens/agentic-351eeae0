export const metadata = {
  title: 'AI CLI Coder',
  description: 'Minimalistic AI-powered CLI code generator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
