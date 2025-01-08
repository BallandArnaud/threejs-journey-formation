import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";

export default function Fox(props) {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationsName } = useControls({
    animationsName: {
      options: animations.names,
    },
  });

  useEffect(() => {
    const action = animations.actions[animationsName];
    action.reset().fadeIn(0.5).play();

    // window.setTimeout(() => {
    //     animations.actions.Walk.play()
    //     animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
    // }, 2000)

    return () => {
      action.fadeOut(0.5);
    };
  }, [animationsName]);

  return <primitive object={fox.scene} {...props} />;
}

useGLTF.preload("./Fox/glTF/Fox.gltf");
