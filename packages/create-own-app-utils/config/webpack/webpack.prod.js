import { resolve } from "path";
import { merge } from "webpack-merge";
import WebpackConfigBasic from "./webpack.base.js";
import WebpackConfigProd from "webpackrc/webpack.prod.js";
import CopyPlugin from "copy-webpack-plugin";
import {default as bundle} from "bundle-declarations-webpack-plugin";

const __dirname = resolve();
const PATHOUT = resolve(__dirname, "dist");

export default merge(WebpackConfigProd, WebpackConfigBasic,{
    output: {
		path: PATHOUT
	},
	plugins: [
		new bundle.BundleDeclarationsWebpackPlugin({
			entry: {
				filePath: "./src/index.ts"
			},
			outFile: "index.d.ts",
			compilationOptions: {},
			removeEmptyLines: false,
			removeEmptyExports: false
		}),
		new CopyPlugin({
			patterns: [
				{
					from: resolve(__dirname, "package.json"),
					to: PATHOUT
				},
				{
					from: resolve(__dirname, "README.md"),
					to: PATHOUT
				}
			]
		})
	]
});
