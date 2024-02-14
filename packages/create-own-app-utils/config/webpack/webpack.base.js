import CopyPlugin from "copy-webpack-plugin";
import { join, resolve } from "path";
import { merge } from "webpack-merge";
import WebpackConfig from "webpackrc/webpack.base.js";

const __dirname = resolve();
const PATHOUT = resolve(__dirname, "lib");

export default merge(WebpackConfig, {
	output: {
		clean: true,
		filename: "[name].cjs",
		path: resolve(__dirname, "lib"),
		chunkLoading: false,
		library: "index"
	},
	resolve: {
		extensions: ["", ".ts", ".js", ".mjs", ".mts"],
		alias: {
			"@": resolve(__dirname, "src/")
		}
	},

});
