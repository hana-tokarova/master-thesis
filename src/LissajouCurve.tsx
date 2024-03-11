import { useMemo } from 'react';
import * as THREE from 'three';
import { Euler, ExtrudeGeometry, Shape } from 'three';

type MeshRef = React.RefObject<THREE.Mesh>;

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

const makeLissajousCurve2D = (nbSteps: number, s: number, a: number, b: number, delta: number) => {
    const points = [];
    const range = 2 * Math.PI;
    const stepSize = range / nbSteps;

    for (let t = -range / 2; t <= range / 2; t += stepSize) {
        const x = (s / 5) * Math.sin(a * t);
        const y = s * Math.sin(b * t + delta);

        points.push(new THREE.Vector3(y, x, 0));
    }

    return points;
};

const bendGeometry = (geometry: THREE.BufferGeometry, angle: number) => {
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
    const v = positionAttribute.array;

    for (let i = 0; i < v.length; i += 3) {
        const x = v[i];
        const y = v[i + 1];
        const z = v[i + 2];

        // Bending along the y-axis
        const theta = x * angle;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        // Applying bending calculations
        v[i] = (z - 1.0 / angle) * sinTheta;
        v[i + 1] = y;
        v[i + 2] = -(z - 1.0 / angle) * cosTheta;
    }
};

export const LissajouCurve = ({ parameterA, parameterB, parameterC, meshRadius, mesh, meshColor }: LissajouCurveProps) => {
    // const points = makeLissajousCurve3D(100, 20, parameterA, parameterB, parameterC, Math.PI, Math.PI / 2);
    const points2D = makeLissajousCurve2D(200, 30, parameterA, parameterB, Math.PI / 2);

    const geometry = useMemo(() => {
        const path = new THREE.CatmullRomCurve3(points2D, true, "centripetal");

        const semicircleShape = new Shape();
        semicircleShape.arc(0, 0, meshRadius, Math.PI, -Math.PI, true); // Draw half-circle

        const extrudeSettings = {
            steps: 10000,
            extrudePath: path,
        };

        const extrudeGeometry = new ExtrudeGeometry(semicircleShape, extrudeSettings);

        // Apply bending to the geometry
        bendGeometry(extrudeGeometry, 0.09); // Adjust the bending angle as needed

        extrudeGeometry.computeVertexNormals();

        return extrudeGeometry;
    }, [points2D, meshRadius]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, 0)} castShadow receiveShadow>
            <meshStandardMaterial attach="material" color={meshColor} flatShading={false} />
            {/* < meshNormalMaterial  /> */}
        </mesh>
    );

};
