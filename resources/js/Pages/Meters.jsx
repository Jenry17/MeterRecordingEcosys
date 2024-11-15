import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Dashboard({ companies }) {
    console.log(companies);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Companies Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="mb-6">
                <a
                    type="button"
                    href={route("meter.create")}
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-3 shadow-md transition-all"
                >
                    Register New Company
                </a>
            </div>

            {/* <div className="relative overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-0.5">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Company Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Company Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.data.length > 0 ? (
                            companies.data.map((items) => (
                                <tr
                                    key={items.id}
                                    className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-4">
                                        {items.company_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {items.company_code}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center space-x-2">
                                        <Link
                                            href={`/company/${items.id}`}
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
                                    colSpan="3"
                                    className="text-center px-6 py-4 text-gray-500"
                                >
                                    No companies available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center py-6 space-x-2">
                <Link
                    href={companies.prev_page_url || "#"}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                        !companies.prev_page_url
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    disabled={!companies.prev_page_url}
                >
                    Previous
                </Link>

                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                    Page {companies.current_page} of {companies.last_page}
                </span>

                <Link
                    href={companies.next_page_url || "#"}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                        !companies.next_page_url
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    disabled={!companies.next_page_url}
                >
                    Next
                </Link>
            </div> */}
        </AuthenticatedLayout>
    );
}
