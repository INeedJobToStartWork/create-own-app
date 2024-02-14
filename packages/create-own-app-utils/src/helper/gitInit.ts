import type { TFunctionReturn, TMyErrorList } from "oh-my-error";
import { myErrorWrapper } from "oh-my-error";
import { execSync } from "node:child_process";

const ErrorList = {
	gitNotInstalled: {
		code: "GI001",
		message: {
			user: "`git` not found"
		},
		hint: {
			user: "Check `git` is installed"
		}
	},
	ExecutionProblem: {
		code: "GI002",
		message: {
			user: "Error with execution `git init`",
			dev: "Error throwed by `execSync`"
		},
		hint: {
			user: "",
			dev: "Check passed options by dev"
		}
	}
} as const satisfies TMyErrorList;

export const gitInit = (path: string, ...options: string[]): TFunctionReturn<void> => {
	const [, error] = myErrorWrapper(execSync)("git version");
	if (error) return [ErrorList.gitNotInstalled, true];
	const finalPrompt = `cd ${path} && git init${options.join(" ")}`;

	const [, error2] = myErrorWrapper(execSync)(finalPrompt);
	if (error2) return [ErrorList.ExecutionProblem, true];
	return [void 0, false];
};

export default gitInit;
