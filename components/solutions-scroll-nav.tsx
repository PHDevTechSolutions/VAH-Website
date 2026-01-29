"use client";

import React, { useEffect, useState } from "react";
import {
  Hammer,
  ShieldCheck,
  Paintbrush,
  LifeBuoy,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  index: number;
}

interface Group {
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

interface SolutionsScrollNavProps {
  solutions: { index: number; title: string }[];
}

export const SolutionsScrollNav = ({ solutions }: SolutionsScrollNavProps) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeTitle, setActiveTitle] = useState<string>("");

  // Helper to create a URL-friendly slug (Matches the Grid ID)
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

  useEffect(() => {
    const buildGroups: Group[] = [
      {
        label: "BUILD",
        icon: <Hammer className="w-4 h-4" />,
        items: solutions.filter((s) => [1, 2, 3, 5, 9].includes(s.index)),
      },
      {
        label: "PROTECT",
        icon: <ShieldCheck className="w-4 h-4" />,
        items: solutions.filter((s) => [4, 7, 8].includes(s.index)),
      },
      {
        label: "FINISH",
        icon: <Paintbrush className="w-4 h-4" />,
        items: solutions.filter((s) => [6, 10].includes(s.index)),
      },
      {
        label: "REPAIR",
        icon: <LifeBuoy className="w-4 h-4" />,
        items: solutions.filter((s) =>
          s.title.toLowerCase().includes("cleaning"),
        ),
      },
    ];
    setGroups(buildGroups);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = solutions.find(
              (s) => slugify(s.title) === entry.target.id,
            );
            if (matched) {
              setActiveTitle(matched.title);
              // Sync Search Bar URL on scroll
              window.history.replaceState(
                null,
                "",
                `#${slugify(matched.title)}`,
              );
              document.title = `${matched.title} | Buildchem Solutions`;
            }
          }
        });
      },
      { threshold: 0.4, rootMargin: "-20% 0px -50% 0px" },
    );

    solutions.forEach((s) => {
      const el = document.getElementById(slugify(s.title));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [solutions]);

  const handleScrollTo = (title: string) => {
    const slug = slugify(title);
    const el = document.getElementById(slug);
    if (el) {
      const offset = 100; // Height of main site header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;

      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: "smooth",
      });

      // Update URL immediately upon click
      window.history.pushState(null, "", `/solutions/${slug}`);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {groups.map((group) => (
            <div key={group.label} className="group/col">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn(
                    "p-2 rounded-xl transition-all duration-300",
                    group.items.some((i) => i.title === activeTitle)
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-blue-50 text-blue-600",
                  )}
                >
                  {group.icon}
                </div>
                <h4 className="text-[11px] font-black tracking-[0.25em] text-gray-400 uppercase">
                  {group.label}
                </h4>
              </div>

              <ul className="space-y-3">
                {group.items.map((item) => {
                  const isActive = activeTitle === item.title;
                  return (
                    <li key={item.index}>
                      <button
                        onClick={() => handleScrollTo(item.title)}
                        className={cn(
                          "text-left text-[14px] leading-snug transition-all duration-200 flex items-start group/btn",
                          isActive
                            ? "text-blue-600 font-bold translate-x-1"
                            : "text-gray-500 hover:text-gray-900",
                        )}
                      >
                        <ChevronRight
                          className={cn(
                            "w-3.5 h-3.5 mt-0.5 mr-1.5 transition-all",
                            isActive
                              ? "opacity-100"
                              : "opacity-0 -translate-x-2 group-hover/btn:opacity-50 group-hover/btn:translate-x-0",
                          )}
                        />
                        <span>{item.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
