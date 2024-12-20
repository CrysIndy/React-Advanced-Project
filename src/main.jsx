import {ChakraProvider} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {EventPage} from "./pages/EventPage";
import {EventsPage} from "./pages/EventsPage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Root} from "./components/Root";
import {AddEvent} from "./pages/AddEvent";
import {ToastContainer} from "react-toastify";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <EventsPage />,
				// loader: postListLoader,
			},
			{
				path: "/event/:id",
				element: <EventPage />,
				// loader: postLoader,
				// action: addComment,
			},
			{
				path: "/add-event",
				element: <AddEvent />,
			},
		],
	},
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
		<ToastContainer />
	</React.StrictMode>,
);
