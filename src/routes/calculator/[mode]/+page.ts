import { redirect } from '@sveltejs/kit';


export async function load({ params }) {
    if (params.mode !== 'pp' && params.mode !== 'stars') {
        throw redirect(302, '/calculator');
    }

    return { mode: params.mode };
}
