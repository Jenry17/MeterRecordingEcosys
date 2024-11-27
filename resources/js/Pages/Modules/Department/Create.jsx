import { useEffect, useRef, useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";   
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Register({ department }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        department_name: "",
        department_code: "",
        company_id: "",
    });

    const backButtonRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDepartments, setFilteredDepartments] = useState(department);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("department.store"));
    };

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

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredDepartments(department);
        } else {
            setFilteredDepartments(
                department.filter((item) =>
                    item.company_name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, department]);

    const handleSelectCompany = (companyId, companyName) => {
        setData("company_id", companyId);
        setSearchQuery(companyName);
        setDropdownOpen(false);
    };

    const handleInputFocus = () => {
        setDropdownOpen(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => setDropdownOpen(false), 200);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Register" />

            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Register Your Department
                </h2>

                <form onSubmit={submit}>
                    <div className="mb-6">
                        <InputLabel
                            htmlFor="department_name"
                            value="Department Name"
                        />
                        <TextInput
                            value={data.department_name}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) =>
                                setData("department_name", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.department_code}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel
                            htmlFor="department_code"
                            value="Department Code"
                        />
                        <TextInput
                            value={data.department_code}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) =>
                                setData("department_code", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.department_code}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="company_id" value="Company Name" />

                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                placeholder="Search for a company"
                                className="mt-2 block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </span>


                            {isDropdownOpen && filteredDepartments.length > 0 && (
                                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {filteredDepartments.map((item) => (
                                        <li
                                            key={item.id}
                                            onClick={() => handleSelectCompany(item.id, item.company_name)}
                                            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                                        >
                                            {item.company_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <InputError
                            message={errors.company_name}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <Link
                            ref={backButtonRef}
                            href={route("department.index")}
                            className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Back
                        </Link>
                        <PrimaryButton
                            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={processing}
                        >
                            {processing ? "Registering..." : "Register"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
