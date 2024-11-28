import { useForm } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";

export default function ModalUpdate({
    isOpen,
    onClose,
    reading,
    meter,
    onUpdate,
}) {
    const meterNameInput = useRef();
    const readingInput = useRef();
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
        meter_id: reading?.meter_id || "",
        reading: reading?.reading || "",
        reading_date: reading?.reading_date || "",
    });

    useEffect(() => {
        if (reading) {
            setData({
                meter_id: reading.meter_id,
                reading: reading.reading,
                reading_date: reading.reading_date,
            });
        }
    }, [reading]);

    const updateReading = (e) => {
        e.preventDefault();
        put(route("reading.update", reading.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onUpdate();
                onClose();
            },
            onError: (errors) => {
                if (errors.meter_id) meterNameInput.current.focus();
                if (errors.reading) readingInput.current.focus();
                if (errors.reading_date) readingDateInput.current.focus();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Update Reading</h3>

                <form onSubmit={updateReading} className="space-y-6">
                    <div className="mb-6">
                        <InputLabel htmlFor="meter_id" value="Meter Name" />
                        <select
                            value={data.meter_id}
                            onChange={(e) =>
                                setData("meter_id", e.target.value)
                            }
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a Meter</option>
                            {meter.map((items) => (
                                <option key={items.id} value={items.id}>
                                    {items.meter_name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.meter_name}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="reading" value="Reading" />
                        <TextInput
                            id="reading"
                            ref={readingInput}
                            value={data.reading}
                            onChange={(e) => setData("reading", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.reading} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="reading_date" value="Reading Date" />
                        <TextInput
                            id="reading_date"
                            ref={readingDateInput}
                            value={data.reading_date}
                            onChange={(e) =>
                                setData("reading_date", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.meter_id}
                            className="mt-2"
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
