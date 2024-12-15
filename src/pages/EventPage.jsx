import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Card, Center, Box, Button, Image, Text, Heading} from "@chakra-ui/react";
import EditEvent from "../components/EditEvent";
import DeleteEvent from "../components/DeleteEvent";

export const EventPage = () => {
	const {id} = useParams();
	const [event, setEvent] = useState(null);
	const [user, setUser] = useState(null);
	const [categories, setCategories] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleUpdateEvent = (updatedEvent) => {
		setEvent(updatedEvent);
	};

	useEffect(() => {
		fetch(`http://localhost:3000/events/${id}`)
			.then((response) => response.json())
			.then((eventData) => {
				setEvent(eventData);

				if (eventData.createdBy) {
					fetch(`http://localhost:3000/users/${eventData.createdBy}`)
						.then((response) => response.json())
						.then((userData) => setUser(userData))
						.catch((error) => console.error("Error fetching user data:", error));
				}
			})
			.catch((error) => console.error("Error fetching event:", error));

		fetch("http://localhost:3000/categories")
			.then((response) => response.json())
			.then((categoryData) => setCategories(categoryData))
			.catch((error) => console.error("Error fetching categories:", error));
	}, [id]);

	if (!event || categories.length === 0) {
		return <p>Loading event details...</p>;
	}

	const getCategoryNames = (categoryIds) => {
		if (!categoryIds || categoryIds.length === 0) return "No categories";

		return categoryIds
			.map(
				(id) =>
					categories.find((category) => category.id === id)?.name || "Unknown category",
			)
			.join(", ");
	};

	return (
		<div className="event-detail">
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
					Event Details
				</Heading>
			</Center>

			<Center>
				<Card
					key={event.id}
					borderRadius="xl"
					cursor="pointer"
					w="500px"
					p={4}
					mt="1rem"
					boxShadow="lg"
					bgColor="blue.100"
					display="flex"
					flexDirection="column"
					alignItems="center"
					textAlign="center"
				>
					<Heading size="md">{event.title}</Heading>
					<Image
						src={event.image}
						alt={event.title}
						boxSize="75%"
						borderRadius="md"
						mt={2}
						mb={4}
					/>
					<Text fontWeight="bold">Description:</Text>
					<Text mb={2}>{event.description}</Text>
					<Text fontWeight="bold">Categories:</Text>
					<Text mb={2}>
						{Array.isArray(event.categoryIds)
							? getCategoryNames(event.categoryIds)
							: "No categories"}
					</Text>
					<Text fontWeight="bold">Created by:</Text>
					{user ? (
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
						>
							<Image
								src={user.image}
								alt={user.name}
								boxSize="50px"
								borderRadius="full"
								mb={2}
							/>
							<Text>{user.name}</Text>
						</Box>
					) : (
						<Text>Loading creator details...</Text>
					)}

					<Box mt={4}>
						<Button
							colorScheme="blue"
							onClick={handleOpenModal}
						>
							Edit event
						</Button>

						<DeleteEvent eventId={event.id} />
					</Box>

					{isModalOpen && (
						<EditEvent
							event={event}
							onClose={handleCloseModal}
							onUpdate={handleUpdateEvent}
						/>
					)}
				</Card>
			</Center>
		</div>
	);
};

export default EventPage;
