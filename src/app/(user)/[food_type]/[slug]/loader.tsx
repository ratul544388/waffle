import { CgSpinner } from "react-icons/cg";

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <CgSpinner className="size-10 text-primary animate-spin" />
    </div>
  );
};
