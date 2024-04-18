import { AdaptiveDpr, OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { JewelryMesh, JewelryType, Material, RingSize } from '../components/collections/Collections';

type RenderCanvasProps = {
    currentJewelry: JewelryType;
    mesh: JewelryMesh;
    color: string;
    sliderParams: { [key: string]: number };
    switchParams: { [key: string]: boolean };
    dropdownParams: { [key: string]: RingSize };
    currentMaterial: Material;
};

const setCameraForJewelry = (jewelryType: JewelryType): { offset: number; scaleFactor: number } => {
    switch (jewelryType) {
        case JewelryType.Ring:
            return { offset: 50, scaleFactor: 1.0 };
        case JewelryType.Bracelet:
            return { offset: 90, scaleFactor: 3 };
        case JewelryType.Earring:
            return { offset: 30, scaleFactor: 0.8 };
        case JewelryType.Pendant:
            return { offset: 40, scaleFactor: 1.0 };
        default:
            throw new Error('Unknown Jewelry Type');
    }
};

export const RenderCanvas = React.forwardRef<THREE.Mesh, RenderCanvasProps>(
    ({ currentJewelry, mesh, color, sliderParams, switchParams, dropdownParams, currentMaterial }, ref) => {
        const initializeCameraPosition = (offset: number, scaleFactor: number): THREE.Vector3 => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const x = Math.max(Math.min((50000 / Math.min(w / 2, h)) * scaleFactor, 100), offset);
            const y = 30;
            const z = 0;
            return new Vector3(x, y, z);
        };

        const jewelrySettings = useRef(setCameraForJewelry(currentJewelry));
        const cameraRef = useRef<THREE.PerspectiveCamera>(null);
        const [cameraPosition, setCameraPosition] = useState<THREE.Vector3>(
            initializeCameraPosition(jewelrySettings.current.offset, jewelrySettings.current.scaleFactor),
        );

        const handleResize = useRef(
            debounce(() => {
                const w = window.innerWidth;
                const h = window.innerHeight;
                const x = Math.max(
                    Math.min((50000 / Math.min(w / 2, h)) * jewelrySettings.current.scaleFactor, 100),
                    jewelrySettings.current.offset,
                );
                const y = 30;
                const z = 0;
                setCameraPosition(new Vector3(x, y, z));
                if (cameraRef.current) {
                    cameraRef.current.position.set(x, y, z);
                    cameraRef.current.updateProjectionMatrix();
                }
            }, 100),
        ).current;

        useEffect(() => {
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, [handleResize]);

        return (
            <Canvas shadows>
                <PerspectiveCamera
                    makeDefault
                    ref={cameraRef}
                    fov={50}
                    position={cameraPosition}
                    near={0.1}
                    far={1000}
                />

                <Stage
                    key={JSON.stringify([sliderParams, dropdownParams, switchParams])}
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
