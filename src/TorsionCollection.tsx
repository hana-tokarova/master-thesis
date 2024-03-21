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
    taper: boolean;
    twist: number;
    height: number;
    inflate?: number;
}

const torsionTwist = (s: number, majorR: number, minorR: number, twistAll: boolean, taper: boolean, twist: number, height: number, inflate?: number) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        const smoothStep = (edge0: number, edge1: number, x: number) => {
            x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
            // return x * x * (3 - 2 * x);
            // return x * x * x * (x * (x * 6 - 15) + 10);
            return x * x * x * 5;
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
                t = twist * Math.sin(u * Math.PI * twist); // tu sa da opravovat twisting
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
            edgeTaper = edgeTaper === 1 ? 1 : Math.max(0.00001, 1 - Math.pow(2, -15 * edgeTaper));
            u *= 1.8 * Math.PI; // Adjust for 3/4 of a circle
        } else {
            edgeTaper = 1;
            u *= 2 * Math.PI;
        }

        v *= 2 * Math.PI;

        const edge = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const cosV = Math.cos(v + smoothT * u);
        const sinV = Math.sin(v + smoothT * u);

        let inflateX;
        let inflateZ;

        if (inflate === undefined) {
            inflateX = 1;
            inflateZ = 1;
        } else {
            inflateX = (u > Math.PI / 2 && u < 3 * (Math.PI / 2)) ? inflate! * (u / 2) : 1;
            inflateZ = (u > Math.PI / 2 && u < 3 * (Math.PI / 2)) ? (1 + inflate! * (Math.cos(u - Math.PI))) : 1;
        }

        const x = (majorR + edge * minorR * inflateX * cosV * edgeTaper) * Math.cos(u);
        const y = (majorR + edge * minorR * cosV * edgeTaper) * Math.sin(u);
        const z = height * edgeTaper * edge * inflateZ * sinV;

        target.set(x, y, z);
    };
};


export const TorsionRing = ({ mesh, meshColor, slices, stacks, majorR, minorR, twistAll, taper, twist, inflate, height }: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = torsionTwist(4, majorR, minorR, twistAll, taper, twist, height, inflate!);

        const ringMesh = new ParametricGeometry(func, slices, stacks);
        ringMesh.deleteAttribute('normal');
        ringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(ringMesh, 0.01);
        mergedVertices.computeVertexNormals();

        return mergedVertices;
    }, [majorR, minorR, slices, stacks, twistAll, taper, twist, inflate, height]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, Math.PI)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
};

// export const TorsionBracelet = ({ mesh, meshColor, slices, stacks, majorR, minorR, twistAll, taper, twist, inflate }: TorsionProps) => {
//     const geometry = useMemo(() => {
//         const func = torsionTwist(4, majorR, minorR, twistAll, taper, twist, inflate!);

//         const braceletMesh = new ParametricGeometry(func, slices, stacks);
//         braceletMesh.deleteAttribute('normal');
//         braceletMesh.deleteAttribute('uv');
//         const mergedVertices = BufferGeometryUtils.mergeVertices(braceletMesh, 0.01);
//         mergedVertices.computeVertexNormals();
//         return mergedVertices;

//     }, [majorR, minorR, slices, stacks, twistAll, taper, twist, inflate]);

//     return (
//         <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, 0)}>
//             <meshLambertMaterial attach="material" color={meshColor} />
//         </mesh>
//     );
// }

// export const TorsionEarring = ({ mesh, meshColor, slices, stacks, majorR, minorR, twistAll, taper, twist }: TorsionProps) => {
//     const geometry = useMemo(() => {
//         const func = torsionTwist(4, majorR, minorR, twistAll, taper, twist);
//         return new ParametricGeometry(func, slices, stacks);
//     }, [majorR, minorR, slices, stacks, twistAll, taper, twist]);

//     return (
//         <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, Math.PI / 4, Math.PI / 2)}>
//             <meshLambertMaterial attach="material" color={meshColor} />
//         </mesh>
//     );
// };
