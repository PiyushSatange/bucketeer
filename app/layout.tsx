"use client";
import SignInPage from "@/pages/signIn";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  SignUp,
} from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <SignedOut>
              <SignInPage />
            </SignedOut>
            <SignedIn>{children}</SignedIn>
          </header>
        </body>
      </html>
    </ClerkProvider>
  );
}
