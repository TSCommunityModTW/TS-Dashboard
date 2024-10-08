import { Divider } from "@nextui-org/react";
import ServerInformationUIClient from "./ServerInformation";
import ChildrenUIClient from "./Children";

export default function General({ params }: { params: { server_id: string } }) {
	return (
		<div className="flex flex-col items-center justify-start p-8">
			<ServerInformationUIClient server_Id={params.server_id} />
			<Divider className="container my-8" />
			<ChildrenUIClient server_Id={params.server_id} />
		</div>
	);
}
