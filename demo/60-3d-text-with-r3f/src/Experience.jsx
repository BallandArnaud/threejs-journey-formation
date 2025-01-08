import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  // const [torusGeometry, setTorusGeometry] = useState();
  // const [material, setMaterial] = useState();
  // const singleDonut = useRef();

  const donuts = useRef([]);
  const [matcapTexture] = useMatcapTexture("9F1A27_F1AF7F_CD5845_D08441", 256);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    //   const t = state.clock.elapsedTime;
    //   singleDonut.current.rotation.y += delta;
    //   singleDonut.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 10;
    //   singleDonut.current.rotation.x = Math.cos(t / 2) / 4;
    //   singleDonut.current.rotation.y = Math.cos(t / 2) / 4;
    //   singleDonut.current.position.y = (1 + Math.sin(t / 1.5)) / 5;
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={donutMatcapTexture} /> */}

      <Center>
        <Text3D
          material={material}
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          HELLO R3F
        </Text3D>
      </Center>

      {[...Array(100)].map((value, index) => (
        <mesh
          ref={(element) => (donuts.current[index] = element)}
          key={index}
          geometry={torusGeometry}
          material={material}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}

      {/* <mesh ref={singleDonut}>
        <torusGeometry args={[1, 0.6, 16, 32]} />
        <meshMatcapMaterial matcap={donutMatcapTexture} />
      </mesh> */}
    </>
  );
}
