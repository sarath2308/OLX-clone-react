import React from 'react';
import { Link } from 'react-router-dom';

const MyadsCard = ({ product, onEdit, onRemove }) => {
  const item=product;
  return (
    <div className="flex border rounded shadow-sm mb-4 bg-white overflow-hidden w-full">
      
      {/* Date Section (left panel) */}
      <div className="w-32 bg-gray-50 px-3 py-4 text-xs font-semibold text-gray-600 flex flex-col justify-center items-start border-r">
        <p className="text-gray-500">FROM:</p>
        <p className="text-sm font-bold">{product.createAt || 'N/A'}</p>
      </div>

      {/* Product Content */}
      <div className="flex flex-1 p-4 gap-4 items-center">
        
        {/* Image */}
        <Link key={product.id} to={'/details'} 
                      state={{item}}
                      style={{borderWidth:'1px',borderColor:'lightgray'}}
                      >
        <div className="w-24 h-24 flex items-center justify-center border rounded overflow-hidden">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/100'}
            alt={product.title}
            className="object-contain h-full w-full"
          />
        </div>
        </Link>

        {/* Info */}
        <div className="flex flex-col flex-1">
          <h3 className="text-md font-semibold text-gray-800 truncate">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-lg font-semibold text-green-700 mt-1">₹{product.price}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEdit(product)}
            className="border border-blue-900 text-blue-900 px-4 py-1 rounded hover:bg-blue-900 hover:text-white transition"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove(product.id)}
            className="border border-blue-900 text-blue-900 px-4 py-1 rounded hover:bg-blue-900 hover:text-white transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyadsCard;
