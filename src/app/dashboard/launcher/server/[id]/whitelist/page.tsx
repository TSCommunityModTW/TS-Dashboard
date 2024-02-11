"use client";

import React, { useEffect, useState } from "react";
import {
	Button,
	Select,
	SelectItem,
	Snippet,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Image,
	Tooltip,
	useDisclosure,
	Modal,
	ModalContent,
	ModalFooter,
	ModalBody,
	ModalHeader,
	Input
} from "@nextui-org/react";
import { EditIcon } from "@/components/icon/EditIcon";
import { DeleteIcon } from "@/components/icon/DeleteIcon";

const playersData = [
	{
		id: "yucheng_0918",
		uuid: "93ea0589ec754cad8619995164382e8d"
	},
	{
		id: "Blacksmouo",
		uuid: "d57474bc8fbd467a985544650d451411"
	},
	{
		id: "Jutho",
		uuid: "152420263d1e4996b47067f81a8afc07"
	},
	{
		id: "x3ww",
		uuid: "e4cb2fc389f54ee0a06812db2f82d3d6"
	}
];

type IPlayer = (typeof playersData)[0];

export default function Whitelist() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [addFrom, setAddFrom] = useState<IPlayer>();
	const [players, setPlayers] = useState<IPlayer[]>(playersData);

	const renderCell = React.useCallback((player: IPlayer, columnKey: React.Key) => {
		switch (columnKey) {
			case "player_id":
				return (
					<div className="flex items-center justify-start">
						<Image
							src={`https://visage.surgeplay.com/bust/70/${player.uuid}`}
							width={50}
							radius="lg"
						/>
						<Snippet
							className="bg-transparent"
							hideSymbol={true}
						>
							{player.id}
						</Snippet>
					</div>
				);
			case "player_uuid":
				return (
					<Snippet
						className="bg-transparent"
						hideSymbol={true}
					>
						{player.uuid}
					</Snippet>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						{/* <Tooltip content="編輯">
							<span
								className="cursor-pointer text-lg text-default-400 active:opacity-50"
								onClick={() => {}}
							>
								<EditIcon />
							</span>
						</Tooltip> */}
						<Tooltip
							color="danger"
							content="刪除"
						>
							<span
								className="cursor-pointer text-lg text-danger active:opacity-50"
								onClick={() => {
									deletePlayer(player.uuid);
								}}
							>
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				);
		}
	}, []);

	const addPlayer = (id: string, uuid: string) => {
		setPlayers((players) => {
			const newPlayers = players.concat();
			newPlayers.unshift({ id, uuid });
			return newPlayers;
		});
	};

	const deletePlayer = (uuid: string) => {
		setPlayers((players) => {
			return players.filter((player) => player.uuid !== uuid);
		});
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">添加玩家</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label="玩家 ID"
									placeholder="輸入玩家 ID"
									variant="bordered"
									onValueChange={(value: string) => {
										setAddFrom((data) => {
											return { id: value, uuid: data ? data.uuid : "" };
										});
									}}
								/>
								<Input
									label="玩家 UUID"
									placeholder="輸入玩家 UUID"
									variant="bordered"
									onValueChange={(value: string) => {
										setAddFrom((data) => {
											return { id: data ? data.id : "", uuid: value };
										});
									}}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="flat"
									onPress={onClose}
								>
									取消
								</Button>
								<Button
									color="primary"
									onPress={() => {
										onClose();
										if (addFrom) {
											addPlayer(addFrom.id, addFrom.uuid);
										}
									}}
								>
									添加
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<div className="flex flex-col items-center justify-start p-8">
				<div className="container flex items-center justify-center space-x-[10px]">
					<Select label="名單類型">
						<SelectItem
							key="whitelist"
							value="whitelist"
						>
							白名單
						</SelectItem>
						<SelectItem
							key="blacklist"
							value="blacklist"
						>
							黑名單
						</SelectItem>
					</Select>
					<Button
						className="h-[56px]"
						onPress={onOpen}
					>
						<p className="text-4xl">+</p>
					</Button>
				</div>
				<div className="container mt-[20px]">
					<Table aria-label="Example empty table">
						<TableHeader>
							<TableColumn key={"player_id"}>玩家 ID</TableColumn>
							<TableColumn key={"player_uuid"}>玩家 UUID</TableColumn>
							<TableColumn key={"actions"}> </TableColumn>
						</TableHeader>
						<TableBody
							items={players}
							emptyContent={"No rows to display."}
						>
							{(item) => <TableRow key={item.uuid}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	);
}
