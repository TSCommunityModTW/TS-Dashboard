import VersionClient from "./Version";

export default async function Version() {
	return (
		<div>
			<div className="flex flex-col items-center justify-start p-8">
				<div className="container">
					<VersionClient />
				</div>
			</div>
		</div>
	);
}
