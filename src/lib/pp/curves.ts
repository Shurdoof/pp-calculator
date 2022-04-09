export type CurvePoint = [number, number];
export type CurvePointList = CurvePoint[];

export interface Curve {
    id?: string;
    name: string;
    points: CurvePointList;
}

export const fernCurve: Curve = {
    id: 'fern',
    name: 'Fern (previous)',
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
    name: 'DuhhelRamenV5™ (current)',
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

export function getCurveById(id: string) {
    return curves.find(x => x.id === id);
}

export const curves = [duhhelRamenV5Curve, fernCurve];
