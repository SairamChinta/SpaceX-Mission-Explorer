"use client";

import ThemeToggle from "./ThemeToggle";
import { MdArrowOutward } from "react-icons/md";
import { FaGithubSquare } from "react-icons/fa";
import { FaInternetExplorer } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-row">
            
            <h1 className="text-2xl font-black px-2">SpaceX Mission </h1>
            <FaInternetExplorer size={30}/>
            <h1 className="text-2xl font-black">xplorer</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 dark:text-black">
          <a
            href="https://github.com/SairamChinta/SpaceX-Mission-Explorer"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg flex flex-row items-center px-2 py-1 hover:opacity-90 transition bg-amber-100">
            
            <div className="flex items-center justify-center pr-2">
              <FaGithubSquare size={28} />
            </div>

            <div className="text-xs flex flex-col flex-1">
              <div className="text-xs">Live on Github</div>
              <div className="text-xs font-semibold">SpaceX-Mission-Explorer</div>
            </div>

          
            <div className="flex items-center justify-center">
              <MdArrowOutward />
            </div>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
