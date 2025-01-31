export const load = ({ params }) => {
    console.log('This data loads on every page, from layout.js');
    return {
        message: 'success'
    }
};