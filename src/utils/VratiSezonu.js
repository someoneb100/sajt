export function vratiSezonu(date = new Date()) {
	const month = date.getMonth();
	const day = date.getDate();

	// Define season boundaries
	if (
		(month === 11 && day >= 21) ||
		month === 0 ||
		month === 1 ||
		(month === 2 && day < 20)
	) {
		return "zimski"; // December 21 - March 19
	} else if (
		(month === 2 && day >= 20) ||
		month === 3 ||
		month === 4 ||
		(month === 5 && day < 21)
	) {
		return "letnji"; // March 20 - June 20
	} else if (
		(month === 5 && day >= 21) ||
		month === 6 ||
		month === 7 ||
		(month === 8 && day < 23)
	) {
		return "letnji"; // June 21 - September 22
	} else if (
		(month === 8 && day >= 23) ||
		month === 9 ||
		month === 10 ||
		(month === 11 && day < 21)
	) {
		return "zimski"; // September 23 - December 20
	}
}
