"use client";

import { Input, Button, Image } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../../../../lib/hooks";
import { useRef, useState } from "react";
import { config } from "@/config/config";
import { setServer } from "@/app/lib/slices/serverSlices";

interface IProps {
	server_Id: string;
}

export default function ServerInformationUIClient(props: IProps) {
	const dispatch = useAppDispatch();
	const serverAssetsManifest = useAppSelector((state) => state.serverSlices);
	const [imageUrl, setImageUrl] = useState<string>(serverAssetsManifest ? serverAssetsManifest.imageUrl : "");
	const [name, setName] = useState<string>(serverAssetsManifest ? serverAssetsManifest.name : "");
	const [description, setDescription] = useState<string>(serverAssetsManifest ? serverAssetsManifest.description : "");
	const [officialWebLinkUrl, setOfficialWebLinkUrl] = useState<string>(serverAssetsManifest ? serverAssetsManifest.officialWebLinkUrl : "");
	const [updateDataSpinner, setUpdateDataSpinner] = useState<boolean>(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				console.log(event.target?.result);
			};
			reader.readAsArrayBuffer(file);
		}
	};
	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const updateData = async () => {
		setUpdateDataSpinner(true);

		dispatch(
			setServer({
				id: serverAssetsManifest.id,
				name,
				imageUrl,
				description,
				officialWebLinkUrl,
				childrens: serverAssetsManifest.childrens
			})
		);

		const formData = new FormData();
		formData.append("id", props.server_Id);
		formData.append("name", name);
		formData.append("image_url", imageUrl);
		formData.append("description", description);
		formData.append("official_web_link_url", officialWebLinkUrl);

		const response = await fetch(`${config.API_LOCATION}/launcher/assets/servers/${props.server_Id}`, {
			method: "PATCH",
			body: formData
		});

		if (response.status === 201 || response.status === 304) {
			setUpdateDataSpinner(false);
		} else {
			console.error("Error updating data: " + response.status);
		}
	};

	return (
		<div className="container">
			<h1 className="mb-[10px] text-lg">伺服器</h1>
			<div className="flex items-center justify-center space-x-[30px]">
				<div className="flex flex-col items-center justify-center rounded-lg bg-content1 px-[20px] py-[10px]">
					<Image
						className="mb-[10px]"
						src={imageUrl}
						alt="Server Logo"
						width={150}
						// height={150}
					/>
					<Button onClick={handleButtonClick}>更改圖片</Button>
					<input
						type="file"
						id="formId"
						hidden
						ref={fileInputRef}
						onChange={handleFile}
					/>
				</div>
				<div className="w-full space-y-[10px]">
					<Input
						label="名稱"
						// placeholder="伺服器名稱"
						value={name}
						onChange={(value) => {
							setName(value.target.value);
						}}
					/>
					<Input
						label="描述"
						// placeholder="伺服器描述"
						value={description}
						onChange={(value) => {
							setDescription(value.target.value);
						}}
					/>
					<Input
						label="官網網址"
						// placeholder="伺服器官網網址"
						value={officialWebLinkUrl}
						onChange={(value) => {
							setOfficialWebLinkUrl(value.target.value);
						}}
					/>
				</div>
			</div>
			<div className="mt-[20px] flex items-center justify-start">
				<Button
					className="caret-zinc-50"
					color="primary"
					isLoading={updateDataSpinner}
					onClick={updateData}
				>
					儲存
				</Button>
			</div>
		</div>
	);
}
