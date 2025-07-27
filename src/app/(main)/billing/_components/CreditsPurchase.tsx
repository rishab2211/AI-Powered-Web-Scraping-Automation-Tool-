"use client";

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
import { AlertCircle, Badge, CheckCircle, Coins, CoinsIcon, CreditCard, Sparkles, Zap } from "lucide-react";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";


export const CreditsPurchase: React.FC = () => {
  const [selectedPack, setSelectedPack] = React.useState<PackId>(PackId.MEDIUM);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
    
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      if (Math.random() > 0.3) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error("Payment processing failed. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPackData = CreditsPack.find(pack => pack.id === selectedPack);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Coins className="w-6 h-6 text-blue-600" />
          </div>
          Purchase Credits
        </CardTitle>
        <CardDescription className="text-base">
          Choose the perfect credit pack for your automation needs. All purchases are instant and secure.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <RadioGroup
          onValueChange={(value) => setSelectedPack(value as PackId)}
          value={selectedPack}
          className="space-y-3"
        >
          {CreditsPack.map((pack) => (
            <div
              key={pack.id}
              className={`relative flex items-center space-x-4 rounded-xl p-4 border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedPack === pack.id
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              }`}
              onClick={() => setSelectedPack(pack.id)}
            >
              {pack.popular && (
                <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Most Popular
                </Badge>
              )}
              
              <RadioGroupItem value={pack.id} id={pack.id} className="mt-1" />
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor={pack.id} className="text-lg font-semibold cursor-pointer">
                    {pack.name}
                  </Label>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-neutral-900">
                      {pack.price === 0 ? "Free" : `${pack.price}`}
                    </div>
                    {pack.bonus > 0 && (
                      <div className="text-sm text-emerald-600 font-medium">
                        +{pack.bonus.toLocaleString()} bonus credits
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">{pack.label}</span>
                  {pack.credits < 999999 && (
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <Zap className="w-4 h-4" />
                      {pack.price === 0 ? "Free" : `${(pack.price / pack.credits).toFixed(4)} per credit`}
                    </div>
                  )}
                  {pack.credits >= 999999 && (
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <Sparkles className="w-4 h-4" />
                      Unlimited usage
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>

        {/* Summary Card */}
        {selectedPackData && (
          <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-neutral-900">Purchase Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Credits:</span>
                <span className="font-medium">{selectedPackData.credits.toLocaleString()}</span>
              </div>
              {selectedPackData.bonus && (
                <div className="flex justify-between">
                  <span className="text-neutral-600">Bonus Credits:</span>
                  <span className="font-medium text-emerald-600">+{selectedPackData.bonus.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-neutral-200 pt-2">
                <span className="text-neutral-600">Total Credits:</span>
                <span className="font-bold">
                  {selectedPackData.credits >= 999999 
                    ? "Unlimited" 
                    : (selectedPackData.credits + (selectedPackData.bonus || 0)).toLocaleString()
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Amount:</span>
                <span className="font-bold text-lg">
                  {selectedPackData.price === 0 ? "Free" : `${selectedPackData.price}`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Display */}
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Credits purchased successfully! Your balance has been updated.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      
      <CardFooter className="pt-6">
        <Button 
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={isLoading || selectedPackData?.price === 0}
          onClick={handlePurchase}
        >
          {selectedPackData?.price === 0 ? (
            <>
              <CheckCircle className="mr-2" />
              Already Active - Free Plan
            </>
          ) : isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="mr-2" />
              Purchase {selectedPackData?.credits >= 999999 
                ? "Unlimited Credits" 
                : `${selectedPackData?.credits.toLocaleString()} Credits`}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

