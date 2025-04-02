import { GetPeriods } from "@/actions/analytics/getPeriods";
import React, { Suspense } from "react";
import PeriodSelector from "./_components/PeriodSelector";
import { Period } from "@/app/types/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { GetStatsCardsValues } from "@/actions/analytics/getStatsCardsValues";
import { auth } from "@clerk/nextjs/server";
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from "lucide-react";
import StatCard from "./_components/StatCard";

const page = async ({
  searchParams,
}: {
  searchParams: { month?: string; year?: string };
}) => {
  const searchParamsData = await searchParams;
  const currentDate = new Date();
  const { month, year } = searchParamsData;
  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };
  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex justify-between">
        <div className="text-3xl font-bold">Home</div>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <Suspense fallback={<StatsCardSkeleton />}>
        <StatsCards selectedPeriod={period} />
      </Suspense>
    </div>
  );
};

export default page;

const PeriodSelectorWrapper = async ({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) => {
  const periods = await GetPeriods();
  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
};

const StatsCards = async ({ selectedPeriod }: { selectedPeriod: Period }) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const data = await GetStatsCardsValues(selectedPeriod);
  return (
    <div className="grid gap-4 lg:gap-8 lg:grid-cols-3 min-h-[120px">
      <StatCard
        title="Workflow executions"
        value={data.workflowExecutions}
        icon={CirclePlayIcon}
      />
      <StatCard
        title="Credits Consumed"
        value={data.creditsConsumed}
        icon={CoinsIcon}
      />
      <StatCard
        title="Phase executions"
        value={data.workflowExecutions}
        icon={WaypointsIcon}
      />
    </div>
  );
};

function StatsCardSkeleton() {
  return (
    <div className="grid gap-4 lg:gap-8 lg:grid-cols-3 min-h-[120px ">
      {[1, 2, 3].map((_, index) => (
        <Skeleton key={index} className="w-full h-[120px]" />
      ))}
    </div>
  );
}
