import { useForm } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";

export default function ModalUpdate({ isOpen, onClose, department, onUpdate }) {
    const departmentNameInput = useRef();
    const departmentCodeInput = useRef();

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
    });

    useEffect(() => {
        if (department) {
            setData({
                department_name: department.department_name,
                department_code: department.department_code,
                company_id: department.company_id,  
                company_name: department?.company_name || "",
            });
        }
    }, [department]);

    console.log(data);

    const updateDepartment = (e) => {
        e.preventDefault();
        put(route("departme.update", department.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onUpdate();
                onClose();
            },
            onError: (errors) => {
                if (errors.department_name) departmentNameInput.current.focus();
                if (errors.department_code) departmentCodeInput.current.focus();
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
                        <InputLabel
                            htmlFor="department_name"
                            value="Department Name"
                        />
                        <TextInput
                            id="department_name"
                            ref={departmentNameInput}
                            value={data.department_name}
                            onChange={(e) =>
                                setData("department_name", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.department_name}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="department_code"
                            value="Department Code"
                        />
                        <TextInput
                            id="department_code"
                            ref={departmentCodeInput}
                            value={data.department_code}
                            onChange={(e) =>
                                setData("department_code", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.department_code}
                            className="mt-2"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="company_id" value="Company Name" />
                        <select
                            value={data.company_id}
                            onChange={(e) =>
                                setData("company_id", e.target.value)
                            }
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a Company</option>
                            {/* {data.map((items) => (
                                <option key={items.id} value={items.id}>
                                    {items.company_name}
                                </option>
                            ))} */}
                        </select>
                        <InputError
                            message={errors.company_name}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:b g-gray-400"
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
