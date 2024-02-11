"use client";

import Image from "next/image";
import { User, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import bell from "/public/bell.svg";
import sign_out from "/public/sign_out.svg";

export default function Navbar() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<div className="flex h-16 w-full items-center justify-start space-x-4">
			<div className="flex h-full w-full items-center justify-start rounded-lg bg-content1 pl-8 shadow-2xl">
				<h1 className="text-lg">TS 模組伺服器社群控制中心</h1>
			</div>

			<div className="flex h-full items-center justify-end space-x-2">
				<div className="flex h-full items-center justify-center rounded-lg bg-content1 px-8 shadow-2xl">
					<User
						name="yucheng"
						description="Admin"
						avatarProps={{
							src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
						}}
					/>
				</div>
				<Button
					className="h-full bg-content1 px-0 transition hover:scale-105 active:scale-100"
					size="sm"
				>
					<Image
						src={bell}
						alt="bell icon"
						width={35}
					/>
				</Button>
				<Button
					className="h-full bg-content1 transition hover:scale-105 active:scale-100"
					size="sm"
					onPress={onOpen}
				>
					<Image
						src={sign_out}
						alt="signOut icon"
						width={35}
					/>
				</Button>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader>你確定要登出嗎？</ModalHeader>
								<ModalBody>
									<p>登出後我們將重新導向到登入畫面</p>
								</ModalBody>
								<ModalFooter>
									<Button
										color="danger"
										variant="light"
										onPress={onClose}
									>
										取消
									</Button>
									<Button
										color="primary"
										onPress={onClose}
									>
										登出
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</div>
	);
}
