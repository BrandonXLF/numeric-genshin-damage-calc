import Formula from "fparser";

export default function evaluateExpression(expr: string) {
	try {
		return Formula.calc(expr, {});
	} catch {
		return NaN;
	}
}