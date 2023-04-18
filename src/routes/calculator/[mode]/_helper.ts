import { calculatePP, calculateStars, type CalculationResult } from '$lib/pp/calculator';

import { getInitialCurve } from '$lib/pp/curves';
import { parseNullableNumber } from '$lib/utils/numbers';
import type { CalculatorMode, QueryParams } from './_types';

// export interface Response {
//     status: number;
//     body: CalculationResult | Error;
// }

class CalculationResponse {
    constructor(status: number, calculation: CalculationResult = null) {
        this.status = status;
        this.calculation = calculation;
    }

    toResponse() {
        if (this.status === 200 && this.calculation) {
            return new Response(JSON.stringify(this.calculation), {
                status: 200
            });
        } else if (this.status === 400) {
            return new Response('Bad request', {
                status: 400
            });
        } else if (this.status === 404) {
            return new Response('Not found', {
                status: 404
            });
        }

        return new Response('Server error', {
            status: 500
        });
    }

    static badRequest() {
        return new CalculationResponse(400);
    }

    static notFound() {
        return new CalculationResponse(404);
    }

    static ok(calculation: CalculationResult) {
        return new CalculationResponse(200, calculation);
    }

    readonly status: number;
    readonly calculation: CalculationResult | null;
}

export function doCalculationRequest({ url, params }): CalculationResponse {
    const mode: CalculatorMode = params.mode as CalculatorMode;
    const query: URLSearchParams = url.searchParams;
    function getQueryValue(...keys: (keyof QueryParams)[]) {
        for (const key of keys) {
            const value = query.get(key);
            if (value != null) {
                return value;
            }
        }

        return undefined;
    }

    const curve = getInitialCurve(getQueryValue('c'));
    let starMultiplier = parseNullableNumber(getQueryValue('sv'));

    if (!curve) {
        return CalculationResponse.badRequest();
    }

    if (starMultiplier === null) {
        starMultiplier = undefined;
    }

    if (mode === 'pp') {
        const acc = parseNullableNumber(getQueryValue('acc'));
        const starRating = parseNullableNumber(getQueryValue('sr'));

        if (acc === null || starRating === null) {
            return CalculationResponse.badRequest();
        }

        const calculation = calculatePP(curve, acc, starRating, starMultiplier);
        return CalculationResponse.ok(calculation);
    } else if (mode === 'stars') {
        const acc = parseNullableNumber(getQueryValue('acc'));
        const targetPP = parseNullableNumber(getQueryValue('pp'));

        if (acc === null || targetPP === null) {
            return CalculationResponse.badRequest();
        }

        const calculation = calculateStars(curve, acc, targetPP, starMultiplier);
        return CalculationResponse.ok(calculation);
    }

    return CalculationResponse.notFound();
}

function ok(body: CalculationResult): Response {
    return new Response(JSON.stringify(body), {
        status: 200
    });
}

function badRequest(): Response {
    return new Response('Bad request', {
        status: 400
    });
}

function notFound(): Response {
    return new Response('Not found', {
        status: 404
    });
}
