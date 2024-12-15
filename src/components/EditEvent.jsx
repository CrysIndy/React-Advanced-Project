import {useState, useEffect} from "react";
import {Button, Flex, Input, Select} from "@chakra-ui/react";
import "./Modal.css";
import {toast} from "react-toastify";
import {Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditEvent({event, onClose, onUpdate}) {
	const [formValues, setFormValues] = useState({
		title: "",
		description: "",
		image: "",
		startTime: "",
		endTime: "",
		categoryId: 1,
	});

	const categories = [
		{name: "sports", id: 1},
		{name: "games", id: 2},
		{name: "relaxation", id: 3},
	];

	useEffect(() => {
		if (event) {
			setFormValues({
				title: event.title || "",
				description: event.description || "",
				image: event.image || "",
				startTime: event.startTime ? event.startTime.slice(0, 16) : "",
				endTime: event.endTime ? event.endTime.slice(0, 16) : "",
				categoryId: event.categoryId || 1,
			});
		}
	}, [event]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormValues({
			...formValues,
			[name]: name === "categoryId" ? [parseInt(value)] : value,
		});
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(`http://localhost:3000/events/${event.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formValues,
					startTime: new Date(formValues.startTime).toISOString(),
					endTime: new Date(formValues.endTime).toISOString(),
					categoryIds: formValues.categoryId || [],
				}),
			});
			const updatedEvent = await response.json();
			console.log("Event succesvol bijgewerkt:", updatedEvent);
			onUpdate(updatedEvent);
			onClose();
			return "Event updated successfully 👌";
		} catch (error) {
			console.error("Fout bij het bijwerken van event:", error);
			throw new Error("Failed to update event 🤯");
		}
	};

	return (
		<div className="modal">
			<div
				className="overlay"
				onClick={onClose}
			></div>

			<div
				className="modal-content"
				display="flex"
				direction="column"
			>
				<h2>Edit Event</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						toast.promise(
							handleSubmit(),
							{
								pending: "Data is pending",
								success: "Event updated successfully 👌",
								error: "Failed to update event 🤯",
							},
							{
								position: "top-center",
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: "dark",
								transition: Bounce,
							},
						);
					}}
				>
					<Flex wrap="wrap">
						<Input
							name="title"
							placeholder="Title"
							type="text"
							value={formValues.title}
							onChange={handleChange}
						/>
						<Input
							name="description"
							placeholder="Description"
							type="text"
							value={formValues.description}
							onChange={handleChange}
						/>
						<Input
							name="image"
							placeholder="Image URL"
							type="url"
							value={formValues.image}
							onChange={handleChange}
						/>
						<Input
							name="startTime"
							placeholder="Start time"
							type="datetime-local"
							value={formValues.startTime}
							onChange={handleChange}
						/>
						<Input
							name="endTime"
							placeholder="End time"
							type="datetime-local"
							value={formValues.endTime}
							onChange={handleChange}
						/>
						<Select
							name="categoryId"
							value={formValues.categoryId[0] || ""}
							onChange={handleChange}
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
						<Button type="submit">Save Changes</Button>
						<Button
							type="button"
							onClick={onClose}
						>
							Cancel
						</Button>
					</Flex>
				</form>
			</div>
		</div>
	);
}
