import { useForm } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";

export default function ModalUpdate({ isOpen, onClose, department, companies, onUpdate }) {
    const departmentNameInput = useRef();
    const departmentCodeInput = useRef();
    const readingDateInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        department_name: department?.department_name || "",
        department_code: department?.department_code || "",
        company_id: department?.company_id || "",
        company_name: department?.company_name || "",
        reading_date: department?.reading_date || "",  // Add reading_date to the form
    });

    useEffect(() => {
        if (department) {
            setData({
                department_name: department.department_name,
                department_code: department.department_code,
                company_id: department.company_id,
                company_name: department?.company_name || "",
                reading_date: department?.reading_date || "", // Initialize the reading_date
            });
        }
    }, [department]);

    const handleDateChange = (e) => {
        let value = e.target.value;

        // Remove non-numeric characters except hyphens and limit to valid date format (YYYY-MM-DD)
        value = value.replace(/[^0-9\-]/g, "").replace(/-+/g, "-");

        if (value.length > 4 && value.charAt(4) !== "-") {
            value = value.slice(0, 4) + "-" + value.slice(4);
        }

        if (value.length > 7 && value.charAt(7) !== "-") {
            value = value.slice(0, 7) + "-" + value.slice(7);
        }

        if (value.length > 10) {
            value = value.slice(0, 10); // Restrict input to 10 characters: YYYY-MM-DD
        }

        setData("reading_date", value);  // Update state with formatted date
    };

    const updateDepartment = (e) => {
        e.preventDefault();
        put(route("department.update", department.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onUpdate();
                onClose();
            },
            onError: (errors) => {
                if (errors.department_name) departmentNameInput.current.focus();
                if (errors.department_code) departmentCodeInput.current.focus();
                if (errors.reading_date) readingDateInput.current.focus(); // Focus on reading_date if error
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">
                    Update Department
                </h3>
                <form onSubmit={updateDepartment} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="department_name" value="Department Name" />
                        <TextInput
                            id="department_name"
                            ref={departmentNameInput}
                            value={data.department_name}
                            onChange={(e) => setData("department_name", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.department_name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="department_code" value="Department Code" />
                        <TextInput
                            id="department_code"
                            ref={departmentCodeInput}
                            value={data.department_code}
                            onChange={(e) => setData("department_code", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.department_code} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="company_id" value="Company Name" />
                        <select
                            value={data.company_id}
                            onChange={(e) => setData("company_id", e.target.value)}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a Company</option>
                            {companies.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.company_name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.company_name} className="mt-2 text-sm text-red-600" />
                    </div>

                    <div>
                        <InputLabel htmlFor="reading_date" value="Reading Date (YYYY-MM-DD)" />
                        <input
                            id="reading_date"
                            type="text"
                            value={data.reading_date}
                            onChange={handleDateChange}
                            placeholder="YYYY-MM-DD"
                            required
                            ref={readingDateInput}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <InputError message={errors.reading_date} className="mt-2 text-sm text-red-600" />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>

                        <PrimaryButton type="submit" disabled={processing}>
                            {processing ? "Updating..." : "Update"}
                        </PrimaryButton>
                    </div>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </form>
            </div>
        </div>
    );
}
