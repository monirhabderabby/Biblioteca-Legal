import { logoSrc } from "@/helper/assets";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import ResetNowForm from "./_components/reset-now-form";

export default async function ResetNowPage({
  params,
}: {
  params: { id: string };
}) {
  const otpId = params.id;
  const exist = await prisma.resetReq.findFirst({
    where: {
      id: otpId,
    },
  });

  if (!exist) {
    toast.warning("OTP Doesn't exist");
    redirect("/reset-request");
  }

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
        <Image src={logoSrc} width={83} height={100} alt="Logo" />
        <div className="mx-auto w-full max-w-md space-y-12">
          {/* Logo */}

          <div className="text-center">
            <h1 className="text-[32px] leading-[120%]  font-semibold text-gray-900">
              Reset <span className="text-primary">password</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your new password
            </p>
          </div>

          {/*  form component */}
          <ResetNowForm otpId={otpId} />
        </div>
      </div>
    </div>
  );
}
