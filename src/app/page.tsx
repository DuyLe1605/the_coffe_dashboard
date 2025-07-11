import DashboardMain from "@/components/dashboard-main";

export default async function Home() {
    return (
        <div className="container mx-auto">
            <h1 className="text-center font-extrabold text-3xl mt-2">
                The Coffee Shop | Dashboard
            </h1>
            <DashboardMain />
        </div>
    );
}
