
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { JewelryMesh } from '../components/collections/Collections';

type RenderCanvasProps = {
    mesh: JewelryMesh;
    color: string;
    numParams: { [key: string]: number };
    boolParams: { [key: string]: boolean };
};

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

export const RenderCanvas = React.forwardRef<THREE.Mesh, RenderCanvasProps>(
    ({ mesh, color, numParams, boolParams }, ref) => {
        const cameraRef = useRef<THREE.PerspectiveCamera>(null);
        const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 0, 0));

        useEffect(() => {
            const handleResize = () => {
                const w = window.innerWidth;
                const h = window.innerHeight;

                const x = w / 25; // Adjust the divisor as needed to scale
                const y = h / 25; // Adjust the divisor as needed to scale
                const z = 0;

                setCameraPosition(new Vector3(x, y, z));

                if (cameraRef.current) {
                    cameraRef.current.position.set(x, y, z);
                    cameraRef.current.updateProjectionMatrix();
                }
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        return (
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    ref={cameraRef}
                    fov={50}
                    position={cameraPosition}
                    near={0.1}
                    far={1000}
                />

                <FollowCameraLight />

                <ambientLight intensity={1} color="dimgray" />

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
        );
    }
);


