import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ companies }) {
    console.log(companies);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Department Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="mb-6">
                <a
                    type="button"
                    href={route("department.create")}
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-3 shadow-md transition-all"
                >
                    Register New Department
                </a>
            </div>

            <div className="relative overflow-x-auto bg-white shadow-lg rounded-lg">
               
            </div>
        </AuthenticatedLayout>
    );
}
