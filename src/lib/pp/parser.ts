import type { Curve, CurvePointList } from './curves';

function parseCurveData(value: string): CurvePointList {
    const obj = JSON.parse(value);

    if (!Array.isArray(obj)) {
        return null;
    }

    for (var item of obj) {
        if (!Array.isArray(item)) {
            return null;
        }

        if (typeof item[0] !== 'number' || typeof item[1] !== 'number') {
            return null;
        }
    }

    return obj;
}

export function parseCurve(name: string, pointsData: string): Curve {
    return {
        name,
        points: parseCurveData(pointsData)
    };
}
