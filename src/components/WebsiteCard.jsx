import { MoreVertical, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
const WebsiteCard = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="relative p-0">
        {/* Performance Score */}
        <div className="absolute left-4 top-4 z-10">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <span className="text-sm font-semibold text-green-500">100</span>
          </div>
        </div>
        {/* Action Icons */}
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button className="rounded-full bg-white p-2 hover:bg-gray-100">
            <Eye className="h-4 w-4" />
          </button>
          <button className="rounded-full bg-white p-2 hover:bg-gray-100">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.5 7.5V6.4C21.5 4.1 19.9 2 17.6 2H6.4C4.1 2 2.5 4.1 2.5 6.4v11.2c0 2.3 1.6 4.4 3.9 4.4h11.2c2.3 0 3.9-2.1 3.9-4.4V7.5zM6.4 4h11.2c1.1 0 1.9 1.1 1.9 2.4V7H4.5V6.4C4.5 5.1 5.3 4 6.4 4zM17.6 20H6.4c-1.1 0-1.9-1.1-1.9-2.4V9h15v8.6c0 1.3-.8 2.4-1.9 2.4z" />
            </svg>
          </button>
          <button className="rounded-full bg-white p-2 hover:bg-gray-100">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
        {/* Preview Image */}
        <div className="h-48 bg-gray-200">
          <img
            src="/placeholder.svg?height=192&width=384"
            alt="Website Preview"
            className="h-full w-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Website4x</h3>
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
        </div>
        <a href="#" className="text-sm text-gray-500 hover:underline">
          fit-bengal.10web.me
        </a>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="bg-blue-600 hover:bg-blue-700">Manage</Button>
      </CardFooter>
    </Card>
  );
};
export default WebsiteCard;