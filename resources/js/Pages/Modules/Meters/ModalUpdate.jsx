import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function ModalUpdate({ isOpen, onClose, meter, onUpdate }) {
    const departmentidInput = useRef();
    const meterNameInput = useRef();
    const serialNumberInput = useRef();
    const maxdigitInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        department_id: meter?.department_id || '',
        meter_name: meter?.meter_name || '',
        serial_number: meter?.serial_number || '',
        max_digit: meter?.max_digit || '',
    });

    useEffect(() => {
        if (meter) {
            setData({ department_id: meter.department_id,  meter_name: meter.meter_name, serial_number: meter.serial_number, max_digit: meter.max_digit});
        }
    }, [meter]);

    const updatemeter = (e) => {
        e.preventDefault();
        put(route('meter.update', meter.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onUpdate();
                onClose();
            },
            onError: (errors) => {
                if (errors.department_id) departmentidInput.current.focus();
                if (errors.meter_name) meterNameInput.current.focus();
                if (errors.serial_number) serialNumberInput.current.focus();
                if (errors.max_digit) maxdigitInput.current.focus();
                
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Update Meter</h3>
                <form onSubmit={updatemeter} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="department_id" value="Department ID" />
                        <TextInput
                            id="department_id"
                            ref={meterNameInput}
                            value={data.department_id}
                            onChange={(e) => setData('department_id', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.department_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="meter_name" value="Meter Name" />
                        <TextInput
                            id="meter_name"
                            ref={departmentidInput}
                            value={data.meter_name}
                            onChange={(e) => setData('meter_name', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.meter_name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="serial_number" value="Serial Number" />
                        <TextInput
                            id="serial_number"
                            ref={serialNumberInput}
                            value={data.serial_number}
                            onChange={(e) => setData('serial_number', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.serial_number} className="mt-2" />
                    </div>

                    <div>
    <InputLabel htmlFor="max_digit" value="Max Digit" />
    <TextInput
        id="max_digit"
        ref={maxdigitInput}
        value={data.max_digit}
        onChange={(e) => {
            const value = e.target.value;
            // Allow only numeric input and restrict to 5 digits
            if (/^\d{0,5}$/.test(value)) {
                setData('max_digit', value);
            }
        }}
        className="mt-1 block w-full"
        placeholder="Enter up to 5 digits"
    />
    <InputError message={errors.max_digit} className="mt-2" />
</div>


                    {/* <div>
                        <InputLabel htmlFor="max_digit" value="Max Digit" />
                        <TextInput
                            id="max_digit"
                            ref={maxdigitInput}
                            value={data.max_digit}
                            onChange={(e) => setData('max_digit', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.max_digit} className="mt-2" />
                    </div> */}

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
