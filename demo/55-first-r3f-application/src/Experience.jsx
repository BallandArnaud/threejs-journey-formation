import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./CustomObject";

extend({ OrbitControls });

export default function Experience() {
    // Provide the state but only once at the beginning of the component
    const { camera, gl } = useThree();

    const cubeRef = useRef();
    const groupRef = useRef();
    const sphere1Ref = useRef();
    const sphere2Ref = useRef();

    useFrame((state, delta) => {
        const angle = state.clock.elapsedTime;
        // state.camera.position.x = Math.sin(angle) * 8;
        // state.camera.position.z = Math.cos(angle) * 8;
        // state.camera.lookAt(0, 0, 0);

        cubeRef.current.rotation.y += delta;
        // groupRef.current.rotation.y += delta

        sphere1Ref.current.position.x = Math.sin(angle) * 3;
        sphere1Ref.current.position.z = Math.cos(angle) * 3;
        sphere1Ref.current.position.y = Math.cos(angle) * 3;


        sphere2Ref.current.position.x = Math.cos(angle) * 2 + 2;
        sphere2Ref.current.position.z = Math.sin(angle) * 2;
        sphere2Ref.current.position.y = Math.sin(angle) * 1 + 1.5;

    });
    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />
            <directionalLight position={[1, 2, 3]} intensity={4} />
            <ambientLight intensity={1.5} />

            <group ref={groupRef}>
                <mesh ref={sphere1Ref} position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
                <mesh ref={sphere2Ref}>
                    <sphereGeometry args={ [ 0.2, 32, 32 ] }/>
                    <meshStandardMaterial color="blue" />
                </mesh>
                <mesh
                    ref={cubeRef}
                    position={[2, 0, 0]}
                    scale={1.2}
                    rotation-y={Math.PI * 0.25}
                >
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </group>
            <mesh scale={10} position-y={-1} rotation-x={-Math.PI * 0.5}>
                <planeGeometry />
                <meshStandardMaterial color="lightgreen" />
            </mesh>

            <CustomObject />
        </>
    );
}
