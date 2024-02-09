import { Button, User } from "@nextui-org/react";

export default function Navbar() {

    return (
        <div className="w-full flex justify-start items-center gap-2 h-16">

            <div className="bg-gray-900/75 w-full rounded-lg h-full flex justify-start items-center pl-8">
                <h1 className="text-lg">TS 模組伺服器社群控制中心</h1>
            </div>

            <div className="flex justify-end items-center gap-2 h-full">
                <div className="bg-gray-900/75 rounded-lg h-full flex justify-center items-center px-8">
                    <User
                        name="yucheng"
                        description="Admin"
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                        }}
                    />
                </div>
                <div className="bg-gray-900/75 h-full rounded-lg cursor-pointer hover:scale-105 active:scale-100 transition flex justify-center items-center w-24">
                    <h1>登出</h1>
                </div>
            </div>

        </div>
    );
}