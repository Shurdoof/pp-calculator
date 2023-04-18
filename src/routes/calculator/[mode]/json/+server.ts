import type { RequestHandler } from '@sveltejs/kit';
import { doCalculationRequest } from '../_helper';

export const GET: RequestHandler = data => {
    const result = doCalculationRequest(data);
    return result.toResponse();
};
