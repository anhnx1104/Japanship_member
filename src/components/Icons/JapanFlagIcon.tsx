import { SvgProps } from './types';

const JapanFlagIcon = (props: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      {...props}
    >
      <path
        d="M64 43C64 49.075 60.627 54 54 54H10C3.373 54 0 49.075 0 43V21C0 14.925 3.373 10 10 10H54C60.627 10 64 14.925 64 21V43Z"
        fill="#E6E7E8"
      />
      <path
        d="M43.971 32.5699C43.971 38.8639 38.867 43.9699 32.571 43.9699C26.279 43.9699 21.176 38.8649 21.176 32.5699C21.176 26.2749 26.279 21.1719 32.571 21.1719C38.866 21.1719 43.971 26.2749 43.971 32.5699Z"
        fill="#EC1C24"
      />
    </svg>
  );
};

export default JapanFlagIcon;
