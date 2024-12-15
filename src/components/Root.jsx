import React from "react";
import {Outlet} from "react-router-dom";
import {Navigation} from "./Navigation";
import {Box, Center} from "@chakra-ui/react";

export const Root = () => {
	return (
		<Box
			bgColor="blue.200"
			width="100%"
			height="100%"
		>
			<Center>
				<Navigation />
			</Center>
			<Outlet />
		</Box>
	);
};
