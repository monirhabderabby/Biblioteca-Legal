import { memo } from "react";

interface Props {
  sectionTitle: string;
  chapterTitle: string;
}

const ArticleHeader = ({ sectionTitle, chapterTitle }: Props) => {
  return (
    <div className="container space-y-[20px] py-[50px]">
      <h1 className="text-black font-bold leading-[120%] text-[25px] md:text-[30px] lg:text-[40px] text-center">
        {sectionTitle}
      </h1>

      <h3 className="text-[22px] md:text-[25px] ld:text-[32px] text-center leading-[120%] font-semibold">
        {chapterTitle}
      </h3>
    </div>
  );
};

export default memo(ArticleHeader);
