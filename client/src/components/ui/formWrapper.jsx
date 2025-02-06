import { cn } from "@/lib/utils";

const FormWrapper = ({ children, className }) => {
  return (
    <div className={cn("bmain w-full max-w-[30rem] py-5 px-8", className)}>
      {children}
    </div>
  );
};

export default FormWrapper;
