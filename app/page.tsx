import DrawingCanvas from "./drawing-canvas";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-1 items-center justify-items-center min-h-screen">
      <DrawingCanvas></DrawingCanvas>
    </div>
  );
}
