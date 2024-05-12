/**
 * Saves a Blob as a file with the given filename.
 *
 * @param blob - The Blob to be saved as a file.
 * @param filename - The name of the file to be saved.
 */
const save = (blob: Blob, filename: string): void => {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

/**
 * Saves a string as a file with the given filename.
 *
 * @param text - The string to be saved as a file.
 * @param filename - The name of the file to be saved.
 */
export const saveString = (text: string, filename: string) => {
    save(new Blob([text], { type: 'text/plain' }), filename);
};

/**
 * Saves an ArrayBuffer or DataView as a file.
 *
 * @param buffer - The ArrayBuffer or DataView to be saved.
 * @param filename - The name of the file to be saved.
 */
export const saveArrayBuffer = (buffer: ArrayBuffer | DataView, filename: string) => {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
};
