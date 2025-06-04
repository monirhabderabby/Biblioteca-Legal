import dynamic from "next/dynamic";
const TermsAndConditionContainer = dynamic(
  () => import("./_components/terms-condition-container"),
  {
    ssr: false,
  }
);

const Page = () => {
  return (
    <div>
      <TermsAndConditionContainer />
    </div>
  );
};

export default Page;
