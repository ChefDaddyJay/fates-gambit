import { ListSkeleton, CardDetailsSkeleton } from "@/app/ui/skeletons";

export default function Loading() {
    return (
        <div className="flex flex-grow p-2 bg-stone-200 shadow h-full overflow-clip">
            <CardDetailsSkeleton />
            <ListSkeleton />
        </div>
    );
}