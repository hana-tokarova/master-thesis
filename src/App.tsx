import { ChakraProvider, theme } from "@chakra-ui/react"
import { Canvas } from "@react-three/fiber"

export const App = () => (
  <ChakraProvider theme={theme}>
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <pointLight intensity={0.01} />
        <directionalLight color="purple" position={[0, 0, 5]} />
        <mesh position={[0, 0, 0]} scale={1} rotation={[180, 0, 180]}>
          <torusGeometry args={[2, 0.4, 8, 20, Math.PI * 2]} />

          <meshPhongMaterial />
        </mesh>
      </Canvas>
    </div>
  </ChakraProvider>
)
