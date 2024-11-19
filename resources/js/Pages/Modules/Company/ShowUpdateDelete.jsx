import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ModalUpdate from "./ModalUpdate";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";

export default function Dashboard({ companies }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const { delete: destroy, processing, reset, clearErrors } = useForm();

    const handleBack = () => window.history.back();

    const openUpdateModal = (company) => {
        setSelectedCompany(company);
        setIsModalOpen(true);
    };

    const openDeleteModal = (company) => {
        setSelectedCompany(company);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        clearErrors();
        reset();
    };

    const deleteCompany = (e) => {
        e.preventDefault();
    
        if (!selectedCompany || !selectedCompany.id) {
            console.error('No company selected for deletion');
            return;
        }
        
        destroy(route("company.destroy", selectedCompany.id), {
            preserveScroll: true,
            onSuccess: closeDeleteModal,
        });
    };
    
    

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCompany(null);
    };

    const handleCompanyUpdate = () => {
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
                        {companies.company_name || "N/A"}
                    </div>
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="company_code" value="Company Code" />
                    <div className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                        {companies.company_code || "N/A"}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6 space-x-4">
                    <button
                        onClick={handleBack}
                        className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400"
                    >
                        Back
                    </button>

                    <button
                        onClick={() => openUpdateModal(companies)}
                        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        Update
                    </button>

                    <button
                        onClick={() => openDeleteModal(companies)}
                        className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this company?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Once the company is deleted, all of its resources and
                        data will be permanently removed.
                    </p>

                    <div className="mt-6 flex justify-end space-x-4">
                        <SecondaryButton onClick={closeDeleteModal}>
                            No, Cancel
                        </SecondaryButton>
                        <DangerButton
                            onClick={deleteCompany}
                            disabled={processing}
                        >
                            Yes, Delete Company
                        </DangerButton>
                    </div>
                </div>
            </Modal>

            <ModalUpdate
                isOpen={isModalOpen}
                onClose={handleModalClose}
                company={companies}
                onUpdate={handleCompanyUpdate}
            />
        </AuthenticatedLayout>
    );
}
