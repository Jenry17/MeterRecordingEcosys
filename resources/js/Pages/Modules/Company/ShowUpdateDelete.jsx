import { useState } from 'react';
import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import ModalUpdate from './ModalUpdate'; // Updated import for the ModalUpdate component

export default function Dashboard({ companies }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleBack = () => {
        window.history.back();
    };

    const handleUpdate = (company) => {
        // Set the selected company for the modal
        setSelectedCompany(company);
        setIsModalOpen(true); // Open the modal
    };

    const handleDelete = (companyId) => {
        // Implement delete logic (e.g., show confirmation modal and call an API)
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCompany(null);
    };

    const handleCompanyUpdate = (updatedData) => {
        // Logic for updating company details (you can send it to an API here)
        console.log("Updated company data:", updatedData);
        // After successful update, close the modal and update the state
        setIsModalOpen(false);
        setSelectedCompany(null);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Company Details" />
        
            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Company Details
                </h2>
        
                <div className="mb-6">
                    <InputLabel htmlFor="company_name" value="Company Name" />
                    <div className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                        {companies.company_name || 'N/A'}
                    </div>
                </div>
        
                <div className="mb-6">
                    <InputLabel htmlFor="company_code" value="Company Code" />
                    <div className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                        {companies.company_code || 'N/A'}
                    </div>
                </div>
        
                <div className="flex items-center justify-between mt-6 space-x-4">
                    <button
                        onClick={handleBack}
                        className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Back
                    </button>
                    
                    <button
                        onClick={() => handleUpdate(companies)} // Pass the company to update
                        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update
                    </button>
                    
                    <button
                        onClick={() => handleDelete(companies.id)} // Implement delete logic
                        className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* ModalUpdate component for updating company */}
            <ModalUpdate 
                isOpen={isModalOpen} 
                onClose={handleModalClose} 
                company={selectedCompany} 
                onUpdate={handleCompanyUpdate} 
            />
        </AuthenticatedLayout>
    );
}





// import InputLabel from "@/Components/InputLabel";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link, useForm } from "@inertiajs/react";

// export default function Dashboard({ companies }) {

//     console.log(companies);

//     // Example of placeholder functions:
//     const handleBack = () => {
//         // Navigate back in the browser's history
//         window.history.back();
//     };
    
//     const handleUpdate = () => {
//         // Navigate to the update page (replace with the correct URL)a
//         window.location.href = `/company/${companies.id}`;
//     };
    
//     const handleDelete = () => {
//         // Implement delete logic (e.g., show confirmation modal and call an API)
//     };

//     console.log(companies);

//     return (
//         <AuthenticatedLayout>
//             <Head title="Company Details" />
        
//             <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//                     Company Details
//                 </h2>
        
//                 <div className="mb-6">
//                     <InputLabel htmlFor="company_name" value="Company Name" />
//                     <div className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
//                         {companies.company_name || 'N/A'}
//                     </div>
//                 </div>
        
//                 <div className="mb-6">
//                     <InputLabel htmlFor="company_code" value="Company Code" />
//                     <div className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
//                         {companies.company_code || 'N/A'}
//                     </div>
//                 </div>
        
//                 <div className="flex items-center justify-between mt-6 space-x-4">
//                     <button
//                         onClick={handleBack} // Implement this function to handle the back action
//                         className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                     >
//                         Back
//                     </button>
                    
//                     <button
//                         // onClick={handleUpdate} // Implement this function to handle the update action
//                         className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Update
//                     </button>
                    
//                     <button
//                         // onClick={handleDelete} // Implement this function to handle the delete action
//                         className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }