module.exports = {
    plugins: {
        'postcss-nested': {},
        'postcss-color-mod-function': {
            importFrom: './src/variables.css'
        },
        'postcss-viewport-height-correction': {}
    }
};
