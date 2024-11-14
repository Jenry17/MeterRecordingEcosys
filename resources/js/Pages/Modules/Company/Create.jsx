import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: "",
        company_code: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("company.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Register" />

            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Register Your Company
                </h2>

                <form onSubmit={submit}>
                    <div className="mb-6">
                        <InputLabel
                            htmlFor="company_name"
                            value="Company Name"
                        />
                        <TextInput
                            value={data.company_name}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            isFocused={true}
                            onChange={(e) =>
                                setData("company_name", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.company_name}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel
                            htmlFor="company_code"
                            value="Company Code"
                        />
                        <TextInput
                            value={data.company_code}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) =>
                                setData("company_code", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.company_code}
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