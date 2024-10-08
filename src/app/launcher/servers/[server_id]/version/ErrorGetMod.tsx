"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface IProps {
	socket: Socket;
	// mods: Array<{
	// 	type: "CurseForge";
	// 	version: string;
	// 	projectId: string;
	// 	fileId: string;
	// 	downloadUrl: string;
	// }>;
}

export default function ErrorGetMod(props: IProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [body, setBody] = useState<Array<IGET_MODULE_ERROR>>();

	function onEvent(data: ILAUNCHET_SERVER_FILE_REPLY_ERROR) {
		onOpen();
		if (data.type === "GET_MODULE_ERROR") {
			errorGetModule(data.modIds);
		}
	}

	function errorGetModule(modIds: Array<IGET_MODULE_ERROR>) {
		setBody(modIds);
	}

	useEffect(() => {
		props.socket.on("LAUNCHET_SERVER_FILE_REPLY_ERROR", onEvent);
		return () => {
			props.socket.off("LAUNCHET_SERVER_FILE_REPLY_ERROR", onEvent);
		};
	}, []);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">無法取得模組列表</ModalHeader>
						<ModalBody>
							{body
								? body.map((value) => (
										<div
											key={value.projectId}
											className="flex items-center justify-start bg-content2 px-2 py-2"
										>
											<p>
												projectId: {value.projectId} fileId: {value.fileId}
											</p>
										</div>
									))
								: null}
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								variant="light"
								onPress={onClose}
							>
								Close
							</Button>
							<Button
								color="primary"
								onPress={onClose}
							>
								Action
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}

interface ILAUNCHET_SERVER_FILE_REPLY_ERROR {
	type: "GET_MODULE_ERROR";
	modIds: Array<IGET_MODULE_ERROR>;
}

type IGET_MODULE_ERROR = {
	projectId: string;
	fileId: string;
};
