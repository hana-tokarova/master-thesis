import { useMemo } from 'react';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

/**
 * Props for the Lissajous component.
 */
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

/**
 * Generates a 2D Lissajous curve.
 *
 * @param nbSteps - The number of steps in the curve.
 * @param sA - The scaling factor for the x-axis.
 * @param sB - The scaling factor for the y-axis.
 * @param lA - The denominator of the x-axis.
 * @param lB - The denominator of the y-axis.
 * @param a - The frequency of the x-axis.
 * @param b - The frequency of the y-axis.
 * @param delta - The phase shift.
 * @returns An array of THREE.Vector3 representing the points on the curve.
 */
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

/**
 * Generates a circle curve in 2D.
 * @param nbSteps - The number of steps to generate the curve.
 * @returns An array of THREE.Vector3 representing the points on the circle curve.
 */
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

/**
 * Generates a 3D Lissajous curve.
 *
 * @param nbSteps - The number of steps to generate the curve.
 * @param sA - The scaling factor for the x-axis.
 * @param sB - The scaling factor for the y-axis.
 * @param sC - The scaling factor for the z-axis.
 * @param lA - The denominator factor for the x-axis.
 * @param lB - The denominator factor for the y-axis.
 * @param lC - The denominator factor for the z-axis.
 * @param a - The frequency factor for the x-axis.
 * @param b - The frequency factor for the y-axis.
 * @param c - The frequency factor for the z-axis.
 * @param delta - The phase shift for the y-axis.
 * @param gamma - The phase shift for the z-axis.
 * @param isRing - Indicates whether the curve should be a ring.
 * @returns An array of THREE.Vector3 points representing the 3D Lissajous curve.
 */
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

/**
 * Bends the vertices of a THREE.BufferGeometry in a Lissajous pattern.
 * @param geometry - The THREE.BufferGeometry to bend.
 * @param angle - The angle of the Lissajous pattern.
 */
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

/**
 * Calculates the detail for a 2D Lissajous collection based on the given scales.
 * The detail is calculated as the product of `scaleA`, `scaleB`, and `Math.PI`.
 * If the calculated detail is greater than 1000, it is capped at 1000.
 *
 * @param scaleA - The scale factor for the x-axis.
 * @param scaleB - The scale factor for the y-axis.
 * @returns The calculated detail for the 2D Lissajous collection.
 */
const calculateDetail2D = (scaleA: number, scaleB: number) => {
    const detail = Math.floor(scaleA * Math.PI * scaleB);
    return detail > 1000 ? 1000 : detail;
};

/**
 * Calculates the detail for a 3D object based on the given parameters.
 *
 * @param sA - The value of parameter A.
 * @param sB - The value of parameter B.
 * @param sC - The value of parameter C.
 * @returns The calculated detail for the 3D object.
 */
const calculateDetail3D = (sA: number, sB: number, sC: number) => {
    const detail = Math.max(1, Math.floor(Math.PI * sA * sB * sC));
    return detail > 1000 ? 1000 : detail;
};

/**
 * Renders a Lissajous ring based on the provided parameters.
 *
 * @param parameterA - The value of parameter A.
 * @param parameterB - The value of parameter B.
 * @param scaleA - The scale factor for parameter A.
 * @param scaleB - The scale factor for parameter B.
 * @param meshRadius - The radius of the mesh.
 * @param mesh - The reference to the mesh.
 * @param meshColor - The color of the mesh.
 * @param detail - The level of detail for the mesh.
 * @param roughness - The roughness of the material.
 * @param metalness - The metalness of the material.
 */
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
        const ringMesh = new THREE.TubeGeometry(ringPath, calculateDetail2D(scaleA, scaleB) * 6, meshRadius, 32, true);
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

/**
 * Renders a Lissajous bracelet.
 *
 * @param parameterA - The parameter A for the Lissajous curve.
 * @param parameterB - The parameter B for the Lissajous curve.
 * @param scaleA - The scale factor for parameter A.
 * @param scaleB - The scale factor for parameter B.
 * @param meshRadius - The radius of the bracelet mesh.
 * @param mesh - The reference to the mesh object.
 * @param meshColor - The color of the bracelet mesh.
 * @param detail - The level of detail for the Lissajous curve.
 * @param roughness - The roughness of the bracelet material.
 * @param metalness - The metalness of the bracelet material.
 */
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

/**
 * Renders a Lissajous earring.
 *
 * @param parameterA - The value of parameter A.
 * @param parameterB - The value of parameter B.
 * @param parameterC - The value of parameter C.
 * @param scaleA - The scale factor for parameter A.
 * @param scaleB - The scale factor for parameter B.
 * @param scaleC - The scale factor for parameter C.
 * @param meshRadius - The radius of the mesh.
 * @param mesh - The reference to the mesh.
 * @param meshColor - The color of the mesh.
 * @param detail - The level of detail for the curves.
 * @param roughness - The roughness of the material.
 * @param metalness - The metalness of the material.
 */
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
        1,
        1,
        1,
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
            calculateDetail3D(scaleA, scaleB, scaleC!) * 6,
            meshRadius,
            32,
            true,
        );
        earringMesh.deleteAttribute('normal');
        earringMesh.deleteAttribute('uv');
        const rotationHolderM = new THREE.Matrix4().makeRotationX(-(Math.PI / 2));
        earringMesh.applyMatrix4(rotationHolderM);
        const mergedVertices = BufferGeometryUtils.mergeVertices(earringMesh, 0.01);

        const holderPath = new THREE.CatmullRomCurve3(holderPoints);
        const holderMesh = new THREE.TubeGeometry(holderPath, 32, 0.3, 32, true);
        holderMesh.deleteAttribute('normal');
        holderMesh.deleteAttribute('uv');

        const translateHolder = new THREE.Matrix4().makeTranslation(
            0,
            scaleC! * Math.sin(Math.PI / 2) + meshRadius + 0.5,
            0,
        );
        holderMesh.applyMatrix4(translateHolder);

        const mergedGeometries = BufferGeometryUtils.mergeGeometries([mergedVertices, holderMesh]);
        mergedGeometries.computeVertexNormals();

        return mergedGeometries;
    }, [lissajousPoints, holderPoints, meshRadius, scaleC, scaleA, scaleB]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new THREE.Euler(0, Math.PI / 2, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};

/**
 * Renders a Lissajous pendant.
 *
 * @param parameterA - The parameter A of the Lissajous curve.
 * @param parameterB - The parameter B of the Lissajous curve.
 * @param scaleA - The scale factor for parameter A.
 * @param scaleB - The scale factor for parameter B.
 * @param meshRadius - The radius of the pendant mesh.
 * @param mesh - The reference to the mesh object.
 * @param meshColor - The color of the pendant mesh.
 * @param detail - The level of detail for the pendant mesh.
 * @param roughness - The roughness of the pendant material.
 * @param metalness - The metalness of the pendant material.
 */
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
    const lissajousPoints = makeLissajousCurve2D(detail, scaleA, scaleB, 1, 1, parameterA, parameterB, Math.PI / 2);
    const holderPoints = makeCircleCurve2D(detail);

    const geometry = useMemo(() => {
        const pendantPath = new THREE.CatmullRomCurve3(lissajousPoints);
        const pendantMesh = new THREE.TubeGeometry(
            pendantPath,
            calculateDetail2D(scaleA, scaleB) * 6,
            meshRadius,
            32,
            true,
        );
        pendantMesh.deleteAttribute('normal');
        pendantMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(pendantMesh, 0.01);

        const rotateMesh = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
        mergedVertices.applyMatrix4(rotateMesh);

        const holderPath = new THREE.CatmullRomCurve3(holderPoints);
        const holderMesh = new THREE.TubeGeometry(holderPath, 32, 0.3, 32, true);
        holderMesh.deleteAttribute('normal');
        holderMesh.deleteAttribute('uv');

        const rotateHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotateHolder);
        const rotateHolder2 = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
        holderMesh.applyMatrix4(rotateHolder2);
        const translateHolder = new THREE.Matrix4().makeTranslation(
            0,
            scaleA * Math.sin(Math.PI / 2) + meshRadius + 0.5,
            0,
        );
        holderMesh.applyMatrix4(translateHolder);

        const mergedGeometries = BufferGeometryUtils.mergeGeometries([mergedVertices, holderMesh]);
        mergedGeometries.computeVertexNormals();

        return mergedGeometries;
    }, [lissajousPoints, holderPoints, meshRadius, scaleA, scaleB]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new THREE.Euler(0, Math.PI / 2, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};
