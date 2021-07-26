const {join} = require('path');
const withTM = require('next-transpile-modules')([
    
]);

module.exports = withTM({
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config)=> {
        config.resolve.alias['res'] = join(__dirname, 'res');
        config.module.rules.push({
            test: /res.*\.(woff|woff2|svg|png|jpg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    esModule: false
                }
            }
        });
        return config
    }
});
