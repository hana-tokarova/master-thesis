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
        const y = (s / 2) * Math.sin(b * t + delta);
        const z = s * Math.sin(c * t + gamma);

        points.push(new THREE.Vector3(x, y, z));
    }

    return points;
};

const squareShape = new Shape()
    .moveTo(-0.5, -0.5)
    .lineTo(-0.5, 0.5)
    .lineTo(0.5, 0.5)
    .lineTo(0.5, -0.5)
    .closePath();

export const LissajouCurve = (props: LissajouCurveProps) => {
    const points = makeLissajousCurve3D(100, 20, props.parameterA, props.parameterB, props.parameterC, Math.PI, Math.PI / 2);
    const path = new THREE.CatmullRomCurve3(points, true, "centripetal");

    const extrudeSettings = {
        steps: 512,
        bevelEnabled: true,
        extrudePath: path,
    };

    const geometry = useMemo(() => {
        return new ExtrudeGeometry(squareShape, extrudeSettings);
    }, [squareShape, extrudeSettings]);

    return (
        <mesh ref={props.mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, 0)}>
            <meshStandardMaterial attach="material" color={props.meshColor} />
        </mesh>
    );

};
