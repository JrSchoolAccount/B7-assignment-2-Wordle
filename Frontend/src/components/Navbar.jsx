import React from "react";

export default function Navbar() {
    return (
        <nav className="relative select-none lg:flex lg:items-stretch w-full mb-5">
  <div className="flex flex-no-shrink items-stretch h-12">
  <a href="/"><img className="w-16 h-16 rounded-full mr-4 ml-1" src="../static/assets/stockPhoto.png" alt="Logo" /></a>
    <a href="/about" className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-gray-200 hover:text-black">About</a>
    <a href="/high-score" className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-gray-200 hover:text-black">High-Score</a>
  </div>
</nav>
    )
}