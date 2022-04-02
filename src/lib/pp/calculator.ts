import type { CurvePoint, CurvePointList } from "./curves";
const starsToPPRatio = 42.11;

function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

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

export function calculatePP(
  curve: CurvePointList,
  stars: number,
  acc: number
): CalculationResult {
  const ppValue = stars * starsToPPRatio;
  const modifier = findPPModifier(acc, curve); //curve.find((x) => x[0] <= acc)[1];

  const pp = modifier * ppValue;

  return {
    pp,
    ppValue,
    acc,
    stars,
  };
}
