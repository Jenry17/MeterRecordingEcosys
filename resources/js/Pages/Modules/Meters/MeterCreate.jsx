import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Head, useForm } from "@inertiajs/react";

export default function Register({ companies }) {
    const { data, setData, post, processing, errors } = useForm({
        department_id: "", // Corresponds to 'department_id' in the backend
        meter_name: "",    // Corresponds to 'meter_name' in the backend
        serial_number: "", // Corresponds to 'serial_number' in the backend
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("meter.store")); // Ensure 'meter.store' route exists in the backend
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
                        <select
                            id="department_id"
                            value={data.department_id}
                            onChange={(e) =>
                                setData("department_id", e.target.value)
                            }
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a department</option>
                            {companies.data.map((company) => (
                                <option
                                    key={company.id}
                                    value={company.id}
                                >
                                    {company.company_name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.department_id} // Matches backend validation key
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
                        {/* Back Button */}
                        <Link
                            href={route("meter.index")} // Back to meters list
                            className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Back
                        </Link>

                        {/* Submit Button */}
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
