import { Canvas } from "@react-three/fiber";
import "./style.css";
import ReactDOM from "react-dom/client";
import Experience from "./Experience";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const cameraOrtographicSettings = {
    fov: 45,
    zoom: 100,
    near: 0.1,
    far: 200,
    position: [3, 2, 6],
};

root.render(
    <>
        <Canvas
            // flat
            dpr={ [1, 2] } // clamp pixel ratio between 1 and max 2 = default value and can be removed
            gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                outputColorSpace: THREE.SRGBColorSpace,
            }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [3, 2, 6],
            }}
        >
            <Experience />
        </Canvas>
    </>
);
