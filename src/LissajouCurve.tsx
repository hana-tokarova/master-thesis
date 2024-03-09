import { useMemo } from 'react';
import * as THREE from 'three';
import { Euler, ExtrudeGeometry, Shape } from 'three';

type MeshRef = React.RefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>;

type LissajouCurveProps = {
    mesh: MeshRef;
    meshColor: string;
    meshRadius: number;
    parameterA: number;
    parameterB: number;
    parameterC: number;
};

const makeLissajousCurve3D = (nbSteps: number, s: number, a: number, b: number, c: number, delta: number, gamma: number) => {
    const points = [];
    const range = 2 * Math.PI;
    const stepSize = range / nbSteps;

    for (let t = -range / 2; t <= range / 2; t += stepSize) {
        const x = s * Math.sin(a * t);
        const y = (s / 4) * Math.sin(b * t + delta);
        const z = s * Math.sin(c * t + gamma);

        points.push(new THREE.Vector3(x, y, z));
    }

    return points;
};

export const LissajouCurve = ({ parameterA, parameterB, parameterC, meshRadius, mesh, meshColor }: LissajouCurveProps) => {
    const points = makeLissajousCurve3D(100, 20, parameterA, parameterB, parameterC, Math.PI, Math.PI / 2);

    const geometry = useMemo(() => {
        const path = new THREE.CatmullRomCurve3(points, true, "centripetal");

        const semicircleShape = new Shape();
        semicircleShape.arc(0, 0, meshRadius, Math.PI, -Math.PI, true); // Draw half-circle

        const extrudeSettings = {
            steps: 2000,
            extrudePath: path,
        };

        return new ExtrudeGeometry(semicircleShape, extrudeSettings);
    }, [points, meshRadius]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );

};
