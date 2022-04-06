export function clamp(value: number, min: number | null, max: number | null) {
    if (min !== null && value < min) {
        return min;
    }

    if (max !== null && value > max) {
        return max;
    }

    return value;
}

export function parseNullableNumber(value: number | string | null | undefined): number | null {
    if (value === null || value === undefined) {
        return null;
    }

    const num = +value;

    if (isNaN(num)) {
        return null;
    }

    return num;
}

export function generateRangeArray(start: number, end: number, step: number = 1) {
    const result = [];

    if (start > end) {
        const temp = start;
        start = end;
        end = temp;
        step *= -1;
    }

    for (var i = start; i <= end; i += step) {
        result.push(i);
    }

    return result;
}
