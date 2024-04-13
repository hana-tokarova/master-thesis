import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { forwardRef, Suspense, useRef } from "react";
import { JewelryMesh } from "../components/collections/Collections";

type RenderCanvasProps = {
    mesh: JewelryMesh;
    color: string;
    numParams: {
        [key: string]: number;
    };
    boolParams: {
        [key: string]: boolean;
    };
}

const FollowCameraLight = () => {
    const lightRef = useRef<THREE.DirectionalLight | null>(null);
    const { camera } = useThree();

    useFrame(() => {
        lightRef.current!.position.copy(camera.position);
    });

    return (
        <>
            <directionalLight ref={lightRef} intensity={2} />
            <directionalLight intensity={1} position={[3, 3, 3]} />
            <directionalLight intensity={1} position={[-3, 3, -3]} />
            <directionalLight intensity={1} position={[3, 3, -3]} />
            <directionalLight intensity={1} position={[-3, 3, 3]} />
        </>
    );
}

export const RenderCanvas = forwardRef<THREE.Mesh, RenderCanvasProps>(({ mesh, color, numParams, boolParams }, ref) => (
    <div style={{ width: "100vw", height: "80vh" }}>
        <Suspense fallback={<span>loading...</span>}>
            <Canvas
                camera={{ fov: 50, near: 0.1, far: 1000, position: [60, 60, 0] }}
                frameloop="demand"
            >
                <FollowCameraLight />

                <ambientLight
                    intensity={1}
                    color="dimgray"
                />

                {mesh.render(numParams, boolParams, color, ref)}

                <OrbitControls
                    enablePan={false}
                    enableRotate={true}
                    enableZoom={false}
                    enableDamping={true}
                    minPolarAngle={Math.PI / 2 - Math.PI / 5}
                    maxPolarAngle={Math.PI / 2 + Math.PI / 5}
                />
            </Canvas>
        </Suspense>
    </div>
));

