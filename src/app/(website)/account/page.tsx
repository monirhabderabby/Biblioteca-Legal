import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
const ChangePasswordForm = dynamic(
  () => import("./_components/password-reset/password-reset-form"),
  {
    ssr: false,
  }
);
const ProfileForm = dynamic(() => import("./_components/profile-form"), {
  ssr: false,
});

const Page = async () => {
  const cu = await auth();
  if (!cu?.user.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: {
      id: cu.user.id,
    },
  });

  if (!user) redirect("/login");
  return (
    <div className="space-y-20">
      <ProfileForm user={user} />

      <ChangePasswordForm />
    </div>
  );
};

export default Page;
