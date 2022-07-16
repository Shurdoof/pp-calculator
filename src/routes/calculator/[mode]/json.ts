import { doCalculationRequest } from './_helper';

export async function GET(data) {
    const result = doCalculationRequest(data);
    return result;
}
