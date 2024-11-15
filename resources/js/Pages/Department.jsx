import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import NavLink from "@/Components/NavLink";
export default function Dashboard({ companies }) {
    console.log(companies); 

    function goToCreate(){
        window.location.href = route('department.create')
    }
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Department Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
           <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <PrimaryButton className="ms-4" onClick={goToCreate} >
                            Add New Department 
                        </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
