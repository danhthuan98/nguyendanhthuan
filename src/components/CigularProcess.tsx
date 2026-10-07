import React from "react";

type SegmentColor = string;

interface CircularSegmentsProps {
  size?: number;
  colors?: SegmentColor[];
  children?: React.ReactNode;
}

const CircularSegments = ({
  size = 250,
  colors = ["#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#FFF830", "#D9D9D9"],
  children,
}: CircularSegmentsProps) => {
  const strokeWidth = 4;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const segmentCount = 6;
  const gap = 5;
  const segmentCircumference = circumference / segmentCount;
  const segmentLength = segmentCircumference - gap;

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="#3A3A3A"
          stroke="#3A3A3A"
          strokeWidth={strokeWidth}
        />

        {/* 4 segment */}
        {colors.slice(0, segmentCount).map((color, index) => (
          <circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            strokeDasharray={`${segmentLength} ${circumference}`}
            transform={`
              rotate(${index * 60 - 90} ${size / 2} ${size / 2})
            `}
          />
        ))}
      </svg>

      {/* Content */}
      <div className="absolute inset-[18%] flex items-center justify-center rounded-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default CircularSegments;
