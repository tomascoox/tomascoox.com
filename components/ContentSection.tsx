import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

interface ContentSectionProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const ContentSection = ({
  title,
  description,
  buttonText = "Learn more",
  onButtonClick,
}: ContentSectionProps) => {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold text-white md:col-span-4">
        {title}
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-8 text-xl text-gray-300 md:text-2xl">
          {description}
        </p>
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="w-full rounded border border-white bg-transparent px-9 py-4 text-xl text-white transition-colors hover:bg-white/10 md:w-fit"
          >
            {buttonText} <FiArrowUpRight className="inline" />
          </button>
        )}
      </div>
    </div>
  );
}; 