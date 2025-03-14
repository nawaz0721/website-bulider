import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Select } from "antd";
export default function TalkToSales() {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      {/* Button to Open Modal */}
      <Button
        onClick={() => setIsOpen(true)}
        // className="text-black bg-white hover:text-white hover:bg-black w-full transition-colors text-sm font-medium px-12 "
        variant="outline"
        className="h-8 border-white hover:text-white hover:bg-black bg-white text-black text-sm font-medium px-12 "
      >
        Talk to Sales
      </Button>
      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl p-[0.1px] rounded-lg overflow-hidden">
          {/* <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button> */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side */}
            <div className="bg-[#B5132C] text-white p-6 md:p-10 rounded-l-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Get in touch with our team of sales experts
                </DialogTitle>
              </DialogHeader>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="text-green-400" /> Get help evaluating if
                  10Web is right for you
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-400" /> Get an exclusive deal for
                  over 20 websites
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-400" /> Get personalized,
                  continuous support
                </li>
              </ul>
              <div className="mt-6 flex items-center space-x-2 text-sm">
                <span className="font-semibold">Excellent</span>
                <span className="text-green-400">★★★★★</span>
                <span className="text-gray-300">Trustpilot</span>
              </div>
              <div className="flex items-center justify-center mt-44 text-sm text-gray-300 border-t border-red-400 pt-4">
                <h5>
                  *For technical questions and inquiries please contact our 24/7
                  support team via <a>the live chat</a>.
                </h5>
              </div>
            </div>
            {/* Right Side: Form */}
            <div className="bg-white p-6 md:p-10 rounded-r-lg space-y-6">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-12 mb-6">
                  <input
                    className="border p-2 rounded w-full"
                    placeholder="First name*"
                    required
                  />
                  <input
                    className="border p-2 rounded w-full"
                    placeholder="Last name*"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-12">
                  <select className="border p-2 rounded w-full">
                    <option>Pakistan</option>
                  </select>
                  <input
                    className="border p-2 rounded w-full"
                    value="+92"
                    required
                  />
                </div>
                <input
                  className="border p-2 rounded w-full mb-8"
                  placeholder="Email*"
                  required
                />
                <div className="grid grid-cols-2 gap-12 my-8">
                  <Select
                    placeholder="Monthly visits requirments"
                    onChange={handleChange}
                    options={[
                      {
                        value: "Please Select",
                        label: "Please Select",
                        disabled: true,
                      },
                      { value: "under 400K", label: "under 400K" },
                      { value: "400-800K", label: "400-800K" },
                      { value: "800-1600K", label: "800-1600K" },
                      { value: "1600K+", label: "1600K+" },
                    ]}
                    styles={{ height: "48px", padding: "10px" }} // Increased height and padding
                  />
                  <Select
                    placeholder="Storage requirments"
                    onChange={handleChange}
                    options={[
                      {
                        value: "Please Select",
                        label: "Please Select",
                        disabled: true,
                      },
                      { value: "under 100GB", label: "under 100GB" },
                      { value: "100GB", label: "100GB" },
                      { value: "200GB", label: "200GB" },
                      { value: "200+ GB", label: "200+ GB" },
                    ]}
                    styles={{ height: "48px", padding: "10px" }} // Increased height and padding
                  />
                </div>
                <textarea
                  className="border p-2 rounded w-full my-12 text-xs"
                  placeholder="Please let us know any specific requirements, such as RAM, CPU specifications, and number of PHP workers you need.*"
                ></textarea>
                <div className="flex items-center justify-end gap-6 mb-8">
                  <span>Preferred communication method*</span>
                  <div className="flex items-center gap-8">
                    <label className="flex items-center gap-4 text-sm cursor-pointer">
                      <input
                        type="radio"
                        className="cursor-pointer"
                        name="communication"
                      />{" "}
                      Email
                    </label>
                    <label className="flex items-center gap-4 text-sm cursor-pointer">
                      <input
                        type="radio"
                        className="cursor-pointer"
                        name="communication"
                      />{" "}
                      Schedule a call
                    </label>
                  </div>
                </div>
                <Button className="w-full bg-[#B5132C] text-white py-3 hover:bg-red-700">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
