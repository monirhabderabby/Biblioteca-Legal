import { logoSrc } from "@/helper/assets";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ResetRequestForm from "./_components/reset-request-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden lg:w-3/5 md:w-1/2 bg-gray-900 lg:block relative">
        <Image
          src="https://files.edgestore.dev/ln9m9j3kr2yibrue/public/_public/a92586cfd664d6c1cb2ae1be58175b3a05502154.jpg"
          alt="Team meeting"
          fill
          className="object-cover"
        />
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 lg:w-1/2 relative">
        <Image
          src={logoSrc}
          width={93}
          height={130}
          alt="Logo"
          className="mb-5"
        />
        <div className="mx-auto w-full max-w-md space-y-10">
          {/* Logo */}

          <div className="text-center">
            <h1 className="text-[32px] leading-[120%]  font-semibold text-gray-900">
              Reset <span className="text-pretty ">password</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive the OTP
            </p>
          </div>

          {/*  form component */}
          <ResetRequestForm />

          <div className="w-full flex justify-center">
            <Link href="/" className="flex items-center gap-x-2 group">
              <MoveLeft />{" "}
              <span className="group-hover:underline">Back to home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
