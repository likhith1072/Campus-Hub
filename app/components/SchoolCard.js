import React from 'react'

function SchoolCard({ school }) {
  return (
      <div
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition h-73"
          >
            {/* Image */}
            <div className="w-full h-48 bg-gray-200">
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Details */}
            <div className="px-3 pt-3 pb-1 mx-2 overflow-x-auto">
              <p className="text-blue-600 text-sm whitespace-nowrap">{school.city}</p>
              <h2 className="text-lg font-semibold whitespace-nowrap">{school.name}</h2>
                <p className="text-gray-500 text-sm whitespace-nowrap">{school.address} </p>
            </div>
          </div>
  )
}

export default SchoolCard
