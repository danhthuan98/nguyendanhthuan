/** One decoded video frame, handed to you as a ready-to-use canvas. */
export interface FrameData {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    /** Media time in seconds when available, otherwise a DOMHighResTimeStamp. */
    timestamp: number;
}
export declare const CameraScreen: () => import('react').JSX.Element;
