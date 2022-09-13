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
      <path d="M4.5 6.5h12M10.498 10.5h5.997M6.5 14.5h9.995" />
    </g>
  </svg>
);

export default SvgComponent;
