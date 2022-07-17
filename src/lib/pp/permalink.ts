import { toBase64Safe } from '$lib/utils/base64';
import type { CalculationResult } from './calculator';
import { getCurveById } from './curves';
import { stringifyCurve } from './parser';

type LinkType = 'json' | 'image' | 'web';

export function generatePermalink(calculation: CalculationResult, type: LinkType, baseUrl: string) {
    const isBuiltInCurve = calculation.curve.id && getCurveById(calculation.curve.id);
    const queryValues = {
        acc: calculation.acc,
        sr: calculation.stars,
        pp: calculation.pp,
        sv: calculation.starMultiplier,
        c: isBuiltInCurve ? calculation.curve.id : toBase64Safe(stringifyCurve(calculation.curve, { pretty: false, includeMetadata: true }))
    };

    if (calculation.calculationType === 'pp') {
        delete queryValues.pp;
    } else if (calculation.calculationType === 'stars') {
        delete queryValues.sr;
    }

    const params = new URLSearchParams();
    for (const key of Object.keys(queryValues)) {
        if (queryValues[key] != null) {
            params.set(key, queryValues[key]);
        }
    }

    let url = `${baseUrl}/calculator/${calculation.calculationType}`;

    if (type !== 'web') {
        url += '/' + type;
    }
    url += '?' + params.toString();

    return url;
}
