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

    return obj.sort((a, b) => b[0] - a[0]);
}

export function parseCurve(name: string, pointsData: string): Curve {
    return {
        name,
        points: parseCurveData(pointsData)
    };
}

export type PointListDisplayDirection = 'asc' | 'desc';

//Yes I know it's ugly, but JSON.stringify doesn't format it like I want.
export function stringifyCurve(curve: Curve, direction: PointListDisplayDirection = 'desc') {
    const parts = [];
    const indentString = '    ';
    let indent = 0;

    const addPart = (value: string) => {
        parts.push(indentString.repeat(indent) + value);
    };
    const escape = (value: any) => {
        return JSON.stringify(value);
    };

    addPart('{');
    indent += 1;
    addPart(`${escape('name')}: ${escape(curve.name)} ,`);
    addPart(`${escape('points')}: [`);
    indent += 1;

    let points = curve.points;
    if (direction === 'asc') {
        points = points.slice(0).sort((a, b) => a[0] - b[0]);
    }

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        let part = `[${escape(point[0])}, ${escape(point[1])}]`;

        if (i < points.length - 1) {
            part += ',';
        }

        addPart(part);
    }
    indent -= 1;
    addPart(']');
    indent -= 1;
    addPart('}');

    return parts.join('\n');
}
