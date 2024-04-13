
const save = (blob: Blob, filename: string) => {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

export const saveString = (text: string, filename: string) => {
    save(new Blob([text], { type: 'text/plain' }), filename);
}

export const saveArrayBuffer = (buffer: ArrayBuffer | DataView, filename: string) => {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}