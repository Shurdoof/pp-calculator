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

export interface StringifyCurveOptions {
    direction?: PointListDisplayDirection;
    pretty?: boolean;
    includeMetadata?: boolean;
}

export class StringifyCurveOptions {
    static defaults(): StringifyCurveOptions {
        return {
            direction: 'desc',
            includeMetadata: true,
            pretty: true
        };
    }
}

//Yes I know it's ugly, but JSON.stringify doesn't format it like I want.
export function stringifyCurve(curve: Curve, options: StringifyCurveOptions = null) {
    options = { ...StringifyCurveOptions.defaults(), ...options };

    const parts = [];
    const indentString = options.pretty ? '    ' : '';
    let indent = 0;

    const addPart = (value: string) => {
        parts.push(indentString.repeat(indent) + value);
    };
    const escape = (value: any) => {
        return JSON.stringify(value);
    };

    if (options.includeMetadata) {
        addPart('{');
        indent += 1;
        addPart(`${escape('name')}: ${escape(curve.name)} ,`);
        addPart(`${escape('points')}: [`);
        indent += 1;
    } else {
        addPart(`[`);
        indent += 1;
    }

    let points = curve.points;
    if (options.direction === 'asc') {
        points = points.slice().sort((a, b) => a[0] - b[0]);
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

    if (options.includeMetadata) {
        indent -= 1;
        addPart('}');
    }

    return parts.join(options.pretty ? '\n' : '');
}
