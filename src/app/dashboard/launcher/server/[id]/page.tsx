"use client";

import { useAppDispatch } from "../../../../../../lib/hooks";
import { setType } from "../../../../../../lib/slices/sideberSlices";
import { useEffect } from "react";

export default function LauncherServer({ params }: { params: { id: string } }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setType("LauncherServer"));
	}, []);

	return <div></div>;
}
