import { Input, Button, Divider, Image } from "@nextui-org/react";
import ServerInformationUIClient from "./ServerInformationUIClient";
import ChildrenUIClient from "./ChildrenUIClient";

export default function General() {
	return (
		<div className="flex flex-col items-center justify-start p-8">
			<ServerInformationUIClient />
			<Divider className="container my-8" />
			<ChildrenUIClient />
		</div>
	);
}
