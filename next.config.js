const withTM = require('next-transpile-modules')([

]);

module.exports = withTM({
    env: {
        API: process.env.NODE_ENV === 'development' ?
        'http://localhost' :
        ''
    },
    webpack: (config)=> {
        /*config.resolve = {
            alias: {
                res: join(__dirname, 'res')
            }
        };*/
        config.module.rules.push({
            test: /res.*\.(woff|woff2|svg|png|jpg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    esModule: false,
                    name: '[name].[ext]'
                }
            }
        });
        return config
    }
});
