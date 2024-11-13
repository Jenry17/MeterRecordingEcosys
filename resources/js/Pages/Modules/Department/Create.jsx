import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ companies }) {
    console.log(companies);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Create Department
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="mb-6">
                
            </div>

            
        </AuthenticatedLayout>
    );
}
