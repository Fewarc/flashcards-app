import { cn } from "@/lib/utils";
import { LoaderCircle, type LucideProps } from "lucide-react";

interface SpinnerLoaderProps extends LucideProps {
  className?: string;
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({ size, className }) => {
  return <LoaderCircle className={cn("animate-spin", className)} size={size} />;
};

export default SpinnerLoader;
