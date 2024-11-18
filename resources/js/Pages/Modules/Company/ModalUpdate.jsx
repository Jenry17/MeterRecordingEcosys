import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function ModalUpdate({ isOpen, onClose, company, onUpdate }) {
    const companyNameInput = useRef();
    const companyCodeInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        company_name: company?.company_name || '',
        company_code: company?.company_code || '',
    });

    useEffect(() => {
        if (company) {
            setData({ company_name: company.company_name, company_code: company.company_code });
        }
    }, [company]);

    const updateCompany = (e) => {
        e.preventDefault();
        put(route('companies.update', company.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onUpdate();
                onClose();
            },
            onError: (errors) => {
                if (errors.company_name) companyNameInput.current.focus();
                if (errors.company_code) companyCodeInput.current.focus();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Update Company</h3>
                <form onSubmit={updateCompany} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="company_name" value="Company Name" />
                        <TextInput
                            id="company_name"
                            ref={companyNameInput}
                            value={data.company_name}
                            onChange={(e) => setData('company_name', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.company_name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="company_code" value="Company Code" />
                        <TextInput
                            id="company_code"
                            ref={companyCodeInput}
                            value={data.company_code}
                            onChange={(e) => setData('company_code', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.company_code} className="mt-2" />
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
                            {processing ? 'Updating...' : 'Update'}
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
