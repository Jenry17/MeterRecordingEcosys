import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Register({ companies }) {
    const { data, setData, post, processing, errors } = useForm({
        department_id: "",
        meter_name: "",
        serial_number: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("meter.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Register" />

            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Register New Meter
                </h2>

                <form onSubmit={submit}>
                    <div className="mb-6">
                        <InputLabel
                            htmlFor="department_id"
                            value="Department"
                        />
                        <select
                            value={data.department_id}
                            onChange={(e) =>
                                setData("department_id", e.target.value)
                            }
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a department</option>
                            {companies.data.map((items) => (
                                <option
                                    key={items.id}
                                    value={items.company_name}
                                >
                                    {items.company_name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.items.id}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel
                            htmlFor="meter_name"
                            value="Meter Name"
                        />
                        <TextInput
                            value={data.meter_name}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) =>
                                setData("meter_name", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.meter_name}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel
                            htmlFor="serial_number"
                            value="Serial Number"
                        />
                        <TextInput
                            value={data.serial_number}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) =>
                                setData("serial_number", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.serial_number}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-6">
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





// import InputError from "@/Components/InputError";
// import InputLabel from "@/Components/InputLabel";
// import PrimaryButton from "@/Components/PrimaryButton";
// import TextInput from "@/Components/TextInput";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, useForm } from "@inertiajs/react";

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
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
//                             value="Department ID"
//                         />
//                         <TextInput
//                             value={data.department_id}
//                             className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             isFocused={true}
//                             onChange={(e) =>
//                                 setData("department_id", e.target.value)
//                             }
//                             required
//                         />
//                         <InputError
//                             message={errors.department_id}
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

//                     <div className="flex items-center justify-end mt-6">
//                         <PrimaryButton
//                             className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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