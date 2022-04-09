// export function toBase64Safe(str: string) {
//     return btoa(encodeURIComponent(str));
// }

// export function fromBase64Safe(str: string) {
//     return decodeURIComponent(atob(str));
// }
import { Buffer } from "buffer";

export function toBase64Safe(s: string): string {
    return Buffer.from(s, 'utf8').toString('base64');
}

export function fromBase64Safe(s: string): string {
    return Buffer.from(s, 'base64').toString('utf8');
}
