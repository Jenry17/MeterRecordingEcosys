import { useEffect, useRef, useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Register({ meter }) {
    const { data, setData, post, processing, errors } = useForm({
        department_id: "", // Corresponds to 'department_id' in the backend
        meter_name: "", // Corresponds to 'meter_name' in the backend
        serial_number: "", // Corresponds to 'serial_number' in the backend
        max_digit: "", 
    });

    const backButtonRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMeter, setFilteredMeter] = useState(meter);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("meter.store")); // Ensure 'meter.store' route exists in the backend
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

    console.log(meter);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredMeter(meter);
        } else {
            setFilteredMeter(
                meter.filter((item) =>
                    item.department_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, meter]);

    const handleSelectMeter = (departmentid, departmentName) => {
        setData("department_id", departmentid);
        setSearchQuery(departmentName);
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
                    Register New Meter
                </h2>

                <form onSubmit={submit}>
                    {/* Department Dropdown */}
                    <div className="mb-6">
                        <InputLabel htmlFor="department_id" value="Department ID" />

                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                placeholder="Search for Department"
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


                            {isDropdownOpen && filteredMeter.length > 0 && (
                                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {filteredMeter.map((item) => (
                                        <li
                                            key={item.id}
                                            onClick={() =>
                                                handleSelectMeter(
                                                    item.id,
                                                    item.department_name
                                                )
                                            }
                                            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                                        >
                                            {item.department_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <InputError
                            message={errors.department_name}
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    {/* Meter Name Input */}
                    <div className="mb-6">
                        <InputLabel htmlFor="meter_name" value="Meter Name" />
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

                    {/* Max Digit Input */}
                    <div className="mb-6">
                        <InputLabel htmlFor="max_digit" value="Max Digit" />
                        <TextInput
                            id="max_digit"
                            value={data.max_digit}
                            type="text" // Use type="text" for stricter control over input
                            inputMode="numeric" // Ensures numeric keyboard on mobile devices
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => {
                                const value = e.target.value;
                                // Allow only digits and restrict to a maximum of 5 digits
                                if (/^\d{0,5}$/.test(value)) {
                                    setData("max_digit", value);
                                }
                            }}
                            onKeyDown={(e) => {
                                // Allow only numeric keys, Backspace, Delete, Arrow keys, Tab, etc.
                                const allowedKeys = [
                                    "Backspace",
                                    "Delete",
                                    "ArrowLeft",
                                    "ArrowRight",
                                    "Tab",
                                ];
                                if (
                                    !/^\d$/.test(e.key) && // Allow digit keys (0-9)
                                    !allowedKeys.includes(e.key) // Allow control keys
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            maxLength={5} // Limits to 5 digits
                            required
                        />
                        <InputError
                            message={errors.max_digit} // Matches backend validation key
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            ref={backButtonRef}
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
