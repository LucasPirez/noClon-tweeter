import * as React from "react";

const SvgComponent = (props) => (
  <svg height={25} width={25} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.499 6.497 3.5 10.499l4 4.001M16.5 10.5h-13" />
    </g>
  </svg>
);

export default SvgComponent;
