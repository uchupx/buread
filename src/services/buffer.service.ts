export interface Base64Utils {
    base64ToArrayBuffer(base64: string): ArrayBuffer;
    arrayBufferToBase64(arrayBuffer: ArrayBuffer): string;
    arrayBufferToDataUrl(arrayBuffer: ArrayBuffer, mimeType?: string): string;
    dataUrlToArrayBuffer(dataUrl: string): ArrayBuffer;
}

// arrayBufferUtils.ts
export const arrayBufferUtils: Base64Utils = {
    // Base64 to ArrayBuffer
    base64ToArrayBuffer(base64: string): ArrayBuffer {
        // Remove data URL prefix if present
        const base64Data = base64.replace(/^data:.*?base64,/, '');

        // Decode base64 to binary string
        const binaryString = atob(base64Data);

        // Create Uint8Array from binary string
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Return the ArrayBuffer
        return bytes.buffer;
    },

    // ArrayBuffer to Base64
    arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
        // Convert ArrayBuffer to Uint8Array
        const bytes = new Uint8Array(arrayBuffer);

        // Convert to binary string
        let binaryString = '';
        for (let i = 0; i < bytes.length; i++) {
            binaryString += String.fromCharCode(bytes[i]);
        }

        // Convert to base64
        return btoa(binaryString);
    },

    // Create data URL from ArrayBuffer
    arrayBufferToDataUrl(arrayBuffer: ArrayBuffer, mimeType: string = 'application/octet-stream'): string {
        const base64 = this.arrayBufferToBase64(arrayBuffer);
        return `data:${mimeType};base64,${base64}`;
    },

    // Get ArrayBuffer from data URL
    dataUrlToArrayBuffer(dataUrl: string): ArrayBuffer {
        return this.base64ToArrayBuffer(dataUrl);
    }
};
