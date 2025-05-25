"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function VerificationEmailSent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="mx-auto max-w-md w-full shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pt-6 pb-2">
          <div className="rounded-full bg-blue-100 p-3">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-800">
            Check Your Email
          </h1>
        </CardHeader>

        <CardContent className="text-center px-6 pt-4">
          <div className="mb-6">
            <p className="text-slate-600 mb-4">
              We&apos;ve sent a verification link to your email address. Please
              check your inbox and click the link to verify your account.
            </p>
            <p className="text-slate-600">
              The verification link will expire in 24 hours. If you don&apos;t
              see the email, please check your spam folder.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 px-6 pb-6">
          <div className="text-center text-sm text-slate-500 mt-4">
            <p>
              Already verified?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
