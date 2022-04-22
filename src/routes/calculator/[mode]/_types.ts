export interface QueryParams {
    acc?: number; //acc
    sr?: number; //starRating
    pp?: number; //targetPP
    sv?: number; //starValue
    c?: string; //curve
}
export type CalculatorMode = 'pp' | 'stars';
