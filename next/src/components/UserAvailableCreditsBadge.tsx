"use client";

import { GetAvailableCredits } from "@/actions/billing/getAvailableBalance";
import { useQuery } from "@tanstack/react-query";
import { CoinsIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import CreateCountupWrapper from "./CreateCountupWrapper";

const UserAvailableCreditsBadge = () => {
  const query = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: GetAvailableCredits,
    refetchInterval: 30 * 1000,  // every 30 sec
  });

  return (
    <Link
      href={"/billing"}
      className="w-full flex gap-5 py-3 bg-yellow-100 rounded-lg justify-center items-center hover:bg-gray-100 "
    >
      <CoinsIcon size={40} className="text-yellow-500  rounded" />
      <span className="font-semibold capitalize flex">
        {query?.isLoading && (
          <Loader2Icon className="animate-spin text-blue-500" />
        )}
        {!query?.isLoading && query.data && (
          <CreateCountupWrapper value={query.data} />
        )}
        {!query?.isLoading && query.data === undefined && "--"}
      </span>
    </Link>
  );
};

export default UserAvailableCreditsBadge;
