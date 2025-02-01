export const Defs = () => {
  return (
    <defs>
      <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
        {/* <!-- Create the shadow based on the rectangle's alpha --> */}
        <feComponentTransfer in="SourceAlpha">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        {/* <!-- Blur the shadow to make it soft --> */}
        <feGaussianBlur stdDeviation="10" result="blurred" />
        {/* <!-- Offset shadow to create the effect of an inner shadow --> */}
        <feOffset dx="0" dy="0" result="offsetBlur" />
        {/* <!-- Flood with shadow color (dark gray or black) --> */}
        <feFlood result="flood" floodColor="black" floodOpacity="0.5" />
        {/* <!-- Composite the shadow inside the alpha of the rectangle --> */}
        <feComposite in2="offsetBlur" operator="in" />
        {/* <!-- Final composite to apply the shadow --> */}
        <feComposite in2="SourceAlpha" operator="in" />
      </filter>

      <linearGradient id="gloss" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style={{ stopColor: "rgb(255,255,255)", stopOpacity: 0 }} />
        <stop offset="100%" style={{ stopColor: "rgb(255,255,255)", stopOpacity: 0.3 }} />
      </linearGradient>

      <linearGradient id="knob1Shadow" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style={{ stopColor: "rgb(0,0,0)", stopOpacity: 0 }} />
        <stop offset="50%" style={{ stopColor: "rgb(0,0,0)", stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: "rgb(0,0,0)", stopOpacity: 0 }} />
      </linearGradient>
      <clipPath id="knob1Clip">
        <circle cx="0" cy="0" r="19" />
      </clipPath>
    </defs>
  )
}
