import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Register({ companies }) {
    const { data, setData, post, processing, errors } = useForm({
        department_id: "", // Corresponds to 'department_id' in the backend
        meter_name: "",    // Corresponds to 'meter_name' in the backend
        serial_number: "", // Corresponds to 'serial_number' in the backend
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const filteredCompanies = companies.data.filter((company) =>
        company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const submit = (e) => {
        e.preventDefault();
        post(route("meter.store")); // Ensure 'meter.store' route exists in the backend
    };

    const handleSelect = (selectedCompany) => {
        setData("department_id", selectedCompany.id);
        setSearchTerm(selectedCompany.company_name); 
        setIsDropdownVisible(false); 
    };

    return (
        <AuthenticatedLayout>
            <Head title="Register" />

            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Register New Meter
                </h2>

                <form onSubmit={submit}>
                    {/* Department Dropdown */}
                    <div className="mb-6">
                        <InputLabel
                            htmlFor="department_id"
                            value="Department"
                        />
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Select or type a department"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setIsDropdownVisible(true);
                                }}
                                onClick={() => setIsDropdownVisible(true)}
                                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
                                className="mt-2 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                            {isDropdownVisible && filteredCompanies.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                                    {filteredCompanies.map((item) => (
                                        <li
                                            key={item.id}
                                            onClick={() => handleSelect(item)}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            {item.company_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {isDropdownVisible && filteredCompanies.length === 0 && (
                                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                                    <div className="px-4 py-2 text-gray-500">
                                        No results found
                                    </div>
                                </div>
                            )}
                        </div>
                        <InputError
                            message={errors.department_id}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    {/* Meter Name Input */}
                    <div className="mb-6">
                        <InputLabel
                            htmlFor="meter_name"
                            value="Meter Name"
                        />
                        <TextInput
                            id="meter_name"
                            value={data.meter_name}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) =>
                                setData("meter_name", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.meter_name} // Matches backend validation key
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    {/* Serial Number Input */}
                    <div className="mb-6">
                        <InputLabel
                            htmlFor="serial_number"
                            value="Serial Number"
                        />
                        <TextInput
                            id="serial_number"
                            value={data.serial_number}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) =>
                                setData("serial_number", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.serial_number} // Matches backend validation key
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={route("meter.index")}
                            className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Back
                        </Link>

                        <PrimaryButton
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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



// import InputError from "@/Components/InputError";
// import InputLabel from "@/Components/InputLabel";
// import PrimaryButton from "@/Components/PrimaryButton";
// import TextInput from "@/Components/TextInput";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Link } from "@inertiajs/react";
// import { Head, useForm } from "@inertiajs/react";

// export default function Register({ companies }) {

//     console.log(companies);

//     const { data, setData, post, processing, errors } = useForm({
//         department_id: "",
//         meter_name: "",
//         serial_number: "",
//     });

//     const submit = (e) => {
//         e.preventDefault();
//         post(route("meter.store"));
//     };

//     return (
//         <AuthenticatedLayout>
//             <Head title="Register" />

//             <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//                     Register New Meter
//                 </h2>

//                 <form onSubmit={submit}>
//                     <div className="mb-6">
//                         <InputLabel
//                             htmlFor="department_id"
//                             value="Department"
//                         />
//                         <select
//                             value={data.department_id}
//                             onChange={(e) =>
//                                 setData("department_id", e.target.value)
//                             }
//                             className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         >
//                             <option value="">Select a department</option>
//                             {companies.data.map((items) => (
//                                 <option
//                                     key={items.id}
//                                     value={items.id}
//                                 >
//                                     {items.company_name}
//                                 </option>
//                             ))}
//                         </select>
//                         <InputError
//                             message={errors.company_name}
//                             className="mt-2 text-sm text-red-600"
//                         />
//                     </div>

//                     <div className="mb-6">
//                         <InputLabel
//                             htmlFor="meter_name"
//                             value="Meter Name"
//                         />
//                         <TextInput
//                             value={data.meter_name}
//                             className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(e) =>
//                                 setData("meter_name", e.target.value)
//                             }
//                             required
//                         />
//                         <InputError
//                             message={errors.meter_name}
//                             className="mt-2 text-sm text-red-600"
//                         />
//                     </div>

//                     <div className="mb-6">
//                         <InputLabel
//                             htmlFor="serial_number"
//                             value="Serial Number"
//                         />
//                         <TextInput
//                             value={data.serial_number}
//                             className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(e) =>
//                                 setData("serial_number", e.target.value)
//                             }
//                             required
//                         />
//                         <InputError
//                             message={errors.serial_number}
//                             className="mt-2 text-sm text-red-600"
//                         />
//                     </div>

//                     <div className="flex items-center justify-between mt-6">
//                         {/* Back Button */}
//                         <Link
//                             href={route("meter.index")} 
//                             className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
//                         >
//                             Back
//                         </Link>

//                         {/* Submit Button */}
//                         <PrimaryButton
//                             className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             disabled={processing}
//                         >
//                             {processing ? "Registering..." : "Register"}
//                         </PrimaryButton>
//                     </div>
//                 </form>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
