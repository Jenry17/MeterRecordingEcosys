// ModalUpdate.js
import { useState, useEffect } from 'react';

export default function ModalUpdate({ isOpen, onClose, company, onUpdate }) {
    const [companyName, setCompanyName] = useState('');
    const [companyCode, setCompanyCode] = useState('');

    // This effect runs when `company` is updated (e.g., when the modal opens)
    useEffect(() => {
        if (company) {
            setCompanyName(company.company_name);
            setCompanyCode(company.company_code);
        }
    }, [company]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (companyName && companyCode) {
            onUpdate({ company_name: companyName, company_code: companyCode });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Update Company</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                            type="text"
                            id="company_name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="company_code" className="block text-sm font-medium text-gray-700">Company Code</label>
                        <input
                            type="text"
                            id="company_code"
                            value={companyCode}
                            onChange={(e) => setCompanyCode(e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
