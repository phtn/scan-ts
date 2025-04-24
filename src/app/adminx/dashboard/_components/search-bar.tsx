import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search blockchain"
        className="bg-[#1f2937] text-sm rounded-md pl-10 pr-4 py-2 w-80 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-300"
      />
    </div>
  )
}
