import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <div className="w-full bg-primary py-[60px]">
      <h1 className="text-white font-bold text-[25px] lg:text-[40px] leading-[120%] text-center">
        Ready to Aceess Our Legal Collection?
      </h1>
      <p className="text-white/70 font-medium text-[14px] lg:text-[18px]  leading-[120%] text-center mt-[15px]">
        Join thousands of legal professionals who rely on our comprehensive
        legal library.
      </p>

      <div className="w-full flex justify-center mt-[45px] gap-x-[30px]">
        <Button className="bg-white text-primary hover:bg-white/80 transition-all duration-300">
          Register Now
        </Button>
        <Button
          variant="outline"
          className="bg-transparent text-white border-white hover:bg-white/5 hover:text-white transition-all duration-300"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default CTA;
