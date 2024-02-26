import { Button, ChakraProvider, theme } from "@chakra-ui/react"
import { Canvas } from "@react-three/fiber"

export const App = () => (
  <ChakraProvider theme={theme}>
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas>
        <color attach="background" args={["white"]} />
        <pointLight intensity={0.01} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <mesh position={[0, 0, 0]} rotation={[180, 180, 180]}>
          <torusGeometry radius={4} radialSegments={8} tubularSegments={10} />
          <meshStandardMaterial flatShading={true} color="pink" />
        </mesh>
      </Canvas>
      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        <Button colorScheme="blue">Click Me</Button>
      </div>
    </div>
  </ChakraProvider>
)
