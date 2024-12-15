import {Flex, Heading, Input, Button, Select, Center, Box} from "@chakra-ui/react";
import {useState} from "react";

export const AddEvent = () => {
	const [formValues, setFormValues] = useState({
		title: "",
		description: "",
		image: "",
		startTime: "",
		endTime: "",
		categoryIds: [],
	});

	const categories = [
		{name: "sports", id: 1},
		{name: "games", id: 2},
		{name: "relaxation", id: 3},
	];

	const handleChange = (event) => {
		const {name, value} = event.target;
		setFormValues({...formValues, [name]: value});
	};

	const handleCategoryChange = (event) => {
		const selectedCategoryId = parseInt(event.target.value, 10);
		setFormValues({...formValues, categoryIds: [selectedCategoryId]});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch("http://localhost:3000/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formValues),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Event succesvol toegevoegd:", data);

				setFormValues({
					title: "",
					description: "",
					image: "",
					startTime: "",
					endTime: "",
					categoryIds: [],
				});
			})
			.catch((error) => {
				console.error("Fout bij het toevoegen van event:", error);
			});
	};

	return (
		<Box
			minH="100vh"
			bgColor="blue.200"
		>
			<Box
				bgColor="blue.600"
				w="100%"
				h="15vh"
			>
				<Center h="100%">
					<Heading
						textAlign="center"
						fontSize={{base: "medium", sm: "4xl", md: "6xl"}}
						color="orange.400"
					>
						Add your own event:
					</Heading>
				</Center>
			</Box>

			<Center>
				<Flex
					direction="column"
					width="60%"
					mt="0.5rem"
					bg="blue.100"
					p="1rem"
					boxShadow="lg"
					borderRadius="md"
				>
					<form
						className="form"
						onSubmit={handleSubmit}
					>
						<Input
							name="title"
							placeholder="Event title"
							type="text"
							value={formValues.title}
							onChange={handleChange}
							mb="1rem"
						/>
						<Input
							name="description"
							placeholder="Event description"
							type="text"
							value={formValues.description}
							onChange={handleChange}
							mb="1rem"
						/>
						<Input
							name="image"
							placeholder="Event image url"
							type="url"
							value={formValues.image}
							onChange={handleChange}
							mb="1rem"
						/>

						<Input
							name="startTime"
							placeholder="Start Time"
							type="datetime-local"
							value={formValues.startTime}
							onChange={handleChange}
							mb="1rem"
						/>
						<Input
							name="endTime"
							placeholder="End Time"
							type="datetime-local"
							value={formValues.endTime}
							onChange={handleChange}
							mb="1rem"
						/>

						<Select
							placeholder="Select category"
							onChange={handleCategoryChange}
							value={formValues.categoryIds[0] || ""}
							mb="1rem"
						>
							{categories.map((category) => (
								<option
									key={category.id}
									value={category.id}
								>
									{category.name}
								</option>
							))}
						</Select>
						<Center>
							<Button
								type="submit"
								mt="1rem"
								color="white"
								bgColor="blue.500"
								borderTopColor="black"
								borderRightColor="red"
								borderLeftColor="red"
								borderBottomColor="black"
								borderRadius="xl"
								borderWidth="2px"
							>
								Submit
							</Button>
						</Center>
					</form>
				</Flex>
			</Center>
		</Box>
	);
};
