import { Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PremiumBanner() {
  return (
    <Card className="w-full max-w-md border-gradient bg-gradient-to-r from-amber-50 to-yellow-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-center gap-3">
          <Crown className="h-5 w-5 text-amber-600" />
          <p className="text-lg font-semibold text-amber-900">Premium View</p>
        </div>
        <p className="mt-2 text-center text-sm text-amber-700">
          Exclusive access to premium content
        </p>
      </CardContent>
    </Card>
  );
}
