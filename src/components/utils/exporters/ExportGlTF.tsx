import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { saveArrayBuffer, saveString } from './Saving';

/**
 * Export a mesh as a glTF file.
 * @param mesh - The mesh to export.
 * @param name - The name of the exported file.
 */
export const exportMeshGlTF = (mesh: THREE.Mesh, name: string) => {
    const clonedMesh = mesh.clone();
    const scene = mesh.parent!;

    const options = {
        trs: false,
        onlyVisible: true,
        binary: false,
        maxTextureSize: 4096,
    };

    const exporter = new GLTFExporter();
    exporter.parse(
        scene,
        function (data) {
            if (data instanceof ArrayBuffer) {
                saveArrayBuffer(data, name + '-' + clonedMesh.uuid + '.glb');
            } else {
                const output = JSON.stringify(data, null, 2);
                saveString(output, name + '-' + clonedMesh.uuid + '.gltf');
            }
        },
        function (error) {
            console.log('An error happened during parsing', error);
        },
        options,
    );
};
