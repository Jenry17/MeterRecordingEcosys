import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ reading, search }) {
    const [searchTerm, setSearchTerm] = useState(search || "");

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        window.location.href = `/reading?search=${newSearchTerm}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Reading Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-4xl mx-auto mt-6 p-8 bg-white shadow-lg rounded-lg">
                <div className="mb-6 flex justify-between items-center">
                    <Link
                        type="button"
                        href={route("reading.create")}
                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-3 shadow-md transition-all"
                    >
                        Register New Reading
                    </Link>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by Reading Date or Meter Name"
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="relative overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-0.5">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Meter Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Reading Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reading.data.length > 0 ? (
                                reading.data.map((items) => (
                                    <tr
                                        key={items.id}
                                        className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4">
                                            {items.meter_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {items.reading_date}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center space-x-2">
                                            <Link
                                                href={`/reading/${items.id}`}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-link"
                                            >
                                                Show Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center px-6 py-4 text-gray-500"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center py-6 space-x-2">
                    <Link
                        href={reading.prev_page_url || "#"}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                            !reading.prev_page_url
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        disabled={!reading.prev_page_url}
                    >
                        Previous
                    </Link>

                    <span className="px-4 py-2 text-sm font-medium text-gray-700">
                        Page {reading.current_page} of {reading.last_page}
                    </span>

                    <Link
                        href={reading.next_page_url || "#"}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                            !reading.next_page_url
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        disabled={!reading.next_page_url}
                    >
                        Next
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}