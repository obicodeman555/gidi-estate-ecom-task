"use client";
import { CaretDown } from "@/assets/svgs";
import { useState, useEffect, useRef } from "react";

export const CustomDropdown = ({
  options = [],
  selected,
  onSelect,
  placeholder,
}: {
  options: { id: string; name: string }[];
  selected?: { id: string; name: string } | null;
  onSelect?: (option: { id: string; name: string }) => void;
  placeholder: string;
  isLoading?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full relative" ref={dropdownRef}>
      <button
        type="button"
        className="w-full h-[46px] flex items-center justify-between bg-[#f4f2ff] rounded-[8px] px-[16px] text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span> {selected ? selected.name : placeholder}</span>
        <CaretDown className={isOpen ? "caret_up" : "caret_down"} />
      </button>
      {isOpen && (
        <div className="z-[999] rounded-b-[8px] top-[2.55rem] overflow-y-scroll flex flex-col h-[300px] absolute bg-white w-full p-[16px] border border-solid border-[#d0d5dd]">
          <input
            type="text"
            className="bg-stone-100 py-[10px] px-[20px] border border-solid border-transparent rounded-full mb-[20px]"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredOptions.map((option) => (
            <button
              key={option.id}
              className="text-left font-bold text-sm py-[8px] px-[16px] rounded-[4px] hover:bg-[#1018280d]"
              type="button"
              onClick={() => {
                onSelect?.(option);
                setIsOpen(false);
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
