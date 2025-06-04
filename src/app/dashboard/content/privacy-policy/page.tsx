import dynamic from "next/dynamic";
const PrivacyPolicyContainer = dynamic(
  () => import("./_components/privacy-policy-container"),
  {
    ssr: false,
  }
);

const Page = () => {
  return (
    <div>
      <PrivacyPolicyContainer />
    </div>
  );
};

export default Page;
