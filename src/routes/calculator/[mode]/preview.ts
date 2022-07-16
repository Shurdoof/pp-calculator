import type { CalculationResult } from '$lib/pp/calculator';

import type { RequestHandler } from '@sveltejs/kit';
import { doCalculationRequest } from './_helper';
import { createCanvas, registerFont } from 'canvas';

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

async function createImage(calculation: CalculationResult) {
    registerFont('fonts/OpenSans-Regular.ttf', { family: 'Open Sans' });
    registerFont('fonts/NotoSansJP-Regular.otf', { family: 'Noto Sans' });

    const width = 450;
    const height = 110;
    const sectionSize = width / 3;
    const borderColor = '#2F2F2F';

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

    const sectionHeight = 70;
    const section = (title: string, text: string, position: number) => {
        ctx.beginPath();
        const startX = position * sectionSize;

        ctx.fillStyle = '#D4D4D4';
        setFontSize(20);
        ctx.fillText(title, startX + 10, 25);
        setFontSize(24);
        ctx.fillText(text, startX + 10, 56);

        line(new Point(startX + sectionSize, 0), new Point(startX + sectionSize, sectionHeight));
    };

    const footerStart = sectionHeight;
    const footer = (text: string) => {
        line(new Point(0, footerStart), new Point(width, footerStart));
        ctx.beginPath();
        ctx.fillStyle = '#D4D4D4';
        setFontSize(18);
        ctx.fillText(text, 10, footerStart + 26);
    };

    background('#1C1C1C');
    section('Accuracy', formatNumber(calculation.acc) + '%', 0);
    section('Star rating', formatNumber(calculation.stars) + '★', 1);
    section('PP', formatNumber(calculation.pp) + 'pp', 2);
    footer(`Curve: ${calculation.curve.name}`);
    border(4);

    return canvas.toBuffer();
}

export const GET: RequestHandler = async data => {
    const result = doCalculationRequest(data);

    if (result.status !== 200) {
        return {
            status: result.status,
            body: result.body as Error
        };
    }

    const image = await createImage(result.body as CalculationResult);

    return {
        status: 200,
        body: image
    };
};
