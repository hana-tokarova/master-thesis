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
            return { offset: 40, scaleFactor: 1.0 };
        case JewelryType.Bracelet:
            return { offset: 135, scaleFactor: 3 };
        case JewelryType.Earring:
            return { offset: 50, scaleFactor: 0.5 };
        case JewelryType.Pendant:
            return { offset: 40, scaleFactor: 0.5 };
        default:
            throw new Error('Unknown Jewelry Type');
    }
};

const initializeCameraPosition = (offset: number, scaleFactor: number): THREE.Vector3 => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const x = Math.max(Math.min((50000 / Math.min(w / 2, h)) * scaleFactor, 10), offset);
    const y = 20;
    const z = 0;
    return new Vector3(x, y, z);
};

export const RenderCanvas = React.forwardRef<THREE.Mesh, RenderCanvasProps>(
    ({ currentJewelry, mesh, color, sliderParams, switchParams, dropdownParams, currentMaterial }, ref) => {
        const cameraRef = useRef<THREE.PerspectiveCamera>(null);
        const [cameraPosition, setCameraPosition] = useState(() => {
            const settings = setCameraForJewelry(currentJewelry);
            return initializeCameraPosition(settings.offset, settings.scaleFactor);
        });

        useEffect(() => {
            const settings = setCameraForJewelry(currentJewelry);
            setCameraPosition(initializeCameraPosition(settings.offset, settings.scaleFactor));
        }, [currentJewelry]);

        useEffect(() => {
            const updatePosition = () => {
                const settings = setCameraForJewelry(currentJewelry);
                const newPos = initializeCameraPosition(settings.offset, settings.scaleFactor);
                setCameraPosition(newPos);
                if (cameraRef.current) {
                    cameraRef.current.position.copy(newPos);
                    cameraRef.current.updateProjectionMatrix();
                }
            };

            const handleResize = debounce(updatePosition, 100);
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, [currentJewelry]);

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
                    intensity={0.3}
                    shadows={{
                        type: 'contact',
                        bias: -0.0001,
                        normalBias: 0,
                        size: 1024,
                        offset: 0.1,
                    }}
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
