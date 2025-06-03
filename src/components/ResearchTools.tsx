"use client";

import { Gavel, Search } from "lucide-react";
import { useState } from "react";
import { GiWhiteBook } from "react-icons/gi";
import { VscLaw } from "react-icons/vsc";

export default function ResearchTools() {
  const [activeTab, setActiveTab] = useState("legislation");

  const tabContent = {
    legislation: (
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Legislation"
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="space-y-4">
          <p className="text-base text-start font-medium">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Administrative Law
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Criminal Code
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Civil Code
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Commercial Law
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Tax Regulations
            </button>
          </div>
        </div>
      </div>
    ),
    jurisprudence: (
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Jurisprudence"
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="space-y-4">
          <p className="text-base text-start font-medium">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Supreme Court
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Constitutional Cases
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Landmark Decisions
            </button>
          </div>
        </div>
      </div>
    ),
    doctrine: (
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Doctrine"
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="space-y-4">
          <p className="text-base text-start font-medium">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Legal Theory
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Academic Papers
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
              Legal Commentary
            </button>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <section className=" py-16 px-4 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="my-8 text-2xl font-bold text-[#D4AF37] ">
          Research Tools
        </h2>
        <h3 className="my-4 text-2xl font-bold text-[#1E2A38] md:text-[40px]">
          Find Legal Information
        </h3>
        <p className="mb-10 font-medium text-[#1E2A38] md:text-lg">
          Search through our extensive database of legal resources to find the
          information you need.
        </p>

        <div className="relative mx-auto max-w-3xl ">
          {/* Card with shadow effect */}
          <div className="relative z-10 overflow-hidden rounded-xl bg-white p-6 shadow-xl">
            {/* Tabs */}
            <div className="mb-6 flex justify-between border-b overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => setActiveTab("legislation")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2 text-lg font-medium transition-colors md:text-base ${
                  activeTab === "legislation"
                    ? "border-[#0D99FF] text-[#0D99FF]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Gavel className="h-8 w-8" />
                Legislation
              </button>
              <button
                onClick={() => setActiveTab("jurisprudence")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2 text-lg font-medium transition-colors md:text-base ${
                  activeTab === "jurisprudence"
                    ? "border-[#0D99FF] text-[#0D99FF]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <VscLaw className="h-8 w-8" />
                Jurisprudence
              </button>
              <button
                onClick={() => setActiveTab("doctrine")}
                className={`flex  items-center gap-2 border-b-2 px-4 py-2 text-lg font-medium transition-colors md:text-base ${
                  activeTab === "doctrine"
                    ? "border-[#0D99FF] text-[#0D99FF]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <GiWhiteBook className="h-8 w-8" />
                Doctrine
              </button>
            </div>

            {/* Tab Content */}
            <div className="py-4">{tabContent[activeTab]}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
