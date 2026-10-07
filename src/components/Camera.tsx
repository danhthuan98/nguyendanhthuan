import { useCallback, useEffect, useRef, useState } from "react";
import { Images } from "lucide-react";
import CircularSegments from "./CigularProcess";

type FacingMode = "user" | "environment";

interface VideoFrameMetadata {
  presentationTime: number;
  expectedDisplayTime: number;
  width: number;
  height: number;
  mediaTime: number;
  presentedFrames: number;
  processingDuration?: number;
}

/** One decoded video frame, handed to you as a ready-to-use canvas. */
export interface FrameData {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  /** Media time in seconds when available, otherwise a DOMHighResTimeStamp. */
  timestamp: number;
}

export const CameraScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameHandleRef = useRef<number | null>(null);
  const [facingMode] = useState<FacingMode>("environment");
  const [, setTorchSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [flashPulse] = useState(false);
  const [blades] = useState(false);

  const requestIdRef = useRef(0);

  const colors = [
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
  ];

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const openCamera = useCallback(
    async (mode: FacingMode) => {
      const myRequestId = ++requestIdRef.current;
      setError(null);
      setIsReady(false);

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: mode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 20, max: 20 },
          },
          audio: false,
        });
      } catch (err) {
        if (myRequestId !== requestIdRef.current) return;
        setTorchSupported(false);
        setError(
          err instanceof DOMException && err.name === "NotAllowedError"
            ? "Bạn cần cấp quyền truy cập camera để sử dụng tính năng này."
            : err instanceof DOMException && err.name === "NotReadableError"
              ? "Camera đang được ứng dụng khác sử dụng. Hãy đóng ứng dụng đó rồi thử lại."
              : "Không thể mở camera. Vui lòng kiểm tra thiết bị (và đảm bảo trang đang chạy qua HTTPS hoặc localhost) rồi thử lại.",
        );
        return;
      }

      if (myRequestId !== requestIdRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      stopStream();
      streamRef.current = stream;
      try {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        const [track] = stream.getVideoTracks();
        const caps = track.getCapabilities?.() as
          | (MediaTrackCapabilities & { torch?: boolean })
          | undefined;
        setTorchSupported(Boolean(caps?.torch));
        setIsReady(true);
      } catch {
        if (myRequestId === requestIdRef.current)
          setError("Không thể phát hình ảnh từ camera. Vui lòng thử lại.");
      }
    },
    [stopStream],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    openCamera(facingMode);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      requestIdRef.current++; // invalidate any in-flight request from this effect
      stopStream();
    };
  }, [facingMode, openCamera, stopStream]);

  const startStream = useCallback(
    () => openCamera(facingMode),
    [openCamera, facingMode],
  );

  useEffect(() => {
    if (!isReady) return;
    const video = videoRef.current;
    if (!video) return;

    let rafId: number | null = null;
    let cancelled = false;

    const tick = (now: number, metadata?: VideoFrameMetadata) => {
      if (cancelled) return;

      try {
        if (video.videoWidth > 0) {
          const canvas =
            frameCanvasRef.current ??
            (frameCanvasRef.current = document.createElement("canvas"));
          const MAX_DIM = 512;
          const scale = Math.min(
            1,
            MAX_DIM / Math.max(video.videoWidth, video.videoHeight),
          );
          canvas.width = video.videoWidth * scale;
          canvas.height = video.videoHeight * scale;
          console.log(now);
          console.log(metadata);
        }
      } catch {
        setError("onFrame error, skipping frame");
      } finally {
        scheduleNext();
      }
    };

    const scheduleNext = () => {
      if (cancelled) return;
      if (video.requestVideoFrameCallback) {
        frameHandleRef.current = video.requestVideoFrameCallback(tick);
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    scheduleNext();

    return () => {
      cancelled = true;
      if (video.cancelVideoFrameCallback && frameHandleRef.current != null)
        video.cancelVideoFrameCallback(frameHandleRef.current);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [isReady]);

  return (
    <div className="fixed inset-0 bg-[#0a0a0b] text-neutral-100 flex landscape:flex-row flex-col">
      {/* CAMERA */}
      <div className="relative overflow-hidden bg-black landscape:h-full w-full flex-1">
        <div className="relative overflow-hidden bg-black mx-auto h-full w-full">
          <video
            ref={videoRef}
            playsInline
            muted
            className={`h-full w-full object-cover ${
              facingMode === "user" ? "-scale-x-100" : ""
            }`}
          />

          {/* Aperture */}
          <div
            className={`pointer-events-none absolute inset-0 origin-center bg-black transition-transform duration-200 ease-out ${
              blades ? "scale-y-100" : "scale-y-0"
            }`}
          />

          {/* Flash */}
          <div
            className={`pointer-events-none absolute inset-0 bg-white transition-opacity duration-150 ${
              flashPulse ? "opacity-70" : "opacity-0"
            }`}
          />

          {!isReady && !error && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
              Đang khởi động camera…
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0a0b] px-8 text-center">
              <p className="text-sm text-neutral-300">{error}</p>

              <button
                onClick={startStream}
                className="rounded-full bg-[#f2a93b] px-4 py-2 text-xs font-semibold text-[#241a05]"
              >
                Thử lại
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex shrink-0 items-center justify-between bg-black landscape:h-full landscape:w-18 landscape:flex-col-reverse h-18 w-full flex-row gap-8 portrait:px-6 landscape:py-6">
        {/* Preview */}
        <button
          className="h-12 w-12 flex items-center justify-center shrink-0 overflow-hidden rounded-xl border border-[#647770] bg-white/5 disabled:opacity-30"
          aria-label="Ảnh gần nhất"
        >
          <Images />
        </button>

        {/* Shutter */}
        {/* <button
          onClick={capture}
          disabled={!isReady}
          aria-label="Chụp ảnh"
          className="group relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white/80 disabled:opacity-30"
        >
          <span className="h-12 w-12 rounded-full bg-white transition-transform duration-150 group-active:scale-90" />
        </button> */}

        {/* Vehicle corners */}
        <div className="shrink-0">
          <CircularSegments size={60} colors={colors}>
            {/* <img src={car} alt="car" className="h-8 w-12" /> */}
          </CircularSegments>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
