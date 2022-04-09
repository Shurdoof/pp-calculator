export function updateClipboard(newClip: string, success = () => {}, fail = () => {}) {
    navigator.clipboard.writeText(newClip).then(success, fail);
}
