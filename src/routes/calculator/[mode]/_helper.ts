import { calculatePP, calculateStars, type CalculationResult } from '$lib/pp/calculator';

import { getInitialCurve } from '$lib/pp/curves';
import { parseNullableNumber } from '$lib/utils/numbers';
import type { CalculatorMode, QueryParams } from './_types';

export interface Response {
    status: number;
    body: CalculationResult | Error;
}

export function doCalculationRequest({ url, params }): Response {
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
        return badRequest();
    }

    if (starMultiplier === null) {
        starMultiplier = undefined;
    }

    if (mode === 'pp') {
        const acc = parseNullableNumber(getQueryValue('acc'));
        const starRating = parseNullableNumber(getQueryValue('sr'));

        if (acc === null || starRating === null) {
            return badRequest();
        }

        const calculation = calculatePP(curve, acc, starRating, starMultiplier);
        return ok(calculation);
    } else if (mode === 'stars') {
        const acc = parseNullableNumber(getQueryValue('acc'));
        const targetPP = parseNullableNumber(getQueryValue('pp'));

        if (acc === null || targetPP === null) {
            return badRequest();
        }

        const calculation = calculateStars(curve, acc, targetPP, starMultiplier);
        return ok(calculation);
    }

    return notFound();
}

function ok(body: CalculationResult): Response {
    return {
        status: 200,
        body: body
    };
}

function badRequest(): Response {
    return {
        status: 400,
        body: Error('Bad request')
    };
}

function notFound(): Response {
    return {
        status: 404,
        body: Error('Not found')
    };
}
