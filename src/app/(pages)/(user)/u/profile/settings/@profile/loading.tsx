import { Skeleton } from "@/components/ui/skeleton";

const LoadingProfileUpdate = () => {
  return (
    <div>
      <Skeleton className="bg-primary/5 h-12 w-[200px] mb-4" />
      <Skeleton className="bg-primary/5 h-8 w-[400px] mb-6" />
      <div className="space-y-4 grid-1">
        <Skeleton className="bg-primary/5 h-10 w-full" />
        <Skeleton className="bg-primary/5 h-10 w-full" />
        <Skeleton className="bg-primary/5 h-10 w-full" />
        <Skeleton className="bg-primary/5 h-10 w-full" />
      </div>
      <div className="mt-6">
        <Skeleton className="bg-primary/5 h-10 w-[200px]" />
      </div>
    </div>
  );
};

export default LoadingProfileUpdate;
