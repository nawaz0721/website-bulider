// "use client"

// import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"

// function InstallationProgressModal({ isOpen, currentStep }) {
//   const navigate = useNavigate()

//   useEffect(() => {
//     // When all steps are complete (currentStep is 3), navigate to main dashboard
//     if (currentStep === 3) {
//       const timer = setTimeout(() => {
//         navigate("/main-dashboard")
//       }, 1000) // Wait 1 second before redirecting
//       return () => clearTimeout(timer)
//     }
//   }, [currentStep, navigate])

//   if (!isOpen) return null

//   const steps = [
//     { id: 1, title: "Setting up the Hosting", status: currentStep >= 1 ? "active" : "pending" },
//     { id: 2, title: "Installing WordPress", status: currentStep >= 2 ? "active" : "pending" },
//     { id: 3, title: "Finalizing", status: currentStep >= 3 ? "active" : "pending" },
//   ]

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
//         <h2 className="text-2xl font-bold mb-2">
//           A Blank WordPress Website
//           <br />
//           is Being Installed on 10Web Hosting
//         </h2>
//         <p className="text-gray-600 mb-8">Please wait and don't reload the page</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           {/* Cloud Icon */}
//           <div className="flex justify-center">
//             <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
//               <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Installation Steps */}
//           <div className="space-y-4">
//             {steps.map((step) => (
//               <div key={step.id} className="flex items-center gap-4">
//                 <div
//                   className={`
//                   w-8 h-8 rounded-full flex items-center justify-center
//                   ${step.status === "active" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}
//                 `}
//                 >
//                   {step.id}
//                 </div>
//                 <span
//                   className={`
//                   ${step.status === "active" ? "text-blue-600 font-medium" : "text-gray-600"}
//                 `}
//                 >
//                   {step.title}
//                 </span>
//                 {step.status === "active" && (
//                   <div className="ml-auto">
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default InstallationProgressModal

