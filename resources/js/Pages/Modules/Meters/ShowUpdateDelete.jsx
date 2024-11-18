import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Dashboard({ meter }) {

    console.log(meter);

    // Example of placeholder functions:
    const handleBack = () => {
        // Navigate back in the browser's history
        window.history.back();
    };
    
    const handleUpdate = () => {
        // Navigate to the update page (replace with the correct URL)
        window.location.href = `/meter/${meter.id}`;
    };
    
    const handleDelete = () => {
        // Implement delete logic (e.g., show confirmation modal and call an API)
    };

    console.log(meter);

    return (
        <AuthenticatedLayout>
            <Head title="Meter Details" />
        
            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Meter Details
                </h2>
        
                <div className="mb-6">
                    <InputLabel htmlFor="department_id" value="Department Id" />
                    <div className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                        {meter.department_id || 'N/A'}
                    </div>
                </div>
        
                <div className="mb-6">
                    <InputLabel htmlFor="meter_name" value="Meter Name" />
                    <div className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                        {meter.meter_name || 'N/A'}
                    </div>
                </div>
        
                <div className="flex items-center justify-between mt-6 space-x-4">
                    <button
                        onClick={handleBack} // Implement this function to handle the back action
                        className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Back
                    </button>
                    
                    <button
                        // onClick={handleUpdate} // Implement this function to handle the update action
                        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update
                    </button>
                    
                    <button
                        // onClick={handleDelete} // Implement this function to handle the delete action
                        className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// import React from "react";

// const Show = (companies) => {
//     // Destructure the post prop that was passed from Laravel
//     const compData = companies;
//     console.log(compData);
//     // console.log (companies);

//     return (
//         <div className="container">
//             <h1>Post Details</h1>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Code</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{compData.companies.id}</td>
//                         <td>{compData.companies.company_name}</td>
//                         <td>{compData.companies.company_code}</td>
//                     </tr>
//                 </tbody>
//             </table>
//             {/* <button onClick={() => Inertia.visit('/company')}>Back to Posts</button> */}
//         </div>
//     );
// };

// export default Show;
