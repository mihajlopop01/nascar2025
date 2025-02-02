// import { appState } from './routes/js/state.svelte.js';

export const handle = async ({ event, resolve }) => {
    // const path = event.url.pathname;
    // if (path.startsWith('/dashboard')) {
    //     appState.page = 'dashboard';
    // } else if (path.startsWith('/worker')) {
    //     appState.page = 'breakdown';
    // }

    const theme = event.cookies.get('theme');
    // appState.theme = theme;
    const response = await resolve(event, {
        transformPageChunk: ({ html }) =>
            html.replace('data-theme="dark"', `data-theme="${theme}"`)
    });

    return response;
};