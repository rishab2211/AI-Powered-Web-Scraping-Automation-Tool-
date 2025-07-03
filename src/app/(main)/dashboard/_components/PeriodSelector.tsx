"use client";
import { Period } from "@/app/types/analytics";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTH_NAMES } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  periods: Period[];
  selectedPeriod: Period;
};

const PeriodSelector = ({ periods, selectedPeriod }: Props) => {
  // searching path param var
  const searchParams = useSearchParams();
  const router = useRouter();

  const setPeriod = (value: string) => {
    // value is something like : 2-2025
    console.log("VALUE: ", value);

    // storing month and year by spliting the string from "-"
    const [month, year] = value.split("-");

    // creating mutable copy of the params to change
    const params = new URLSearchParams(searchParams);

    // setting the params
    params.set("month", month);
    params.set("year", year);

    // pushing the changes in the params to router
    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      // selected value
      value={`${selectedPeriod.month}-${selectedPeriod.year}`}
      onValueChange={setPeriod}
    >
      {/* Trigger */}
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>

      {/* content */}
      <SelectContent>
        {periods.map((period, idx) => (
          <SelectItem value={`${period.month}-${period.year}`} key={idx}>
            {MONTH_NAMES[period.month]}-{period.year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PeriodSelector;