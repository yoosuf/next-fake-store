import React from 'react';

interface StepperProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const Stepper: React.FC<StepperProps> = ({ quantity, onIncrement, onDecrement }) => {
    return (
        <div className="flex items-center space-x-2">
            <button
                className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
                onClick={onDecrement}
            >
                -
            </button>
            <span className="text-gray-800">{quantity}</span>
            <button
                className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
                onClick={onIncrement}
            >
                +
            </button>
        </div>
    );
};

export default Stepper;