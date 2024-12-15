import React, {useState} from "react";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	useDisclosure,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const DeleteEvent = ({eventId}) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const navigate = useNavigate();

	const handleDelete = async () => {
		try {
			const response = await fetch(`http://localhost:3000/events/${eventId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				alert("Event deleted successfully!");

				navigate("/", {replace: true});
			} else {
				alert("Failed to delete the event");
			}
		} catch (error) {
			console.error("Error deleting event:", error);
		}
	};

	return (
		<>
			<Button
				colorScheme="red"
				onClick={onOpen}
			>
				Delete Event
			</Button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Are you sure?</ModalHeader>
					<ModalBody>
						<p>This action cannot be undone. Do you want to delete this event?</p>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="gray"
							mr={3}
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							colorScheme="red"
							isLoading={isDeleting}
							onClick={async () => {
								setIsDeleting(true);
								await handleDelete();
								setIsDeleting(false);
							}}
						>
							Confirm Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeleteEvent;
