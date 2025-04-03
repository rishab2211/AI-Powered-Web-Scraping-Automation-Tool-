"use client";

import { PurchaseCredits } from "@/actions/billing/purchaseCredits";
import { CreditsPack, PackId } from "@/app/types/billing";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { CoinsIcon, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {};

const CreditsPurchase = (props: Props) => {
  const [selectedPack, setSelectedPack] = useState(PackId.MEDIUM);

  const mutation = useMutation({
    mutationFn: PurchaseCredits,
    onSuccess: () => {},
    onError: () => {},
  });
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-1 items-center">
            <CoinsIcon />
            Purchase Credits
          </CardTitle>
          <CardDescription>
            Select the number of Credits you want to purchase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            onValueChange={(value) => setSelectedPack(value as PackId)}
            value={selectedPack}
          >
            {CreditsPack.map((pack) => (
              <div
                key={pack.id}
                className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-3 hover:bg-secondary"
                onClick={() => setSelectedPack(pack.id)}
              >
                <RadioGroupItem value={pack.id} id={pack.id} />
                <Label
                  htmlFor={pack.id}
                  className="text-md font-semibold flex w-full justify-between cursor-pointer"
                >
                  <span>
                    {pack.name} - {pack.label}
                  </span>
                  <span className="text-green-600">₹{pack.price}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {mutation.isError && (
            <p className="text-red-500 text-sm">
              {mutation.error?.message ||
                "An error occurred. Please try again."}
            </p>
          )}
        </CardContent>
        <CardFooter className="w-full">
          <Button
            className="w-full"
            disabled={mutation.isPending}
            onClick={() => {
              mutation.mutate(selectedPack);
            }}
          >
            <CreditCard /> Purchase Credits
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreditsPurchase;
