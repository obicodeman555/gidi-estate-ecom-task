import { type SVGProps } from "react";

export const ArrowLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16.207 4.293a1 1 0 0 1 0 1.414L9.914 12l6.293 6.293a1 1 0 0 1-1.414 1.414L8.5 13.414a2 2 0 0 1 0-2.828l6.293-6.293a1 1 0 0 1 1.414 0"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
export const ArrowRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.793 19.707a1 1 0 0 1 0-1.414L14.086 12L7.793 5.707a1 1 0 0 1 1.414-1.414l6.293 6.293a2 2 0 0 1 0 2.828l-6.293 6.293a1 1 0 0 1-1.414 0"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const CaretDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.293 7.793a1 1 0 0 1 1.414 0L12 14.086l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 15.5a2 2 0 0 1-2.828 0L4.293 9.207a1 1 0 0 1 0-1.414"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
