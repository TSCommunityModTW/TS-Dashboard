"use client";

import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Chip,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Textarea,
	Tooltip,
	useDisclosure
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { GoFileDirectory, GoFileDirectoryFill } from "react-icons/go";
import ErrorGetMod from "./ErrorGetMod";
import { useAppSelector } from "../../../../../lib/hooks";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineDeleteForever } from "react-icons/md";
import { config } from "@/config/config";
import { socket } from "@/app/socket";

export default function VersionClient() {
	const serverAssetsManifest = useAppSelector((state) => state.serverSlices);
	const launcherSelectServerChildrenId = useAppSelector((state) => state.dashboardSlices.launcherSelectServerChildrenId);
	const [homemadeText, setHomemadeText] = useState<string>("");
	const [uploadFile, setUploadFile] = useState<File | null>(null);
	const [uploadDownload, setUploadDownload] = useState<string>();
	const [uploadFileSpinner, setUploadFileSpinner] = useState<boolean>(false);
	const [releaseFileSpinner, setReleaseFileSpinner] = useState<boolean>(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const logRef = useRef<HTMLDivElement>(null);
	const [log, setLog] = useState<Array<{ type: "INFO" | "ERROR"; messages: string }>>([]);
	const [newName, setNewName] = useState<string>("");
	const [newVersion, setNewVersion] = useState<string>("");
	const [serverAssetsManifestVersions, setServerAssetsManifestVersions] = useState<
		Array<{
			id: string;
			server_id: string;
			children_id: string;
			name: string;
			version: string;
			manifest_url: string;
		}>
	>([]);

	useEffect(() => {
		const current = logRef.current!;
		current.scrollTop = current.scrollHeight;
	}, [log]);

	useEffect(() => {
		socket.connect();
		socket.on("LAUNCHET_SERVER_FILE_REPLY_LOG", onLog);
		fetchData();
		return () => {
			socket.off("LAUNCHET_SERVER_FILE_REPLY_LOG", onLog);
			socket.disconnect();
		};
	}, []);

	const fetchData = async () => {
		const serverAssetsManifestVersions = await (await fetch(`${config.API_LOCATION}/launcher/assets/metadata/${launcherSelectServerChildrenId}/versions`)).json();
		setServerAssetsManifestVersions(serverAssetsManifestVersions);
	};

	const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		console.log(file);
		setUploadFile(file ? file : null);
		// 重置 event.target.value，第二次及後續次則不然
		// 我們瀏覽，什麼事也不會發生，因為什麼事都沒有改變。
		event.target.value = "";
	};

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const uploadFileToS3 = async () => {
		if (uploadFile === null) {
			console.warn("Upload file is not null.");
			return;
		}

		setUploadFileSpinner(true);

		const formData = new FormData();
		formData.append("file", uploadFile);

		const response = await fetch(`${config.API_LOCATION}/launcher/temporary/assets/modpack/upload`, {
			method: "POST",
			body: formData
		});

		setUploadFileSpinner(false);

		if (response.status !== 201) {
			console.warn("Upload file failed.");
			return;
		}

		setUploadFile(null);
		console.log("Upload file successfully.");

		const responseJson = await response.json();
		setUploadDownload(responseJson.fileKey);
		setHomemadeText(uploadFile.name);
	};

	const handleModapck = async () => {
		if (newVersion.length <= 0 || newName.length <= 0 || !uploadDownload) {
			console.warn("Stop handle modpack upload request");
			return;
		}
		console.log("Handle modpack");
		setReleaseFileSpinner(true);
		socket.emit("LAUNCHET_SERVER_FILE", {
			run: "Analyze_upload",
			getType: "Homemade",
			newName: newName,
			newVersion: newVersion,
			downloadUrl: `${config.S3_TS_LAUNCHER_METSDATA}/${uploadDownload}`
		});
		socket.once("LAUNCHET_SERVER_FILE_REPLY_OK", () => {
			socket.emit("LAUNCHET_SERVER_FILE_OK", { serverId: serverAssetsManifest.id, childrenId: launcherSelectServerChildrenId });
		});
		socket.once("LAUNCHET_SERVER_FILE_REPLY_S3_UPLOAD_OK", () => {
			setReleaseFileSpinner(false);
			setUploadDownload(undefined);
			setHomemadeText("");
			fetchData();
		});
	};

	const onLog = (value: { type: "INFO" | "ERROR"; messages: string }) => {
		setLog((oldValue) => [...oldValue, value]);
	};

	return (
		<>
			<ErrorGetMod socket={socket} />
			<div className="flex flex-col items-start justify-center space-y-[10px]">
				<div className="flex h-96 w-full items-start space-x-[10px]">
					<div className="flex w-96 flex-col items-center justify-start space-y-[10px]">
						<div className="flex w-[100%] flex-col items-center justify-center rounded-lg bg-content1 px-4 py-4">
							<h1 className="mb-[10px] text-lg">自製模組包</h1>
							<h1 className="mb-[10px]">{homemadeText}</h1>
							<div className="flex w-[100%] items-center justify-center space-x-[10px]">
								<Button
									isLoading={uploadFileSpinner}
									onClick={uploadFileToS3}
								>
									上傳檔案
								</Button>
								<Button onClick={handleButtonClick}>
									<GoFileDirectoryFill size={"100%"} />
								</Button>
							</div>
							<input
								type="file"
								hidden
								ref={fileInputRef}
								onChange={handleFile}
							/>
						</div>
						<div className="flex w-[100%] flex-col items-center justify-center rounded-lg bg-content1 px-4 py-4">
							<Input
								isReadOnly={releaseFileSpinner}
								isRequired
								label="發布新名稱"
								className="mb-[10px] shadow-xl"
								value={newName}
								onChange={(value) => {
									setNewName(value.target.value);
								}}
							/>
							<Input
								isReadOnly={releaseFileSpinner}
								isRequired
								label="發布新版本 Example: v1.2.6"
								className="mb-[10px] shadow-xl"
								value={newVersion}
								onChange={(value) => {
									setNewVersion(value.target.value);
								}}
							/>
							<Button
								onClick={handleModapck}
								isLoading={releaseFileSpinner}
							>
								發布
							</Button>
						</div>
					</div>
					<div className="flex h-[100%] max-h-[500px] min-h-[350px] w-[100%] flex-col items-start justify-start rounded-lg bg-content1 px-4 py-4">
						<h1 className="mb-[10px]">日誌</h1>
						<div
							className="h-[100%] w-[100%] overflow-auto rounded-lg bg-content2 px-2 py-2 shadow-xl"
							ref={logRef}
						>
							{log.map((value) => (
								<div key={uuidv4()}>
									{value.type === "INFO" ? (
										<p className="text-green-400">{`[INFO] ${value.messages}`}</p>
									) : value.type === "ERROR" ? (
										<p className="text-rose-500">{`[ERROR] ${value.messages}`}</p>
									) : (
										<p>{value.messages}</p>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex w-full items-start justify-start">
					<Table
						isStriped
						aria-label="Assets metadata versions table"
					>
						<TableHeader>
							<TableColumn>名稱</TableColumn>
							<TableColumn>版本</TableColumn>
							{/* <TableColumn>狀態</TableColumn> */}
							<TableColumn> </TableColumn>
						</TableHeader>
						<TableBody>
							{serverAssetsManifestVersions.map((value) => (
								<TableRow key={value.id}>
									<TableCell>{value.name}</TableCell>
									<TableCell>{value.version}</TableCell>
									<TableCell>
										<div className="relative flex items-center gap-2">
											<Tooltip
												color="danger"
												content="刪除"
											>
												<span className="cursor-pointer text-2xl text-danger active:opacity-50">
													<MdOutlineDeleteForever />
												</span>
											</Tooltip>
										</div>
									</TableCell>
								</TableRow>
							))}
							{/* <TableRow key="1">
								<TableCell>Tony Reichert</TableCell>
								<TableCell>CEO</TableCell>
								<TableCell>
									<Chip
										className="capitalize"
										size="sm"
										variant="flat"
										color="success"
									>
										使用中
									</Chip>
									<Chip
										className="capitalize"
										size="sm"
										variant="flat"
									>
										未使用
									</Chip>
								</TableCell>
								<TableCell>
									<div className="relative flex items-center gap-2">
										<Tooltip
											color="danger"
											content="刪除"
										>
											<span className="cursor-pointer text-2xl text-danger active:opacity-50">
												<MdOutlineDeleteForever />
											</span>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow> */}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	);
}
