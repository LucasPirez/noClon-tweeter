import * as React from "react";

const SvgComponent = (props) => (
  <svg height={21} width={21} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18.5 2.465-8 8.033M13.5 18.5l-3-8.002-7-2.998 15-5z" />
    </g>
  </svg>
);

export default SvgComponent;
