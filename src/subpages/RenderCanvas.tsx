import { AdaptiveDpr, OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { JewelryMesh, RingSize } from '../components/collections/Collections';

type RenderCanvasProps = {
    mesh: JewelryMesh;
    color: string;
    sliderParams: { [key: string]: number };
    switchParams: { [key: string]: boolean };
    dropdownParams: { [key: string]: RingSize };
    currentMaterial: {
        name: string;
        thicknessMinimum: number;
        additionalCost: number;
        roughness: number;
        metalness: number;
    };
};

export const RenderCanvas = React.forwardRef<THREE.Mesh, RenderCanvasProps>(
    ({ mesh, color, sliderParams, switchParams, dropdownParams, currentMaterial }, ref) => {
        const cameraRef = useRef<THREE.PerspectiveCamera>(null);
        const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 0, 0));

        useEffect(() => {
            const handleResize = () => {
                const w = window.innerWidth;
                const h = window.innerHeight;

                const x = Math.max(Math.min(50000 / Math.min(w / 2, h), 100), 50);
                const y = 30;
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
            <Canvas shadows>
                <color attach="background" args={['#f0f0f0']} />

                <PerspectiveCamera
                    makeDefault
                    ref={cameraRef}
                    fov={50}
                    position={cameraPosition}
                    near={0.1}
                    far={1000}
                />

                <Stage
                    preset={'rembrandt'}
                    environment={'warehouse'}
                    intensity={0.2}
                    shadows="contact"
                    adjustCamera={false}
                >
                    {mesh.render(
                        sliderParams,
                        dropdownParams,
                        switchParams,
                        color,
                        ref,
                        currentMaterial.roughness,
                        currentMaterial.metalness,
                    )}
                </Stage>

                <AdaptiveDpr pixelated />

                <OrbitControls
                    enablePan={false}
                    enableRotate
                    enableZoom={false}
                    enableDamping
                    minPolarAngle={Math.PI / 2 - Math.PI / 3}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
        );
    },
);
