export function checkUrlParam(param: string, value: string): boolean {
    const urlParams = new URLSearchParams(window.location.search).get(param)?.split(",");
    if (urlParams && urlParams.includes(value)) {
        return true;
    }
    return false;
}