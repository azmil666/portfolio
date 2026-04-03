import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroIntro({ currentSection = 0 }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;
  const groupRef = useRef();
  const textRefs = useRef([]);
  const lines = useMemo(() => [
    { text: "AZMIL MOHAMMED", size: isMobile ? 0.31 : 0.45, y: 0, delay: 0 },
    { text: "Computer Science Student · Year 2", size: isMobile ? 0.17 : 0.22, y: -0.45, delay: 0.25 },
    { text: "Kochi, India", size: isMobile ? 0.14 : 0.18, y: -0.77, delay: 0.5 },
    { text: "I build real projects — turning ideas into usable systems", size: isMobile ? 0.14 : 0.20, y: -1.19, delay: 0.75 }
  ], [isMobile]);

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    const isVisible = currentSection === 0;

    if (isVisible) {
      timeRef.current += delta;
    } else {
      timeRef.current -= delta * 3;
    }

    timeRef.current = THREE.MathUtils.clamp(timeRef.current, 0, 4);

    textRefs.current.forEach((mesh, i) => {
      if (!mesh) return;

      const line = lines[i];
      let progress = (timeRef.current - line.delay) / 1.2;
      progress = THREE.MathUtils.clamp(progress, 0, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      
      mesh.fillOpacity = ease;
      mesh.outlineOpacity = ease * 0.7;
      const scale = THREE.MathUtils.lerp(0.96, 1, ease);
      mesh.scale.setScalar(scale);
      
      
    });
  });

  return (
    <group
      ref={groupRef}
      position={isMobile ? [14, 0.6, -1.4] : [11.5, 0.4, -2.6]}
      rotation={[-Math.PI / 2 + 0.12, 0.02, -0.08]}
    >
      {lines.map((line, i) => (
        <Text
          key={i}
          ref={(el) => (textRefs.current[i] = el)}
          position={[0, line.y, 0]}
          fontSize={line.size}
          color="#1a0e05" 
          outlineColor="#4a2e1b"
          outlineWidth={isMobile ? 0.005 : 0.007}
          anchorX="center"
          anchorY="middle"
          outlineBlur={0.01}
          fillOpacity={0}
          outlineOpacity={0}
          renderOrder={10}
          depthTest={true}
          letterSpacing={0.06} 
          material-toneMapped={false}
        //   font="/fonts/The-Django.ttf"
        >
          {line.text}
        </Text>
      ))}
    </group>
  );
}