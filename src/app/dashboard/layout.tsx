import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <div className="box-border p-4 w-screen h-screen flex">

            <Sidebar />
            
            <div className="w-full pl-10 pr-6">
                <Navbar />
                <div className="">
                    {children}
                </div>
            </div>

        </div>
    );
}