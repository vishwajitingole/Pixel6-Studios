import {
    Environment,
    OrbitControls,
    RandomizedLight,
    Sky,
    SoftShadows,
    useHelper,
  } from "@react-three/drei";
  import { useFrame } from "@react-three/fiber";
  import { useRef } from "react";
  import { DirectionalLightHelper } from "three";
  import { useControls } from "leva";
  
  export function Experience() {
    const shapes = useRef();
    const dlight = useRef();
  
    useHelper(dlight, DirectionalLightHelper, 2);
  
    // const { skyposition } = useControls("sunposition", {
    //   skyposition: { value: [1, 2, 3] },
    // });
  
    useFrame(() => {
      shapes.current.rotation.y += 0.02;
      shapes.current.rotation.x += 0.02;
    }, []);
  
    return (
      <group>
        <OrbitControls />
        <SoftShadows />
        {/* <Sky sunPosition={skyposition} /> */}
        <Environment background files={"../public/golf.hdr"} />
  
        
  
        {/**In Environment's color div whatever we pass in args it will be setup whole background color with that way */}
        {/* <Environment background>
          <color args={["#000000"]} attach="background" />
          <mesh scale={10} position-z={-5}>
            <planeGeometry />
            <meshBasicMaterial color={"red"} />
          </mesh>
        </Environment> */}
  
        {/**These ambient and directional light will only work on Mesh Standard Material */}
        <ambientLight intensity={0.5} />
  
        <directionalLight
          ref={dlight}
          castShadow
          position={[1, 2, 6]}
          intensity={1.3}
        />
  
        {/* <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color={"yellowgreen"} />
        </mesh> */}
  
        <group ref={shapes} position={[0, 1, 1]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color={"red"} />
          </mesh>
  
          <mesh castShadow position={[2, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color={"green"} />
          </mesh>
        </group>
      </group>
    );
  }
  
  export default Experience;