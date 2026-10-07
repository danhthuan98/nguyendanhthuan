import { default as React } from 'react';
type SegmentColor = string;
interface CircularSegmentsProps {
    size?: number;
    colors?: SegmentColor[];
    children?: React.ReactNode;
}
declare const CircularSegments: ({ size, colors, children, }: CircularSegmentsProps) => React.JSX.Element;
export default CircularSegments;
