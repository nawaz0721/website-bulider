import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SubscriptionPlansModal({ 
  isOpen, 
  onClose, 
  onPlanSelected, // Changed from onPlanSelect
  template
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Choose a Plan for {template?.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Monthly Plan</h3>
            <p className="text-sm text-gray-500 mt-1">$9.99/month</p>
            <Button
              className="w-full mt-4"
              onClick={() => onPlanSelected('monthly')} // Just pass the plan selection
            >
              Select Monthly
            </Button>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Yearly Plan</h3>
            <p className="text-sm text-gray-500 mt-1">$99.99/year (Save 16%)</p>
            <Button
              className="w-full mt-4"
              onClick={() => onPlanSelected('yearly')} // Just pass the plan selection
            >
              Select Yearly
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}