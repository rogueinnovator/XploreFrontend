import React from 'react';

function Support() {
    // Dummy data
    const data = {
        support: [
            {
                _id: '1',
                customerName: 'John Doe',
                customerEmail: 'codecrush@gmail.com',
                messageTitle: "Booking issue",
            },
            {
                _id: '2',
                customerName: 'Jane Smith',
                customerEmail: 'janesmith@example.com',
                messageTitle: "Payment problem",
            },
            {
                _id: '3',
                customerName: 'Alice Johnson',
                customerEmail: 'alicejohnson@example.com',
                messageTitle: "Room preference",
            },
            {
                _id: '4',
                customerName: 'Bob Brown',
                customerEmail: 'bobbrown@example.com',
                messageTitle: "Late check-in",
            },
            {
                _id: '5',
                customerName: 'Charlie Davis',
                customerEmail: 'charliedavis@example.com',
                messageTitle: "Cancellation request",
            },
        ],
    };

    return (
        <div className="w-full h-auto flex-col justify-start items-start flex border rounded-lg p-3 my-2 shadow-md">
            <h2 className='text-2xl font-semibold'>Support </h2>
            {/* Header row */}
            {/* <hr className="w-full border-t-1 border-gray-300 mt-4" /> */}
            <div className="flex justify-between w-full px-3 py-3 rounded-xl border border-[#e4e4e4] my-3">
                {[
                    'Customer Name',
                    'Customer Email',
                    'Message title',
                    'Action',
                ].map((header, index) => (
                    <div
                        key={index}
                        className="w-1/6 pr-4 flex justify-between items-center"
                    >
                        <div className="text-[#08A5DC] text-base font-medium">
                            {header}
                        </div>
                    </div>
                ))}
            </div>

            {/* Booking rows */}
            <div className="flex w-full flex-col justify-between ">
                {data.support.map((support, index) => (
                    <div
                        key={index}
                        className="h-12 px-3 bg-[#f2f6ff] rounded-[10px] flex justify-between mb-1"
                    >
                        <div className="w-1/6 pr-4 py-2 flex justify-between items-center">
                            <div className="text-[#3d425a] text-base font-medium">
                                {support.customerName}
                            </div>
                        </div>
                        <div className="w-1/6 pr-4 py-2 flex justify-between items-center">
                            <div className="text-[#3d425a] text-base font-medium">
                                {support.customerEmail}
                            </div>
                        </div>
                        <div className="w-1/6 pr-4 py-2 flex justify-between items-center">
                            <div className="text-[#3d425a] text-base font-medium">
                                {support.messageTitle}
                            </div>
                        </div>
                        <div className="w-1/6 pr-4 py-2 flex justify-between items-center">
                            <button className="text-[#08A5DC] text-base font-medium">
                                view details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Support;
