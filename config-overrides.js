const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, getBabelLoader } = require('customize-cra');

const fileLoaderMatcher = function (rule) {
    return rule.loader && rule.loader.indexOf('file-loader') !== -1;
};

function addPlugin(config) {
    config.module.rules[2].oneOf.unshift(
        {
            test: /\.less$/,
            use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            require('postcss-preset-env')({
                                autoprefixer: {
                                    flexbox: 'no-2009',
                                },
                                stage: 3,
                            }),
                        ],
                    },
                },
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        javascriptEnabled: true,
                        // theme vars, also can use theme.js instead of this.
                        modifyVars: {
                            '@primary-color': '#2988e1',
                            '@layout-header-padding': '0 80px',
                        },
                    },
                },
            ],
        },
    );

    // file-loader exclude
    const l = getBabelLoader(config, fileLoaderMatcher);
    const reg = /\.less$/;
    if (Array.isArray(l.exclude)) {
        l.exclude.push(reg);
    } else if (l.exclude) {
        l.exclude = [l.exclude, reg];
    } else {
        l.exclude = reg;
    }

    return config;
}

module.exports = override(
    addPlugin,
    fixBabelImports('import', {
        libraryName: 'antd',
        style: true, // use less for customized theme
    }),
    addDecoratorsLegacy(),
);