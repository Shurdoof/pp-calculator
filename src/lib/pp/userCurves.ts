import type { Curve } from './curves';

const key = 'curves';

export function getUserCurves(): Curve[] {
    try {
        const userData = window.localStorage.getItem(key);

        if (!userData) {
            return [];
        }

        return JSON.parse(userData);
    } catch (e) {
        return [];
    }
}

export function addUserCurve(curve: Curve): Curve[] {
    const curves = [...getUserCurves(), curve];

    window.localStorage.setItem(key, JSON.stringify(curves));
    return curves;
}

export function removeUserCurve(index: number): Curve[] {
    var curves = getUserCurves();
    curves.splice(index, 1);

    window.localStorage.setItem(key, JSON.stringify(curves));
    return curves;
}
