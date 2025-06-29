export function SmartCBTLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer circle - represents global reach */}
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" className="text-blue-400" fill="none" />

        {/* Inner hexagon - represents structure and security */}
        <path
          d="M20 6L28.66 11V21L20 26L11.34 21V11L20 6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-300"
          fill="rgba(59, 130, 246, 0.1)"
        />

        {/* Central diamond - represents precision and excellence */}
        <path d="M20 12L24 16L20 20L16 16L20 12Z" fill="currentColor" className="text-blue-400" />

        {/* Three dots - represents multiple choice/testing */}
        <circle cx="13" cy="20" r="1.5" fill="currentColor" className="text-neutral-400" />
        <circle cx="20" cy="28" r="1.5" fill="currentColor" className="text-neutral-400" />
        <circle cx="27" cy="20" r="1.5" fill="currentColor" className="text-neutral-400" />
      </svg>
    </div>
  )
}
