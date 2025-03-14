import { Tooltip } from "antd";
import { Heart, Gem, Box } from "lucide-react";
const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen border-r border-red-400 w-16 flex flex-col items-center gap-4 bg-[#B5132C] p-3">
      {/* Logo */}
      <Tooltip placement="right" title={"Home"}>
        <div className="flex h-12 w-12 items-center border-b border-red-400 justify-center">
          <Box className="h-8 w-8 text-white" />
        </div>
      </Tooltip>
      {/* Main Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-4">
        <Tooltip placement="right" title={"Salar's Workspace"}>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white transition-colors hover:bg-purple-700"
            aria-label="Navigation Item"
          >
            S
          </button>
        </Tooltip>
      </nav>
      {/* Bottom Actions */}
      <div className="flex flex-col gap-4 pb-4">
        {/* Diamond button with hover effect */}
        <div className="relative group">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white transition-all duration-300 group-hover:rounded-l-lg group-hover:rounded-r-none"
            aria-label="Premium Features"
          >
            <Gem className="h-5 w-5" />
          </button>
          {/* Hover expansion */}
          <div className="absolute left-full top-0 h-10 -ml-1 hidden group-hover:flex items-center">
            <div className="h-10 flex items-center bg-emerald-500 text-white whitespace-nowrap rounded-r-lg px-3 font-medium">
              Try Web4x Pro
            </div>
          </div>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:text-zinc-100"
          aria-label="Favorites"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;