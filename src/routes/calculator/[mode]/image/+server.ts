// import { json } from '@sveltejs/kit';
import { builtInStarMultipliers, type CalculationResult } from '$lib/pp/calculator';

import type { RequestHandler } from '@sveltejs/kit';
import { doCalculationRequest } from '../_helper';
import { createCanvas, registerFont } from 'canvas';
import { getCurveById } from '$lib/pp/curves';

function formatNumber(num: number) {
    return +num.toFixed(2);
}

class Point {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

function createImage(calculation: CalculationResult) {
    registerFont('fonts/OpenSans-Regular.ttf', { family: 'Open Sans' });
    registerFont('fonts/NotoSansJP-Regular.otf', { family: 'Noto Sans' });

    const sectionHeight = 70;
    const footerHeight = 34;
    const sectionSize = 150;
    const width = sectionSize * 3;
    const height = sectionHeight + footerHeight * 2;
    const borderColor = '#2F2F2F';
    const textColor = '#D4D4D4';

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const setFontSize = (size: number) => {
        ctx.font = `${size}px Open Sans, Noto Sans`;
    };

    const background = (color: string) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(0, 0, width, height);
        ctx.fill();
    };

    const border = (borderSize: number) => {
        ctx.beginPath();
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderSize;
        ctx.rect(0, 0, width, height);
        ctx.stroke();
    };

    const line = (start: Point, end: Point) => {
        ctx.beginPath();
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    };

    const section = (title: string, text: string, position: number) => {
        ctx.beginPath();
        const startX = position * sectionSize;

        ctx.fillStyle = textColor;
        setFontSize(20);
        ctx.fillText(title, startX + 10, 25);
        setFontSize(24);
        ctx.fillText(text, startX + 10, 56);

        line(new Point(startX + sectionSize, 0), new Point(startX + sectionSize, sectionHeight));
    };

    const footerStart = sectionHeight;
    const footer = (text: string, position: number = 0) => {
        const startY = footerStart + footerHeight * position;
        line(new Point(0, startY), new Point(width, startY));
        ctx.beginPath();
        ctx.fillStyle = textColor;
        setFontSize(16);
        ctx.fillText(text, 10, startY + 22);
    };

    const builtInMultiplier = builtInStarMultipliers.find(x => x.value === calculation.starMultiplier);
    const builtInCurve = calculation.curve.id ? getCurveById(calculation.curve.id) : null;

    background('#1C1C1C');
    section('Accuracy', formatNumber(calculation.acc) + '%', 0);
    section('Star rating', formatNumber(calculation.stars) + '★', 1);
    section('PP', formatNumber(calculation.pp) + 'pp', 2);
    footer(`Curve: ${calculation.curve.name}` + (builtInCurve ? '' : ' (custom)'), 0);
    footer(`Star value: ${calculation.starMultiplier}` + (builtInMultiplier ? ` (${builtInMultiplier.name})` : ''), 1);
    border(4);

    return canvas.toBuffer();
}

export const GET: RequestHandler = data => {
    const result = doCalculationRequest(data);

    if (result.status !== 200) {
        return result.toResponse();
    }

    const image = createImage(result.calculation);

    return new Response(image, {
        headers: {
            'Content-Type': 'image/png'
        }
    });
};
