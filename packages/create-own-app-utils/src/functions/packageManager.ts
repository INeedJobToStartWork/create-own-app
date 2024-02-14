type TpackageManagerSupport = (typeof packageManagersSupport)[number];
const packageManagersSupport = ["yarn", "pnpm", "bun"] as const;

export const packageManager = (() => {
	const userManager = process.env.npm_config_user_agent;
	const startWithSupport = (manager: TpackageManagerSupport) => userManager?.startsWith(manager);
	if (userManager === undefined) return "npm";
	if (startWithSupport("pnpm")) return "pnpm";
	if (startWithSupport("yarn")) return "yarn";
	if (startWithSupport("bun")) return "bun";
	return "other";
})();

export default packageManager;
