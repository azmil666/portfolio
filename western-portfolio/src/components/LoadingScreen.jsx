import { Html, useProgress } from "@react-three/drei";

export default function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div style={{
        color: "#f0d080",
        fontFamily: "Cinzel, serif",
        fontSize: "18px",
        textAlign: "center"
      }}>
        <div>Loading Town...</div>
        <div style={{ marginTop: "10px" }}>
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}