import { useMemo } from 'react';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

type LissajousProps = {
    mesh: React.Ref<THREE.Mesh>;
    meshColor: string;
    meshRadius: number;
    parameterA: number;
    parameterB: number;
    parameterC?: number;
    scaleA: number;
    scaleB: number;
    scaleC?: number;
    detail: number;
    roughness: number;
    metalness: number;
};

const makeLissajousCurve2D = (
    nbSteps: number,
    sA: number,
    sB: number,
    lA: number,
    lB: number,
    a: number,
    b: number,
    delta: number,
) => {
    if (a > 1) {
        // skipping those that were already in the sequence
        b += Math.floor((b - 1) / (a - 1));
    }

    const points = [];
    const stepSize = (Math.PI * 2) / nbSteps;

    for (let t = 0; t <= nbSteps; t++) {
        const x = (sA / lA) * Math.sin(a * t * stepSize + delta);
        const y = (sB / lB) * Math.sin(b * t * stepSize);

        points.push(new THREE.Vector3(x, y, 0));
    }

    return points;
};

const makeCircleCurve2D = (nbSteps: number) => {
    const points = [];
    const stepSize = (Math.PI * 2) / nbSteps;

    for (let t = 0; t <= nbSteps; t++) {
        const x = Math.cos(t * stepSize);
        const y = Math.sin(t * stepSize);

        points.push(new THREE.Vector3(x, y, 0));
    }

    return points;
};

const makeLissajousCurve3D = (
    nbSteps: number,
    sA: number,
    sB: number,
    sC: number,
    lA: number,
    lB: number,
    lC: number,
    a: number,
    b: number,
    c: number,
    delta: number,
    gamma: number,
    isRing: boolean,
) => {
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
    const stepSize = (Math.PI * 2) / nbSteps;

    for (let t = 0; t <= nbSteps; t++) {
        const x = (sA / lA) * Math.sin(a * t * stepSize);
        const y = (sB / lB) * Math.sin(b * t * stepSize + delta);
        const z = (sC / lC) * Math.sin(c * t * stepSize + gamma);

        points.push(new THREE.Vector3(x, y, z));
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

        const theta = x * angle;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        v[i] = (z - 1.0 / angle) * sinTheta;
        v[i + 1] = y;
        v[i + 2] = -(z - 1.0 / angle) * cosTheta;
    }
};

const calculateDetail2D = (scaleA: number, scaleB: number) => {
    const detail = Math.floor(scaleA * Math.PI * scaleB);
    return detail > 1000 ? 1000 : detail;
};

const calculateDetail3D = (sA: number, sB: number, sC: number) => {
    const detail = Math.max(1, Math.floor((Math.PI * sA * sB * sC) / 30));
    return detail > 1000 ? 1000 : detail;
};

export const LissajousRing = ({
    parameterA,
    parameterB,
    scaleA,
    scaleB,
    meshRadius,
    mesh,
    meshColor,
    detail,
    roughness,
    metalness,
}: LissajousProps) => {
    const lissajousPoints = makeLissajousCurve3D(
        detail,
        scaleA,
        scaleB,
        scaleA,
        1,
        1,
        1,
        parameterA,
        parameterB,
        parameterA,
        Math.PI,
        Math.PI / 2,
        true,
    );

    const geometry = useMemo(() => {
        const ringPath = new THREE.CatmullRomCurve3(lissajousPoints);
        const ringMesh = new THREE.TubeGeometry(ringPath, calculateDetail2D(scaleA, scaleB) * 3, meshRadius, 32, true);
        ringMesh.deleteAttribute('normal');
        ringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(ringMesh, 0.01);
        mergedVertices.computeVertexNormals();

        return mergedVertices;
    }, [lissajousPoints, meshRadius, scaleA, scaleB]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};

export const LissajousBracelet = ({
    parameterA,
    parameterB,
    scaleA,
    scaleB,
    meshRadius,
    mesh,
    meshColor,
    detail,
    roughness,
    metalness,
}: LissajousProps) => {
    const lissajousPoints = makeLissajousCurve2D(detail, scaleA, scaleB, 1, 1, parameterA, parameterB, Math.PI / 2);

    const geometry = useMemo(() => {
        const braceletPath = new THREE.CatmullRomCurve3(lissajousPoints);
        const braceletMesh = new THREE.TubeGeometry(
            braceletPath,
            calculateDetail2D(scaleA, scaleB) * 3,
            meshRadius,
            32,
            true,
        );
        braceletMesh.deleteAttribute('normal');
        braceletMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(braceletMesh, 0.01);

        bendLissajous(mergedVertices, 2 * Math.pow(scaleA, -0.91));
        mergedVertices.computeVertexNormals();

        return mergedVertices;
    }, [lissajousPoints, meshRadius, scaleA, scaleB]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};

export const LissajousEarring = ({
    parameterA,
    parameterB,
    parameterC,
    scaleA,
    scaleB,
    scaleC,
    meshRadius,
    mesh,
    meshColor,
    detail,
    roughness,
    metalness,
}: LissajousProps) => {
    const lissajousPoints = makeLissajousCurve3D(
        detail,
        scaleA,
        scaleB,
        scaleC!,
        4,
        4,
        4,
        parameterA,
        parameterB,
        parameterC!,
        Math.PI,
        Math.PI / 2,
        false,
    );
    const holderPoints = makeCircleCurve2D(detail);

    const geometry = useMemo(() => {
        const earringPath = new THREE.CatmullRomCurve3(lissajousPoints);
        const earringMesh = new THREE.TubeGeometry(
            earringPath,
            calculateDetail3D(scaleA, scaleB, scaleC!) * 3,
            meshRadius,
            32,
            true,
        );
        earringMesh.deleteAttribute('normal');
        earringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(earringMesh, 0.01);

        const holderPath = new THREE.CatmullRomCurve3(holderPoints);
        const holderMesh = new THREE.TubeGeometry(holderPath, 32, 0.5, 32, true);
        holderMesh.deleteAttribute('normal');
        holderMesh.deleteAttribute('uv');

        const rotationHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotationHolder);
        const translateHolder = new THREE.Matrix4().makeTranslation(0, 0, (scaleC! / 4) * Math.sin(Math.PI / 2) + 1.5);
        holderMesh.applyMatrix4(translateHolder);
        const rotationHolder2 = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
        holderMesh.applyMatrix4(rotationHolder2);

        const mergedGeometries = BufferGeometryUtils.mergeGeometries([mergedVertices, holderMesh]);
        mergedGeometries.computeVertexNormals();

        return mergedGeometries;
    }, [lissajousPoints, holderPoints, meshRadius, scaleC, scaleA, scaleB]);

    return (
        <mesh
            ref={mesh}
            geometry={geometry}
            position={[0, 0, 0]}
            rotation={new THREE.Euler(-Math.PI / 2, 0, Math.PI / 3)}
        >
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};

export const LissajousPendant = ({
    parameterA,
    parameterB,
    scaleA,
    scaleB,
    meshRadius,
    mesh,
    meshColor,
    detail,
    roughness,
    metalness,
}: LissajousProps) => {
    const lissajousPoints = makeLissajousCurve2D(detail, scaleA, scaleB, 5, 5, parameterA, parameterB, Math.PI / 2);
    const holderPoints = makeCircleCurve2D(detail);

    const geometry = useMemo(() => {
        const pendantPath = new THREE.CatmullRomCurve3(lissajousPoints);
        const pendantMesh = new THREE.TubeGeometry(
            pendantPath,
            calculateDetail2D(scaleA, scaleB) * 2,
            meshRadius,
            32,
            true,
        );
        pendantMesh.deleteAttribute('normal');
        pendantMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(pendantMesh, 0.01);

        const holderPath = new THREE.CatmullRomCurve3(holderPoints);
        const holderMesh = new THREE.TubeGeometry(holderPath, 32, 0.5, 32, true);
        holderMesh.deleteAttribute('normal');
        holderMesh.deleteAttribute('uv');

        const translateHolder = new THREE.Matrix4().makeTranslation((scaleA / 5) * Math.sin(Math.PI / 2) + 1.5, 0, 0);
        holderMesh.applyMatrix4(translateHolder);
        const rotateHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotateHolder);

        const mergedGeometries = BufferGeometryUtils.mergeGeometries([mergedVertices, holderMesh]);
        mergedGeometries.computeVertexNormals();

        return mergedGeometries;
    }, [lissajousPoints, holderPoints, meshRadius, scaleA, scaleB]);

    return (
        <mesh
            ref={mesh}
            geometry={geometry}
            position={[0, 0, 0]}
            rotation={new THREE.Euler(0, Math.PI / 3, Math.PI / 2)}
        >
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};
