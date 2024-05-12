import { useMemo } from 'react';
import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

/**
 * Props for the Torsion component.
 */
type TorsionProps = {
    mesh: React.Ref<THREE.Mesh>;
    meshColor: string;
    stacks: number;
    majorR: number;
    minorR: number;
    twistAll: boolean;
    twist: number;
    scaleA: number;
    scaleB: number;
    scaleC: number;
    roughness: number;
    metalness: number;
    inflate?: number;
    screw?: number;
};

/**
 * Generates a circle curve in 2D.
 *
 * @param nbSteps - The number of steps to create the curve.
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
 * Calculates the smooth step interpolation between two values.
 * @param edge0 - The lower edge value.
 * @param edge1 - The upper edge value.
 * @param x - The input value to interpolate.
 * @returns The interpolated value between edge0 and edge1.
 */
const smoothStep = (edge0: number, edge1: number, x: number) => {
    x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return x * x * x * (x * (x * 6 - 15) + 10);
};

/**
 * Calculates the inflation factor for a mesh based on the given parameters.
 *
 * @param i - The inflation factor when `u` is between Math.PI / 2 and 3 * (Math.PI / 2).
 * @param u - The angle in radians.
 * @returns The calculated inflation factor.
 */
const inflateMesh = (i: number, u: number) => {
    let inflate;

    if (i === undefined) {
        inflate = 1;
    } else {
        inflate = u > Math.PI / 2 && u < 3 * (Math.PI / 2) ? i * 0.5 * (1 - Math.cos(u * 2 - Math.PI)) + 1 : 1;
    }

    return inflate;
};

/**
 * Calculates the twist value for a given range of values.
 *
 * @param twistAll - A boolean indicating whether to apply the twist to all values.
 * @param u - The current value.
 * @param twist - The twist value to apply.
 * @param start - The start value of the range.
 * @param end - The end value of the range.
 * @returns The calculated twist value.
 */
const twistMesh = (twistAll: boolean, u: number, twist: number, start: number, end: number) => {
    let smoothTwist;

    if (twistAll) {
        smoothTwist = (Math.PI * u * twist) / 5;
    } else {
        let t;

        if (u >= start && u <= end) {
            t = twist;
        } else {
            t = 0;
        }

        smoothTwist = t * smoothStep(start, end, u) * smoothStep(end, start, u);
    }

    smoothTwist *= 10;

    return smoothTwist;
};

/**
 * Calculates the detail for a 2D shape based on the major radius and twist.
 *
 * @param majorR - The major radius of the shape.
 * @param twist - The twist value of the shape.
 * @returns The calculated detail for the 2D shape.
 */
const calculateDetail2D = (majorR: number, twist: number) => {
    const detail = Math.floor(majorR * 2 * Math.PI * Math.abs(twist === 0 ? 1 : twist));
    return detail > 1000 ? 1000 : detail;
};

/**
 * Calculates the taper edge value based on the given parameters.
 *
 * @param u - The input value.
 * @param lowerFallOff - The lower fall-off value.
 * @param upperFallOff - The upper fall-off value.
 * @returns The calculated edge taper value.
 */
const taperEdge = (u: number, lowerFallOff: number, upperFallOff: number) => {
    let edgeTaper = 1;

    if (u > upperFallOff) {
        edgeTaper = (1 - u) / (1 - upperFallOff);
    } else if (u < lowerFallOff) {
        edgeTaper = u / lowerFallOff;
    }

    edgeTaper = 1 - edgeTaper;
    edgeTaper = Math.min(Math.max(0.00001, edgeTaper), 0.99999);

    return edgeTaper === 1 ? 1 : Math.sqrt(1 - edgeTaper * edgeTaper); //1 - Math.pow(majorR, -5 * edgeTaper));
};

/**
 * Creates a torsion function that generates a 3D vector based on the given parameters.
 *
 * @param scaleA - The scaling factor for the x-axis.
 * @param scaleB - The scaling factor for the y-axis.
 * @param scaleC - The scaling factor for the z-axis.
 * @param majorR - The major radius of the torsion.
 * @param minorR - The minor radius of the torsion.
 * @param twist - The amount of twist applied to the torsion.
 * @param twistAll - A boolean indicating whether to apply the twist to the entire torsion.
 * @param inflate - The amount of inflation applied to the torsion.
 * @returns A function that generates a 3D vector based on the given parameters.
 */
const torsion = (
    scaleA: number,
    scaleB: number,
    scaleC: number,
    majorR: number,
    minorR: number,
    twist: number,
    twistAll: boolean,
    inflate: number,
) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        const smoothTwist = twistMesh(twistAll, u, twist, 0, 1);

        u *= 2 * Math.PI;
        v *= 2 * Math.PI;

        const inflation = inflateMesh(inflate, u);
        const squared = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const x = scaleA * (majorR + minorR * squared * inflation * Math.cos(v + smoothTwist)) * Math.cos(u);
        const y = scaleB * (majorR + minorR * squared * Math.cos(v + smoothTwist)) * Math.sin(u);
        const z = scaleC * squared * inflation * Math.sin(v + smoothTwist);

        target.set(x, y, z);
    };
};

/**
 * Creates a tapered torsion function that generates a 3D vector based on the given parameters.
 *
 * @param scaleA - The scaling factor for the x-axis.
 * @param scaleB - The scaling factor for the y-axis.
 * @param scaleC - The scaling factor for the z-axis.
 * @param majorR - The major radius of the torsion.
 * @param minorR - The minor radius of the torsion.
 * @param twist - The amount of twist applied to the torsion.
 * @param twistAll - A boolean indicating whether the twist should be applied to all points.
 * @param screw - The amount of screw applied to the torsion.
 * @returns A function that generates a 3D vector based on the given parameters.
 */
const taperedTorsion = (
    scaleA: number,
    scaleB: number,
    scaleC: number,
    majorR: number,
    minorR: number,
    twist: number,
    twistAll: boolean,
    screw: number,
) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        const smoothTwist = twistMesh(twistAll, u, twist, 0, 1);
        const taper = taperEdge(u, 0.1, 0.9);

        u *= 1.8 * Math.PI;
        v *= 2 * Math.PI;

        const squared = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const x = scaleA * (majorR + minorR * taper * squared * Math.cos(v + smoothTwist)) * Math.cos(u);
        const y = scaleB * (majorR + minorR * taper * squared * Math.cos(v + smoothTwist)) * Math.sin(u);
        const z = scaleC * taper * squared * Math.sin(v + smoothTwist) + (screw * u) / Math.PI;

        target.set(x, y, z);
    };
};

/**
 * Renders a torsion ring mesh.
 *
 * @param mesh - The reference to the mesh object.
 * @param meshColor - The color of the mesh.
 * @param majorR - The major radius of the torsion ring.
 * @param minorR - The minor radius of the torsion ring.
 * @param twistAll - A flag indicating whether to twist all sections of the ring.
 * @param twist - The amount of twist to apply to the ring.
 * @param inflate - The amount of inflation to apply to the ring.
 * @param scaleA - The scale factor for the A dimension of the ring.
 * @param scaleB - The scale factor for the B dimension of the ring.
 * @param scaleC - The scale factor for the C dimension of the ring.
 * @param stacks - The number of stacks in the ring geometry.
 * @param roughness - The roughness of the material.
 * @param metalness - The metalness of the material.
 */
export const TorsionRing = ({
    mesh,
    meshColor,
    majorR,
    minorR,
    twistAll,
    twist,
    inflate,
    scaleA,
    scaleB,
    scaleC,
    stacks,
    roughness,
    metalness,
}: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = torsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, inflate!);

        const ringMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist) * 2, stacks);
        ringMesh.deleteAttribute('normal');
        ringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(ringMesh, 0.01);
        mergedVertices.computeVertexNormals();

        const meshRotation = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        mergedVertices.applyMatrix4(meshRotation);

        return mergedVertices;
    }, [majorR, minorR, twistAll, twist, inflate, scaleA, scaleB, scaleC, stacks]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, Math.PI)}>
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};

/**
 * Renders a torsion bracelet mesh.
 *
 * @param mesh - The reference to the mesh object.
 * @param meshColor - The color of the mesh.
 * @param majorR - The major radius of the bracelet.
 * @param minorR - The minor radius of the bracelet.
 * @param twistAll - The twist applied to all sections of the bracelet.
 * @param twist - The twist applied to each section of the bracelet.
 * @param scaleA - The scale factor for the A dimension of the bracelet.
 * @param scaleB - The scale factor for the B dimension of the bracelet.
 * @param scaleC - The scale factor for the C dimension of the bracelet.
 * @param stacks - The number of stacks in the bracelet.
 * @param screw - The screw parameter for the bracelet.
 * @param roughness - The roughness of the material.
 * @param metalness - The metalness of the material.
 */
export const TorsionBracelet = ({
    mesh,
    meshColor,
    majorR,
    minorR,
    twistAll,
    twist,
    scaleA,
    scaleB,
    scaleC,
    stacks,
    screw,
    roughness,
    metalness,
}: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = taperedTorsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, screw!);

        const braceletMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist) * 2, stacks);
        braceletMesh.deleteAttribute('normal');
        braceletMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(braceletMesh, 0.02);
        mergedVertices.computeVertexNormals();

        const meshRotation = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        mergedVertices.applyMatrix4(meshRotation);

        return mergedVertices;
    }, [majorR, minorR, stacks, twist, twistAll, screw, scaleA, scaleB, scaleC]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};

/**
 * Renders a torsion earring mesh.
 *
 * @param mesh - The reference to the mesh object.
 * @param meshColor - The color of the mesh.
 * @param majorR - The major radius of the earring.
 * @param minorR - The minor radius of the earring.
 * @param twistAll - The overall twist of the earring.
 * @param twist - The twist of each segment of the earring.
 * @param inflate - The amount of inflation of the earring.
 * @param scaleA - The scale factor along the x-axis.
 * @param scaleB - The scale factor along the y-axis.
 * @param scaleC - The scale factor along the z-axis.
 * @param stacks - The number of stacks in the earring.
 * @param roughness - The roughness of the material.
 * @param metalness - The metalness of the material.
 */
export const TorsionEarring = ({
    mesh,
    meshColor,
    majorR,
    minorR,
    twistAll,
    twist,
    inflate,
    scaleA,
    scaleB,
    scaleC,
    stacks,
    roughness,
    metalness,
}: TorsionProps) => {
    const holderPoints = makeCircleCurve2D(100);

    const geometry = useMemo(() => {
        const func = torsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, inflate!);

        const earringMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist) * 3, stacks);
        earringMesh.deleteAttribute('normal');
        earringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(earringMesh, 0.01);

        const holderPath = new THREE.CatmullRomCurve3(holderPoints);
        const holderMesh = new THREE.TubeGeometry(holderPath, 32, 0.3, 32, true);
        holderMesh.deleteAttribute('uv');
        holderMesh.deleteAttribute('normal');

        const rotationHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotationHolder);
        const translateHolder = new THREE.Matrix4().makeTranslation(majorR + minorR + 0.5, 0, 0);
        holderMesh.applyMatrix4(translateHolder);

        const mergedGeometries = BufferGeometryUtils.mergeGeometries([mergedVertices, holderMesh]);
        mergedGeometries.computeVertexNormals();

        return mergedGeometries;
    }, [holderPoints, stacks, twistAll, twist, scaleA, scaleB, scaleC, majorR, minorR, inflate]);

    return (
        <mesh
            ref={mesh}
            geometry={geometry}
            position={[0, 0, 0]}
            rotation={new THREE.Euler(0, Math.PI / 2, Math.PI / 2)}
        >
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};

/**
 * Renders a torsion pendant.
 *
 * @param mesh - The reference to the mesh.
 * @param meshColor - The color of the mesh.
 * @param majorR - The major radius.
 * @param minorR - The minor radius.
 * @param twistAll - The twist for all sections.
 * @param twist - The twist for each section.
 * @param inflate - The inflation factor.
 * @param scaleA - The scale factor for the x-axis.
 * @param scaleB - The scale factor for the y-axis.
 * @param scaleC - The scale factor for the z-axis.
 * @param stacks - The number of stacks.
 * @param metalness - The metalness of the material.
 * @param roughness - The roughness of the material.
 */
export const TorsionPendant = ({
    mesh,
    meshColor,
    majorR,
    minorR,
    twistAll,
    twist,
    inflate,
    scaleA,
    scaleB,
    scaleC,
    stacks,
    metalness,
    roughness,
}: TorsionProps) => {
    const holderPoints = makeCircleCurve2D(100);

    const geometry = useMemo(() => {
        const func = torsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, inflate!);

        const earringMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist) * 3, stacks);
        earringMesh.deleteAttribute('normal');
        earringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(earringMesh, 0.01);

        const holderPath = new THREE.CatmullRomCurve3(holderPoints);
        const holderMesh = new THREE.TubeGeometry(holderPath, 32, 0.3, 32, true);
        holderMesh.deleteAttribute('uv');
        holderMesh.deleteAttribute('normal');

        const rotationHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotationHolder);
        const translateHolder = new THREE.Matrix4().makeTranslation(scaleA * (majorR + minorR + 0.5), 0, 0);
        holderMesh.applyMatrix4(translateHolder);

        const mergedGeometries = BufferGeometryUtils.mergeGeometries([mergedVertices, holderMesh]);
        mergedGeometries.computeVertexNormals();

        return mergedGeometries;
    }, [holderPoints, stacks, twistAll, twist, scaleA, scaleB, scaleC, majorR, minorR, inflate]);

    return (
        <mesh
            ref={mesh}
            geometry={geometry}
            position={[0, 0, 0]}
            rotation={new THREE.Euler(0, Math.PI / 2, Math.PI / 2)}
        >
            <meshStandardMaterial attach="material" color={meshColor} metalness={metalness} roughness={roughness} />
        </mesh>
    );
};
