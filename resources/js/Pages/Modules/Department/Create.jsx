import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
export default function Dashboard({ companies }) {
    console.log(companies);

    const{data, setData, post, processing, errors, reset } = useForm({
        deparment_name:'',
        department_code:'',
        company_id:0
    });
    const submit = (e) => {
        e.preventDefault();

        post(route('deparment.store'), {
            // onFinish: () => reset('password'),
        });
    };
    1
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Create Department
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mt-4">
                                    <InputLabel htmlFor="deparment_name" value="Department Name" />
                                    <TextInput
                                        id="department_name"
                                        type="text"
                                        name="department_name"
                                        // value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                    // onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="deparment_code" value="Department Code" />
                                    <TextInput
                                        id="department_name"
                                        type="text"
                                        name="department_name"
                                        // value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                    // onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="company_id" value="Company" />
                                    <TextInput
                                        id="company_id"
                                        type="text"
                                        name="company_id"
                                        // value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                    // onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                <div className="mt-4 flex items-center justify-end">
                                <PrimaryButton className="ms-4" disabled={processing}>
                                        Submit
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
