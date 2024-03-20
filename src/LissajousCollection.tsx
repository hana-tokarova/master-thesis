import { useMemo } from 'react';
import * as THREE from 'three';
import { Euler, TubeGeometry } from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';


type MeshRef = React.RefObject<THREE.Mesh>;

type LissajousProps = {
    mesh: MeshRef;
    meshColor: string;
    meshRadius: number;
    parameterA: number;
    parameterB: number;
    parameterC?: number;
    scaleA: number;
    scaleB: number;
    scaleC?: number;
    detail: number;
};

const makeLissajousCurve3D = (nbSteps: number, sA: number, sB: number, sC: number, lA: number, lB: number, lC: number, a: number, b: number, c: number, delta: number, gamma: number, isRing: boolean) => {
    if (isRing) {
        if (a > 1) {
            b += Math.floor((b - 1) / (a - 1));
        }
    } else {
        if (a > 1) {
            b += Math.floor((b - 1) / (a - 1));
            c += Math.floor((c - 1) / (a - 1));
        }

        if (b === c) {
            c += 1;
        }
    }

    const points = [];
    const stepSize = Math.PI * 2 / nbSteps;

    for (let t = 0; t <= nbSteps; t++) {
        const x = (sA / lA) * Math.sin(a * t * stepSize);
        const y = (sB / lB) * Math.sin(b * t * stepSize + delta);
        const z = (sC / lC) * Math.sin(c * t * stepSize + gamma);

        points.push(new THREE.Vector3(x, y, z));
    }

    return points;
};

const makeLissajousCurve2D = (nbSteps: number, sA: number, sB: number, lA: number, lB: number, a: number, b: number, delta: number) => {
    if (a > 1) { // skipping those that were already in the sequence
        b += Math.floor((b - 1) / (a - 1));
    }

    const points = [];
    const stepSize = Math.PI * 2 / nbSteps;

    for (let t = 0; t <= nbSteps; t++) {
        const x = (sA / lA) * Math.sin(a * t * stepSize + delta);
        const y = (sB / lB) * Math.sin(b * t * stepSize);

        points.push(new THREE.Vector3(x, y, 0));
    }

    return points;
};

const bendLissajous = (geometry: THREE.BufferGeometry, angle: number) => {
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

export const LissajousRing = ({ parameterA, parameterB, scaleA, scaleB, meshRadius, mesh, meshColor, detail }: LissajousProps) => {
    const lissajousPoints = makeLissajousCurve3D(detail, scaleA, scaleB, scaleA, 1, 4, 1, parameterA, parameterB, parameterA, Math.PI, Math.PI / 2, true);

    const geometry = useMemo(() => {
        const ringPath = new THREE.CatmullRomCurve3(lissajousPoints);

        const calculateDetail2D = (scaleA: number, scaleB: number) => {
            const detail = Math.floor(scaleA * Math.PI * scaleB);
            return detail > 1000 ? 1000 : detail;
        }

        const ringMesh = new TubeGeometry(ringPath, calculateDetail2D(scaleA, scaleB), meshRadius, 32, true);
        return ringMesh;
    }, [lissajousPoints, meshRadius, scaleA, scaleB]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, 0)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
};

export const LissajousBracelet = ({ parameterA, parameterB, scaleA, scaleB, meshRadius, mesh, meshColor, detail }: LissajousProps) => {
    const lissajousPoints = makeLissajousCurve2D(detail, scaleA, scaleB, 1, 5, parameterA, parameterB, Math.PI / 2);

    const geometry = useMemo(() => {
        const braceletPath = new THREE.CatmullRomCurve3(lissajousPoints);
        const braceletMesh = new TubeGeometry(braceletPath, detail, meshRadius, 32, true);

        bendLissajous(braceletMesh, 2 * Math.pow(scaleA, -0.9));

        return braceletMesh;
    }, [lissajousPoints, meshRadius, detail, scaleA]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, 0)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
}

export const LissajousEarring = ({ parameterA, parameterB, parameterC, scaleA, scaleB, scaleC, meshRadius, mesh, meshColor, detail }: LissajousProps) => {
    const lissajousPoints = makeLissajousCurve3D(detail, scaleA, scaleB, scaleC!, 4, 4, 4, parameterA, parameterB, parameterC!, Math.PI, Math.PI / 2, false);

    const geometry = useMemo(() => {
        const earringPath = new THREE.CatmullRomCurve3(lissajousPoints, false, "catmullrom", 0.2);

        const calculateDetail3D = (sA: number, sB: number, sC: number) => {
            console.log(sA, sB, sC);
            const detail = Math.max(1, Math.floor(Math.PI * sA * sB * sC / 30));
            return detail > 1000 ? 1000 : detail;
        }

        const earringMesh = new TubeGeometry(earringPath, calculateDetail3D(scaleA, scaleB, scaleC!), meshRadius, 32, true);

        const holderMesh = new THREE.TorusGeometry(0.7 + meshRadius, meshRadius, 32, 64);
        const rotationHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotationHolder);
        const t = 0;
        const stepSize = Math.PI * 2 / detail;
        const translateHolder = new THREE.Matrix4().makeTranslation(
            (scaleA / 4) * Math.sin(parameterA * t * stepSize),
            (scaleB / 4) * Math.sin(parameterB * t * stepSize + Math.PI),
            (scaleC! / 4) * Math.sin(parameterC! * t * stepSize + Math.PI / 2) + meshRadius + 0.7
        );
        holderMesh.applyMatrix4(translateHolder);

        const mergedMesh = BufferGeometryUtils.mergeGeometries([earringMesh, holderMesh]);
        return mergedMesh;
    }, [lissajousPoints, meshRadius, scaleC, scaleA, scaleB, detail, parameterA, parameterB, parameterC]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(-Math.PI / 2, 0, Math.PI / 3)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
}

export const LissajousPendant = ({ parameterA, parameterB, scaleA, scaleB, meshRadius, mesh, meshColor, detail }: LissajousProps) => {
    const lissajousPoints = makeLissajousCurve2D(detail, scaleA, scaleB, 5, 5, parameterA, parameterB, Math.PI / 2);

    const geometry = useMemo(() => {
        const pendantPath = new THREE.CatmullRomCurve3(lissajousPoints);
        const pendantMesh = new TubeGeometry(pendantPath, detail, meshRadius, 32, true);

        const t = 0;
        const stepSize = Math.PI * 2 / detail;
        const holderMesh = new THREE.TorusGeometry(0.7 + meshRadius, meshRadius, 32, 64);
        const translateHolder = new THREE.Matrix4().makeTranslation(
            (scaleA / 5) * Math.sin(parameterA * t * stepSize + Math.PI / 2) + meshRadius + 0.7,
            (scaleB / 5) * Math.sin(parameterB * t * stepSize), 0);
        holderMesh.applyMatrix4(translateHolder);
        const rotateHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotateHolder);

        const mergedMesh = BufferGeometryUtils.mergeGeometries([pendantMesh, holderMesh]);
        return mergedMesh;
    }, [lissajousPoints, meshRadius, scaleA, scaleB, parameterA, parameterB, detail]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, Math.PI / 3, Math.PI / 2)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
}
