import { CircularProgress } from "@heroui/react";

function LoadScreen() {
  return (
    <>
      <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <CircularProgress aria-label="Loading..." />
      </div>
    </>
  );
}

export default LoadScreen;
