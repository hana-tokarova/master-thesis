import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { saveString } from './Saving';

/**
 * Exports a THREE.Mesh object as an OBJ file.
 *
 * @param mesh - The mesh to be exported.
 * @param name - The name of the exported file.
 */
export const exportMeshOBJ = (mesh: THREE.Mesh, name: string) => {
    const clonedMesh = mesh.clone();
    const scene = mesh.parent!;

    const exporter = new OBJExporter();
    const data = exporter.parse(scene);

    saveString(data, name + '-' + clonedMesh.uuid + '.obj');
};
