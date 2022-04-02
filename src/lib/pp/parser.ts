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

//Yes I know it's ugly, but JSON.stringify doesn't format it like I want.
export function stringifyCurve(curve: Curve) {
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
    for (let i = 0; i < curve.points.length; i++) {
        const point = curve.points[i];
        let part = `[${escape(point[0])}, ${escape(point[1])}]`;

        if (i < curve.points.length - 1) {
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
