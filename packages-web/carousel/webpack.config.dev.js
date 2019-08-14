const merge = require("webpack-merge");
const baseConfig = require("../utils-react-widgets/configs/webpack.config.dev");

const previewConfig = {
    module: {
        rules: [
            {
                test: /\.png$/,
                use: [
                    {
                        loader: "base64-image-loader"
                    }
                ]
            }
        ]
    }
};

module.exports = [baseConfig[0], merge(baseConfig[1], previewConfig)];
