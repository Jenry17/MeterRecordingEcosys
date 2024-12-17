import { useEffect, useRef, useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ErrorModal from "@/Components/ErrorModal";

export default function Register({ reading }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        meter_id: "",
        reading: "",
        reading_date: "",
    });

    const backButtonRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredReading, setFilteredReading] = useState(reading);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

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
            setFilteredReading(reading);
        } else {
            setFilteredReading(
                reading.filter((item) =>
                    item.meter_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, reading]);

    const validateDateFormat = (date) => {
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return regex.test(date);
    };

    const handleDateChange = (e) => {
        let value = e.target.value;

        value = value.replace(/[^0-9\-]/g, "");
        value = value.replace(/-+/g, "-");

        if (value.length > 4 && value.charAt(4) !== "-") {
            value = value.slice(0, 4) + "-" + value.slice(4);
        }

        if (value.length > 7 && value.charAt(7) !== "-") {
            value = value.slice(0, 7) + "-" + value.slice(7);
        }

        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        setData("reading_date", value);
    };

    const handleReadingChange = (e) => {
        const value = e.target.value;

        if (parseInt(value) > 10000) {
            setModalMessage("Reading cannot be greater than 10,000.");
            setShowModal(true);
            setData("reading", 10000);
        } else {
            setData("reading", value);
        }
    };

    const handleSelectReading = (meterId, meterName) => {
        setData("meter_id", meterId);
        setSearchQuery(meterName);
        setDropdownOpen(false);
    };

    const handleInputFocus = () => {
        setDropdownOpen(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => setDropdownOpen(false), 200);
    };

    const submit = (e) => {
        e.preventDefault();

        if (!validateDateFormat(data.reading_date)) {
            setModalMessage("Please enter a valid date in YYYY-MM-DD format.");
            setShowModal(true);
            return;
        }

        post(route("reading.store"), {
            onSuccess: () => {},
            onError: (errors) => {
                console.log(errors);
                setModalMessage(errors.reading_date || "Something went wrong.");
                setShowModal(true);
            },
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalMessage("");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Register" />

            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Register Your Reading
                </h2>

                <form onSubmit={submit}>
                    <div className="mb-6">
                        <InputLabel htmlFor="meter_id" value="Meter Name" />

                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                placeholder="Search for a Meter"
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

                            {isDropdownOpen && filteredReading.length > 0 && (
                                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {filteredReading.map((item) => (
                                        <li
                                            key={item.id}
                                            onClick={() =>
                                                handleSelectReading(
                                                    item.id,
                                                    item.meter_name
                                                )
                                            }
                                            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                                        >
                                            {item.meter_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <InputError
                            message={errors.meter_name}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="reading" value="Reading" />
                        <TextInput
                            type="number"
                            value={data.reading}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleReadingChange}
                            required
                        />
                        <InputError
                            message={errors.reading}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel
                            htmlFor="reading_date"
                            value="Reading Date"
                        />
                        <input
                            type="date"
                            value={data.reading_date}
                            onChange={(e) =>
                                setData("reading_date", e.target.value)
                            }
                            required
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <InputError
                            message={errors.reading_date}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <Link
                            ref={backButtonRef}
                            href={route("reading.index")}
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

            <ErrorModal
                showModal={showModal}
                message={modalMessage}
                onClose={handleCloseModal}
            />
        </AuthenticatedLayout>
    );
}
