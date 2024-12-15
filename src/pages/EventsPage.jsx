import React, {useState, useEffect} from "react";
import {Box, Button, Card, Center, Heading, Image, Flex} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {SearchBar} from "../components/SearchBar";

export const EventsPage = () => {
	const [events, setEvents] = useState([]);
	const [categories, setCategories] = useState([]);
	const [filteredEvents, setFilteredEvents] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const [eventsResponse, categoriesResponse] = await Promise.all([
					fetch("http://localhost:3000/events"),
					fetch("http://localhost:3000/categories"),
				]);
				const eventsData = await eventsResponse.json();
				const categoriesData = await categoriesResponse.json();

				setEvents(eventsData);
				setCategories(categoriesData);
				setFilteredEvents(eventsData);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		}
		fetchData();
	}, []);

	const getCategoryNames = (categoryIds) => {
		if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
			return "No categories";
		}
		return categoryIds
			.map((id) => categories.find((cat) => cat.id === id)?.name || "Unknown")
			.join(", ");
	};

	return (
		<div className="events-list">
			<Center
				bgColor="blue.600"
				h="15vh"
				flexDir={{base: "column", sm: "row"}}
				color="orange.400"
			>
				<Heading
					textAlign="center"
					fontSize={{base: "medium", sm: "4xl", md: "6xl"}}
				>
					List of Events
				</Heading>
			</Center>

			<Box
				bgColor="blue.200"
				py={4}
			>
				<Center>
					<SearchBar
						width="50%"
						onSearch={(filtered) => setFilteredEvents(filtered)}
						events={events}
						categories={categories}
					/>
				</Center>

				<Box px={4}>
					<Flex
						wrap="wrap"
						gap={5}
						justify="center"
					>
						{filteredEvents.map((event) => (
							<Card
								key={event.id}
								borderRadius="xl"
								cursor="pointer"
								_hover={{transform: "scale(1.04)"}}
								w="250px"
								h="325px"
								p="0.5rem"
								boxShadow="lg"
								bgColor="blue.100"
								display="flex"
								textAlign="center"
							>
								<Link to={`/event/${event.id}`}>
									<Heading
										size="md"
										mb={2}
										justify="center"
									>
										{event.title}
									</Heading>

									<Image
										src={event.image}
										alt={event.title}
										boxSize="150px"
										width="100%"
										objectFit="cover"
										mb={2}
									/>

									<Box
										fontSize="sm"
										color="gray.600"
									>
										<p>{event.description}</p>
										<p>Start: {new Date(event.startTime).toLocaleString()}</p>
										<p>End: {new Date(event.endTime).toLocaleString()}</p>
										<p>Categories: {getCategoryNames(event.categoryIds)}</p>
									</Box>
								</Link>
							</Card>
						))}
					</Flex>
				</Box>
				<Center my={4}>
					<Link to="/add-event">
						<Button
							color="white"
							bgColor="blue.500"
							borderTopColor="black"
							borderRightColor="red"
							borderLeftColor="red"
							borderBottomColor="black"
							borderRadius="xl"
							borderWidth="2px"
						>
							Add Event
						</Button>
					</Link>
				</Center>
			</Box>
		</div>
	);
};
