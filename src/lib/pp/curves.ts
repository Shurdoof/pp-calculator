import { fromBase64Safe } from '$lib/utils/base64';

export type CurvePoint = [number, number];
export type CurvePointList = CurvePoint[];

export interface Curve {
    id?: string;
    name: string;
    points: CurvePointList;
}

const fernCurve: Curve = {
    id: 'fern',
    name: 'Fern (before reweight 2)',
    points: [
        [1, 1.5],
        [0.99, 1.39],
        [0.98, 1.29],
        [0.97, 1.2],
        [0.96, 1.115],
        [0.95, 1.046],
        [0.945, 1.015],
        [0.925, 0.905],
        [0.9, 0.78],
        [0.86, 0.6],
        [0.8, 0.42],
        [0.75, 0.3],
        [0.7, 0.22],
        [0.65, 0.15],
        [0.6, 0.105],
        [0.55, 0.06],
        [0.5, 0.03],
        [0.45, 0.015],
        [0, 0]
    ]
};

const duhhelRamenV5Curve: Curve = {
    id: 'duhhelramenv5',
    name: 'DuhhelRamenV5™ (reweight 2/3)',
    points: [
        [1, 7],
        [0.999, 5.8],
        [0.9975, 4.7],
        [0.995, 3.76],
        [0.9925, 3.17],
        [0.99, 2.73],
        [0.9875, 2.38],
        [0.985, 2.1],
        [0.9825, 1.88],
        [0.98, 1.71],
        [0.9775, 1.57],
        [0.975, 1.45],
        [0.9725, 1.37],
        [0.97, 1.31],
        [0.965, 1.2],
        [0.96, 1.11],
        [0.955, 1.045],
        [0.95, 1],
        [0.94, 0.94],
        [0.93, 0.885],
        [0.92, 0.835],
        [0.91, 0.79],
        [0.9, 0.75],
        [0.875, 0.655],
        [0.85, 0.57],
        [0.825, 0.51],
        [0.8, 0.47],
        [0.75, 0.4],
        [0.7, 0.34],
        [0.65, 0.29],
        [0.6, 0.25],
        [0.0, 0.0]
    ]
};

const duhhelRamenV6Curve: Curve = {
    id: 'duhhelramenv6',
    name: 'DuhhelRamenV6™ (current)',
    points: [
        [1, 7],
        [0.999, 6.24],
        [0.9975, 5.31],
        [0.995, 4.14],
        [0.9925, 3.31],
        [0.99, 2.73],
        [0.9875, 2.31],
        [0.985, 2.0],
        [0.9825, 1.775],
        [0.98, 1.625],
        [0.9775, 1.515],
        [0.975, 1.43],
        [0.9725, 1.36],
        [0.97, 1.3],
        [0.965, 1.195],
        [0.96, 1.115],
        [0.955, 1.05],
        [0.95, 1],
        [0.94, 0.94],
        [0.93, 0.885],
        [0.92, 0.835],
        [0.91, 0.79],
        [0.9, 0.75],
        [0.875, 0.655],
        [0.85, 0.57],
        [0.825, 0.51],
        [0.8, 0.47],
        [0.75, 0.4],
        [0.7, 0.34],
        [0.65, 0.29],
        [0.6, 0.25],
        [0.0, 0.0]
    ]
};

const AutogenV1Curve: Curve = {
    id: 'autogenv1',
    name: 'Automatically Generated Curve V1',
    points: [
        [1, 4.727222569345836],
        [0.999, 4.183298838676206],
        [0.9975, 3.5829190154366866],
        [0.995, 2.917512961274726],
        [0.9925, 2.483292273304647],
        [0.99, 2.178257856263519],
        [0.9875, 1.9527178593532315],
        [0.985, 1.7795676509316811],
        [0.9825, 1.6427657270667513],
        [0.98, 1.5322118931158653],
        [0.9775, 1.4536016113447345],
        [0.975, 1.3623627767160782],
        [0.9725, 1.2988614173103636],
        [0.97, 1.234242250779399],
        [0.965, 1.1478983741781785],
        [0.96, 1.0826957418843604],
        [0.955, 1.0371738162226438],
        [0.95, 1],
        [0.94, 0.9424011840342629],
        [0.93, 0.9050914673121424],
        [0.92, 0.8739233814502211],
        [0.91, 0.849831071358295],
        [0.9, 0.8264069894626781],
        [0.875, 0.7819595631288517],
        [0.85, 0.7456233272557902],
        [0.825, 0.7138278854355684],
        [0.8, 0.6848726835885682],
        [0.75, 0.640680166525368],
        [0.7, 0.6076226176560371],
        [0.65, 0.5813428954949926],
        [0.6, 0.5587983849970446],
        [0.5, 0.5432548793885742],
        [0.4, 0.23913188906513533],
        [0, 0]
    ]
};

let AutogenV2Curve: Curve = {
    id: 'autogenv2',
    name: 'Automatically Generated Curve V2 (next?)',
    points: [
        [1, 6.114501330729609],
        [0.999, 5.160678759790276],
        [0.9975, 4.207602771217416],
        [0.995, 3.256053625296696],
        [0.9925, 2.6866957535265437],
        [0.99, 2.3084777403152756],
        [0.9875, 2.039521551307855],
        [0.985, 1.8388891984856042],
        [0.9825, 1.683838295886749],
        [0.98, 1.560724282529348],
        [0.9775, 1.460865069786941],
        [0.975, 1.378473365633716],
        [0.9725, 1.3095433113047397],
        [0.97, 1.2512142741765848],
        [0.965, 1.1536295675610169],
        [0.96, 1.0858771685421904],
        [0.955, 1.037531271649277],
        [0.95, 1],
        [0.94, 0.9420843224383576],
        [0.93, 0.9041055796450138],
        [0.92, 0.8728450537019706],
        [0.91, 0.8480669902565677],
        [0.9, 0.8249120288151062],
        [0.875, 0.780107185816247],
        [0.85, 0.7434152589579301],
        [0.825, 0.7121502368387372],
        [0.8, 0.6830153694247597],
        [0.75, 0.6398469593802555],
        [0.7, 0.6067085504190337],
        [0.65, 0.5809427375875649],
        [0.6, 0.5569535065754503],
        [0.5, 0.5349677964802002],
        [0.4, 0.18012214788274766],
        [0, 0]
    ]
};

export function getCurveById(id: string) {
    return curves.find(x => x.id === id);
}

export function parseQueryStringCurve(value: string | undefined) {
    if (!value) {
        return;
    }

    try {
        const curveJson = fromBase64Safe(value);
        const parsedCurve = JSON.parse(curveJson);

        if (parsedCurve && Array.isArray(parsedCurve.points)) {
            return parsedCurve;
        }
    } catch (e) {
        console.warn('Failed to parse curve parameter', e);
    }
}

export function getInitialCurve(value: string | undefined, defaultCurve = curves[0]): Curve {
    if (!value) {
        return defaultCurve;
    }

    return getCurveById(value) || parseQueryStringCurve(value) || defaultCurve;
}

export const curves = [duhhelRamenV6Curve, AutogenV2Curve, AutogenV1Curve, duhhelRamenV5Curve, fernCurve];
