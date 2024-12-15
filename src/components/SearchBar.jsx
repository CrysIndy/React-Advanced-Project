import {useState, useEffect} from "react";
import {Input, Select, Box} from "@chakra-ui/react";

export const SearchBar = ({onSearch, events, categories}) => {
	const [searchEvent, setSearchEvent] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");

	useEffect(() => {
		const searchLower = searchEvent.toLowerCase();

		const filteredEvents = events.filter((event) => {
			const eventTitleMatch = event.title.toLowerCase().includes(searchLower);

			const categoryMatch =
				selectedCategory === "" ||
				event.categoryIds.some((categoryId) => {
					const category = categories.find((cat) => cat.id === categoryId);
					return (
						category && category.name.toLowerCase() === selectedCategory.toLowerCase()
					);
				});

			return eventTitleMatch && categoryMatch;
		});

		onSearch(filteredEvents);
	}, [searchEvent, selectedCategory, events, categories, onSearch]);

	return (
		<Box mb={6}>
			<Input
				borderColor="black"
				placeholder="Search an event..."
				value={searchEvent}
				onChange={(e) => setSearchEvent(e.target.value)}
				mb={4}
			/>
			<Select
				borderColor="black"
				placeholder="Filter a category..."
				value={selectedCategory}
				onChange={(e) => setSelectedCategory(e.target.value)}
			>
				{categories.map((category) => (
					<option
						key={category.id}
						value={category.name}
					>
						{category.name}
					</option>
				))}
			</Select>
		</Box>
	);
};
