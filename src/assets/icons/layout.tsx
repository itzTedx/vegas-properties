export const IconMenu = (props: SVGProps) => {
  return (
    <svg {...props} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="2"
          x2="22"
          y1="12"
          y2="12"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="12"
          x2="22"
          y1="5"
          y2="5"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="2"
          x2="12"
          y1="19"
          y2="19"
        />
      </g>
    </svg>
  );
};

export const IconPhone = (props: SVGProps) => {
  return (
    <svg {...props} aria-hidden="true" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor">
        <path
          d="m7.028,8.29l.816-.947c.219-.273.594-.365.914-.223l1.784.728c.345.153.528.533.433.898l-.51,1.553c-.139.425-.545.723-.99.687-2.254-.182-4.279-1.172-5.786-2.68l.005.005c-1.508-1.507-2.498-3.532-2.68-5.786-.036-.446.263-.851.687-.99l1.553-.51c.365-.095.745.089.898.433l.728,1.784c.142.32.051.696-.223.914l-.947.816"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};
