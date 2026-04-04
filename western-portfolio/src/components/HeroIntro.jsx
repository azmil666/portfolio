import React, { useRef, useMemo } from 'react';
import { Text3D, Center, RoundedBox, GradientTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';


const Nail = ({ position }) => (
  <group position={position}>
   
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
      <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
    </mesh>
  
    <mesh position={[0, 0, 0.011]}>
      <circleGeometry args={[0.03, 16]} />
      <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.5} />
    </mesh>
  </group>
);


export default function HeroIntro({ currentSection = 0 }) {
  const { size } = useThree();
  const isMobile = size.width < 768;

  const boardScale = isMobile ? 0.6 : 0.8;

  const lines = useMemo(() => [
    { text: 'AZMIL MOHAMMED', size: 0.5, y: 1.0, delay: 0 },
    { text: 'Computer Science Student - Year 2', size: 0.22, y: 0.2, delay: 0.22 },
    { text: 'Kochi, India', size: 0.2, y: -0.3, delay: 0.44, hasPin: true },
    { text: 'I build real projects & turn ideas into usable systems', size: 0.19, y: -0.9, delay: 0.66 },
  ], []);

  const mainGroupRef = useRef();
  const textRefs = useRef([]);
  const timeRef = useRef(0);
  const floatTime = useRef(0);

  useFrame((state, delta) => {
    const isVisible = currentSection === 0;
    floatTime.current += delta;

    if (isVisible) {
      timeRef.current += delta;
    } else {
      timeRef.current -= delta * 3;
    }
    timeRef.current = THREE.MathUtils.clamp(timeRef.current, 0, 5);

    if (mainGroupRef.current) {
      const ease = 1 - Math.pow(1 - THREE.MathUtils.clamp(timeRef.current / 1.5, 0, 1), 4);
      
      const floatY = Math.sin(floatTime.current * 1.2) * 0.05;
      const floatRotX = Math.sin(floatTime.current * 0.8) * 0.02;
      const floatRotY = Math.cos(floatTime.current * 0.6) * 0.03;

      mainGroupRef.current.position.y = THREE.MathUtils.lerp(-3, floatY, ease);
      mainGroupRef.current.rotation.set(floatRotX, floatRotY, 0);
    }

    textRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const line = lines[i];
      let progress = (timeRef.current - line.delay) / 1.1;
      progress = THREE.MathUtils.clamp(progress, 0, 1);
      const ease = 1 - Math.pow(1 - progress, 4);

      if (mesh.material) mesh.material.opacity = ease;
    });
  });

  const textDepth = 0.02;

  const panelWidth = 9.5;
  const panelHeight = 4.0;
  const nailX = panelWidth / 2 - 0.3;
  const nailY = panelHeight / 2 - 0.3;

  return (

    <group position={isMobile ? [10, 4, -8] : [10, 4, -8]}>
      
      <group ref={mainGroupRef} scale={boardScale} >
        
        <group>
          <RoundedBox
            args={[panelWidth, panelHeight, 0.2]} 
            radius={0.15}
            smoothness={4}
            position={[0, 0, -0.1]} 
          >

            <meshPhysicalMaterial
              roughness={0.85}
              metalness={0.05}
              clearcoat={0.3} 
              clearcoatRoughness={0.4}
            >
              <GradientTexture
                stops={[0, 0.2, 0.8, 1]}
                colors={['#4a2a18', '#3b2210', '#3b2210', '#2e1a0d']} 
                size={1024}
              />
            </meshPhysicalMaterial>
          </RoundedBox>

          <Nail position={[-nailX, nailY, 0]} />
          <Nail position={[nailX, nailY, 0]} />
          <Nail position={[-nailX, -nailY, 0]} />
          <Nail position={[nailX, -nailY, 0]} />
        </group>

        
        {lines.map((line, i) => (
          <group key={i} position={[0, line.y, 0]}>
            <Center>
              <group>
               
                <Text3D
                  ref={(el) => (textRefs.current[i] = el)}
                  size={line.size}
                  height={textDepth}
                  bevelEnabled
                  bevelSize={0.002}
                  bevelThickness={0.005}
                  bevelSegments={2}
                  curveSegments={12}
                  font="/fonts/Oswald.json"
                >
                  {line.text}

                  <meshStandardMaterial
                    attach="material"
                    transparent={true}
                    opacity={0}
                    color="#fada80" 
                    roughness={0.4}
                    metalness={0.4} 
                  />
                </Text3D>
              </group>
            </Center>
          </group>
        ))}
      </group>
    </group>
  );
}