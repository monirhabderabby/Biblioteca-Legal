import ContentCard from "./_components/content-card";

const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <ContentCard
        title="Terms and Conditions"
        subtitle="Rules and regulations for using our service"
        description="Understand your rights and responsibilities when using our platform. These terms govern your access to and use of our services."
        href="/dashboard/content/terms-and-condition"
      />
      <ContentCard
        title="Privacy Policy"
        subtitle="How we handle your data"
        description="Learn how we collect, use, and protect your personal information. Your privacy is important to us."
        href="/dashboard/content/privacy-policy"
      />
      <ContentCard
        title="Refund Policy"
        subtitle="Guidelines for refunds and returns"
        description="Find out the criteria and process for requesting refunds. We aim to make the process fair and transparent."
        href="/dashboard/content/refund-policy"
      />
    </div>
  );
};

export default Page;
