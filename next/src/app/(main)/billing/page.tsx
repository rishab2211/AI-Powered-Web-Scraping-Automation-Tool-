import { GetAvailableCredits } from "@/actions/billing/getAvailableBalance";
import CreateCountupWrapper from "@/components/CreateCountupWrapper";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CoinsIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreditsPurchase from "./_components/CreditsPurchase";

type Props = {};

const BillingPage = (props: Props) => {
  return (
    <div className="mx-auto p-4 space-y-8 ">
      <h1 className="text-3xl font-bold">Billing</h1>
      <Suspense fallback={<Skeleton className="h-[166px] w-full" />}>
        <BalanceCard />
      </Suspense>
      <CreditsPurchase/>
    </div>
  );
};

export default BillingPage;

async function BalanceCard() {
  const userBalance = await GetAvailableCredits();
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden border-primary/20 shadow-lg flex justify-between flex-col">
      <CardContent className="p-4 relative items-center">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Available Credits</h3>

            <p className="text-4xl font-bold text-primary">
              <CreateCountupWrapper value={userBalance} />
            </p>
          </div>
          <CoinsIcon
            size={120}
            className="text-primary opacity-20 absolute bottom-0 right-0"
          />
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        When your credit balance reaches zero, your workflows will stop working
      </CardFooter>
    </Card>
  );
}
