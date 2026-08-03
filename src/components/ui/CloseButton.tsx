/**
 * The chamfered-octagon close control. The outline sits at low opacity until
 * hover, when it comes up to full and the cross turns a quarter turn.
 */
export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close menu"
      className="group focus-ring relative grid h-[60px] w-[60px] place-items-center text-white"
    >
      <svg
        viewBox="0 0 60 60"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M60 47.5 L47.5 60 L12.5 60 L0 47.5 L0 12.5 L12.5 0 L47.5 0 L60 12.5 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="opacity-30 transition-opacity duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-100"
        />
      </svg>

      <svg
        viewBox="0 0 24 24"
        className="relative h-[22px] w-[22px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:rotate-90"
        aria-hidden="true"
      >
        <path
          d="M4 4 L20 20 M20 4 L4 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
