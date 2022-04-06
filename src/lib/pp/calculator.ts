import { clamp } from '$lib/utils/numbers';
import type { CurvePoint, CurvePointList } from './curves';
const defaultStarMultiplier = 42.11;

function lerp(v0: number, v1: number, t: number) {
    // return (1 - t) * v0 + t * v1;
    return v0 + t * (v1 - v0);
}

function calculatePPModifier(c1: CurvePoint, c2: CurvePoint, acc: number) {
    const distance = (c2[0] - acc) / (c2[0] - c1[0]);
    return lerp(c2[1], c1[1], distance);
}

function findPPModifier(acc: number, curve: CurvePointList) {
    acc = clamp(acc, 0, 100) / 100;

    let prev: CurvePoint = curve[1];
    for (const item of curve) {
        if (item[0] <= acc) {
            return calculatePPModifier(item, prev, acc);
        }

        prev = item;
    }
}

export interface CalculationResult {
    pp: number;
    stars: number;
    acc: number;
    ppValue: number;
}

export function calculatePP(curve: CurvePointList, acc: number, stars: number, starMultiplier = defaultStarMultiplier): CalculationResult {
    const ppValue = stars * starMultiplier;
    const modifier = findPPModifier(acc, curve); //curve.find((x) => x[0] <= acc)[1];

    const pp = modifier * ppValue;

    return {
        pp,
        ppValue,
        acc,
        stars
    };
}

export function calculateStars(curve: CurvePointList, acc: number, targetPP: number, starMultiplier = defaultStarMultiplier): CalculationResult {
    const modifier = findPPModifier(acc, curve); //curve.find((x) => x[0] <= acc)[1];
    const stars = targetPP / starMultiplier / modifier;
    const ppValue = stars * starMultiplier;

    return {
        pp: targetPP,
        ppValue,
        acc,
        stars
    };
}
