"use client"

import Image from "next/image";

import ts_logo_2 from "/public/ts_logo_2.svg";
import ts_launcher from "/public/ts_launcher.svg";
import dashboard from "/public/dashboard.svg";
import { useRouter } from "next/navigation";

export default function Sidebar() {

    const router = useRouter();

    return (
        <div className="bg-gray-900/75 rounded-lg pt-4">

            <div className="flex items-center gap-4 px-6">
                <Image
                    className="py-3"
                    src={ts_logo_2}
                    alt="TS Logo"
                    width={100}
                />
                <h1 className="text-xl text-center subpixel-antialiased">控制中心</h1>
            </div>

            <div className="m-6 flex flex-col gap-2">

                <div className="flex items-center gap-4 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-700/50 hover:scale-105 active:scale-100 transition"
                    onClick={() => {
                        router.push("/dashboard");
                    }}
                >
                    <Image
                        src={dashboard}
                        alt="TS Launcher Logo"
                        width={35}
                    />
                    <h1>儀表板</h1>
                </div>

                <div className="flex items-center gap-4 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-700/50 hover:scale-105 active:scale-100 transition"
                    onClick={() => {
                        router.push("/dashboard/launcher");
                    }}
                >
                    <Image
                        src={ts_launcher}
                        alt="TS Launcher Logo"
                        width={35}
                    />
                    <h1>TS 啟動器</h1>
                </div>

            </div>

        </div>
    )
}