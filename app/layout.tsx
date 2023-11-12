import { Inter } from 'next/font/google'
import { GlobalContextProvider } from '@/contexts/store'
import Header from '../components/header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
      </head>
      <body style={{
        background: "linear-gradient(to right, #3498db, #8e44ad)",
        height: "100vh",
        margin: "0",
        color: "#000"
      }}>
        <GlobalContextProvider>
          <Header />
          {children}
        </GlobalContextProvider>
      </body>
    </html >
  )
}
