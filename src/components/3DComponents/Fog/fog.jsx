import * as THREE from "three"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Clouds, Cloud, CameraControls, Sky as SkyImpl, StatsGl } from "@react-three/drei"
import { useControls } from "leva"

export const Sky=()=> {
  return (
    <>
      <Cloud position={[0,-1,0]} speed={1} opacity={0.02} color={"#e8c7ff"} scale={2.2}/>
      <Cloud position={[0,-1,8]} speed={1} opacity={0.02} color={"#e8c7ff"} scale={2.2}/>
      <Cloud position={[0,-1,-8]} speed={1} opacity={0.02} color={"#e8c7ff"} scale={2.2}/>
      <Cloud position={[-13,-1,0]} speed={1} opacity={0.02} color={"#e8c7ff"} scale={2.2}/>
      <Cloud position={[13,-1,0]} speed={1} opacity={0.02} color={"#e8c7ff"} scale={2.2}/>
      <Cloud position={[13,-1,8]} speed={1} opacity={0.02} color={"#e8c7ff"} scale={2.2}/>
      <Cloud position={[-13,-1,8]} speed={1} opacity={0.02} color={"#e8c7ff"} scale={2.2}/>
      <Cloud position={[13,-1,-8]} speed={1} opacity={0.02} color={"#e8c7ff"} scale={2.2}/>
      <Cloud position={[-13,-1,-8]} speed={1} opacity={0.02} color={"#e8c7ff"} scale={2.2}/>
      {/* <Cloud position={[-15,-1,-10]} speed={1} opacity={1} color={"black"} scale={2.2}/> */}
    </>
  )
}
