import {Flex} from "@chakra-ui/react";
import React from "react";
import {Link} from "react-router-dom";

export const Navigation = () => {
	return (
		<Flex
			bgColor="orange.400"
			as="nav"
			flexDirection="row"
			gap="4"
			mb="0.5rem"
		>
			<Link to="/">Show All Events</Link>
			<Link to="/event/1">Event Details</Link>
		</Flex>
	);
};
