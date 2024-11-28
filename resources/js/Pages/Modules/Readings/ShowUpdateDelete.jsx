import { useState, useEffect, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ModalUpdate from "./ModalUpdate";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Dashboard({ reading, meter }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedReading, setSelectedReading] = useState(null);

    const { delete: destroy, processing, reset, clearErrors } = useForm();

    const backButtonRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                backButtonRef.current?.click();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const openUpdateModal = (reading) => {
        setSelectedReading(reading);
        setIsModalOpen(true);
    };

    const openDeleteModal = (reading) => {
        setSelectedReading(reading);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        clearErrors();
        reset();
    };

    const deleteReading = (e) => {
        e.preventDefault();

        if (!selectedReading || !selectedReading.id) {
            console.error("No department selected for deletion");
            return;
        }

        destroy(route("reading.destroy", selectedReading.id), {
            preserveScroll: true,
            onSuccess: closeDeleteModal,
        });
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedReading(null);
    };

    const handleReadingUpdate = () => {
        setIsModalOpen(false);
        setSelectedReading(null);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Department Details" />

            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Reading Details
                </h2>

                <div className="mb-6">
                    <InputLabel htmlFor="meter_name" value="Meter Name" />
                    <div className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                        {reading.meter_name || "N/A"}
                    </div>
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="reading" value="Reading" />
                    <div className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                        {reading.reading || "N/A"}
                    </div>
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="reading_date" value="Reading Date" />
                    <div className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                        {reading.reading_date || "N/A"}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6 space-x-4">
                    <Link
                        ref={backButtonRef}
                        href={route("reading.index")}
                        className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Back
                    </Link>

                    <button
                        onClick={() => openUpdateModal(reading)}
                        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        Update
                    </button>

                    <button
                        onClick={() => openDeleteModal(reading)}
                        className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this reading?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Once this reading is deleted, all of its resources and
                        data will be permanently removed.
                    </p>

                    <div className="mt-6 flex justify-end space-x-4">
                        <SecondaryButton onClick={closeDeleteModal}>
                            No, Cancel
                        </SecondaryButton>
                        <DangerButton
                            onClick={deleteReading}
                            disabled={processing}
                        >
                            Yes, Delete Reading
                        </DangerButton>
                    </div>
                </div>
            </Modal>

            <ModalUpdate
                isOpen={isModalOpen}
                onClose={handleModalClose}
                reading={reading}
                meter={meter}
                onUpdate={handleReadingUpdate}
            />
        </AuthenticatedLayout>
    );
}
