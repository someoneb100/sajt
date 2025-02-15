import React from "react";

export const vratiSadrzaj = ({ content = "" }) => {
	return (
		<>
			{content.split("\n").map((line, i) => (
				<React.Fragment key={i}>
					{line}
					<br />
				</React.Fragment>
			))}
		</>
	);
};
