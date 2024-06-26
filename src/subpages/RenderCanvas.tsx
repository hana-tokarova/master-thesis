import { AdaptiveDpr, OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { JewelryMesh, JewelryType, Material, RingSize } from '../components/collections/Collections';

/**
 * Props for the RenderCanvas component.
 */
type RenderCanvasProps = {
    currentJewelry: JewelryType;
    mesh: JewelryMesh;
    color: string;
    sliderParams: { [key: string]: number };
    switchParams: { [key: string]: boolean };
    dropdownParams: { [key: string]: RingSize };
    currentMaterial: Material;
};

/**
 * Sets the camera parameters for rendering a specific jewelry type.
 *
 * @param jewelryType - The type of jewelry.
 * @returns An object containing the camera offset and scale factor.
 * @throws Error if the jewelry type is unknown.
 */
const setCameraForJewelry = (jewelryType: JewelryType): { offset: number; scaleFactor: number } => {
    switch (jewelryType) {
        case JewelryType.Ring:
            return { offset: 40, scaleFactor: 1.0 };
        case JewelryType.Bracelet:
            return { offset: 100, scaleFactor: 3 };
        case JewelryType.Earring:
            return { offset: 50, scaleFactor: 0.5 };
        case JewelryType.Pendant:
            return { offset: 60, scaleFactor: 0.5 };
        default:
            throw new Error('Unknown Jewelry Type');
    }
};

/**
 * Initializes the camera position based on the given offset and scaleFactor.
 *
 * @param offset - The offset value.
 * @param scaleFactor - The scale factor value.
 * @returns The initialized camera position as a THREE.Vector3 object.
 */
const initializeCameraPosition = (offset: number, scaleFactor: number): THREE.Vector3 => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const x = Math.max(Math.min((50000 / Math.min(w / 2, h)) * scaleFactor, 10), offset);
    const y = 20;
    const z = 0;
    return new Vector3(x, y, z);
};

/**
 * Renders a canvas with 3D objects using Three.js library.
 *
 * @param props - The component props.
 * @param props.currentJewelry - The current jewelry object.
 * @param props.mesh - The mesh object.
 * @param props.color - The color of the object.
 * @param props.sliderParams - The slider parameters.
 * @param props.switchParams - The switch parameters.
 * @param props.dropdownParams - The dropdown parameters.
 * @param props.currentMaterial - The current material object.
 * @param ref - The ref object.
 * @returns The rendered canvas component.
 */
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
