import { logoSrc } from "@/helper/assets";
import Image from "next/image";
import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden lg:w-3/5 md:w-1/2 bg-gray-900 lg:block relative">
        <Image
          src="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/login%20page%20sidebar.webp"
          alt="Login Page Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 lg:w-1/2 relative">
        <Image
          src={logoSrc}
          width={83}
          height={100}
          alt="Logo"
          className="absolute top-5 md:top-10 "
        />
        <div className="mx-auto w-full max-w-md space-y-10">
          {/* Logo */}

          {/* Welcome text */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome <span>back</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your credentials to continue
            </p>
          </div>

          {/* Login form component */}

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
