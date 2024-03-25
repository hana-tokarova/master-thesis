import { useMemo } from 'react';
import * as THREE from 'three';
import { Euler } from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

type MeshRef = React.RefObject<THREE.Mesh>;

type TorsionProps = {
    mesh: MeshRef;
    meshColor: string;
    slices: number;
    stacks: number;
    majorR: number;
    minorR: number;
    twistAll: boolean;
    twist: number;
    height: number;
    inflate?: number;
    screw?: number
}

const smoothStep = (edge0: number, edge1: number, x: number) => {
    x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));

    // return x * x * (3 - 2 * x);
    // return x * x * x * 5;
    return x * x * x * (x * (x * 6 - 15) + 10);
};

const inflateMesh = (inflate: number, u: number) => {
    let inflateX;
    let inflateZ;

    if (inflate === undefined) {
        inflateX = 1;
        inflateZ = 1;
    } else {
        inflateX = (u > Math.PI / 2 && u < 3 * (Math.PI / 2)) ? inflate * (u / 2) : 1;
        inflateZ = (u > Math.PI / 2 && u < 3 * (Math.PI / 2)) ? (1 + inflate * (Math.cos(u - Math.PI))) : 1;
    }

    return { inflateX, inflateZ };
}

const twistMesh = (twistAll: boolean, u: number, twist: number, start: number, end: number) => {
    let smoothTwist;

    if (twistAll) {
        smoothTwist = twist;
    } else {
        let t;

        if (u >= start && u <= end) {
            t = twist * Math.sin(u * Math.PI);
        } else {
            t = 0;
        }

        smoothTwist = t * smoothStep(start, end, u) * smoothStep(end, start, u);
    }

    return smoothTwist;
}

const torsion = (
    scaleA: number,
    scaleB: number,
    scaleC: number,
    majorR: number,
    minorR: number,
    twist: number,
    twistAll: boolean,
    inflate?: number
) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        const smoothTwist = twistMesh(twistAll, u, twist, 0.10, 0.90);

        u *= 2 * Math.PI;
        v *= 2 * Math.PI;

        const { inflateX, inflateZ } = inflateMesh(inflate!, u);
        const squared = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const x = scaleA * (majorR + minorR * squared * inflateX * Math.cos(v + smoothTwist * u)) * Math.cos(u);
        const y = scaleB * (majorR + minorR * squared * Math.cos(v + smoothTwist * u)) * Math.sin(u);
        const z = scaleC * squared * inflateZ * Math.sin(v + smoothTwist * u);

        target.set(x, y, z);
    };
};

const calculateDetail2D = (majorR: number, twist: number) => {
    const detail = Math.floor((majorR * 2 * Math.PI * Math.abs(twist === 0 ? 1 : twist)));
    return detail > 1000 ? 1000 : detail;
}

const taperedTorsion = (majorR: number, minorR: number, taper: boolean, twistAll: boolean, twist: number, height: number, screw: number) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        const smoothStep = (edge0: number, edge1: number, x: number) => {
            x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
            // return x * x * (3 - 2 * x);
            return x * x * x * (x * (x * 6 - 15) + 10);
            // return x * x * x * 5;
        };

        const startTwistU = 0.10;
        const endTwistU = 0.90;

        let t;
        let smoothT;

        if (twistAll) {
            t = twist;
            smoothT = t;
        } else {
            if (u >= startTwistU && u <= endTwistU) {
                t = twist * Math.sin(u * Math.PI);
            } else {
                t = 0;
            }

            smoothT = t * smoothStep(startTwistU, endTwistU, u) * smoothStep(endTwistU, startTwistU, u);
        }

        let edgeTaper = 1;

        const upperEdgeFalloff = 0.90;
        const lowerEdgeFalloff = 1 - upperEdgeFalloff;

        if (u > upperEdgeFalloff) {
            // When we are ending the twist, we want to taper the edge
            edgeTaper = (1 - u) / (1 - upperEdgeFalloff);
        } else if (u < lowerEdgeFalloff) {
            // When we are starting the twist, we want to taper the edge
            edgeTaper = u / (lowerEdgeFalloff);
        }

        if (taper) {
            edgeTaper = edgeTaper === 1 ? 1 : Math.max(0.00001, 1 - Math.pow(majorR, -5 * edgeTaper));
            u *= 1.8 * Math.PI; // Adjust for 3/4 of a circle
        } else {
            edgeTaper = 1;
            u *= 2 * Math.PI;
        }

        v *= 2 * Math.PI;

        const edge = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const x = (majorR + minorR * Math.cos(v + smoothT * u) * edgeTaper * edge) * Math.cos(u);
        const y = (majorR + minorR * Math.cos(v + smoothT * u) * edgeTaper * edge) * Math.sin(u);
        const z = height * edgeTaper * edge * minorR * Math.sin(v + smoothT * u) + ((screw * u) / Math.PI);

        target.set(x, y, z);
    };
}

export const TorsionRing = ({ mesh, meshColor, majorR, minorR, twistAll, twist, inflate, height, stacks }: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = torsion(1, 1, height, majorR, minorR, twist, twistAll, inflate!);

        const ringMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist), stacks);
        ringMesh.deleteAttribute('normal');
        ringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(ringMesh, 0.01);
        mergedVertices.computeVertexNormals();

        return mergedVertices;
    }, [majorR, minorR, twistAll, twist, inflate, height, stacks]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, Math.PI)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
};

// export const TorsionBracelet = ({ mesh, meshColor, stacks, majorR, minorR, twistAll, taper, twist, height, slices, screw }: TorsionProps) => {
//     const geometry = useMemo(() => {
//         const func = taperedTorsion(majorR, minorR, taper, twistAll, twist, height, screw!);

//         const braceletMesh = new ParametricGeometry(func, slices, stacks);
//         braceletMesh.deleteAttribute('normal');
//         braceletMesh.deleteAttribute('uv');
//         const mergedVertices = BufferGeometryUtils.mergeVertices(braceletMesh, 0.01);
//         mergedVertices.computeVertexNormals();

//         return mergedVertices;
//     }, [majorR, minorR, stacks, taper, slices, twist, twistAll, screw, height]);

//     return (
//         <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, 0)}>
//             <meshLambertMaterial attach="material" color={meshColor} />
//         </mesh>
//     );
// }

export const TorsionEarring = ({ mesh, meshColor, majorR, slices, stacks, twistAll, twist }: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = torsion(10, 10, 10, majorR, 3, twist, twistAll, 0.7);

        const earringMesh = new ParametricGeometry(func, slices, stacks);
        earringMesh.deleteAttribute('normal');
        earringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(earringMesh, 0.01);
        mergedVertices.computeVertexNormals();

        return mergedVertices;
    }, [slices, stacks, twistAll, twist]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, Math.PI / 4, Math.PI / 2)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
};
