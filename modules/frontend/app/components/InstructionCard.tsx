import React from 'react';

interface InstructionCardProps {
  imageSrc: string;
  text: string;
}

export const InstructionCard: React.FC<InstructionCardProps> = ({ imageSrc, text }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-2">
      {/* Header */}
      <div className="bg-[#9747FF] px-4 py-2">
        <span className="font-bold text-sm text-white">Work Instruction</span>
      </div>

      {/* Image Area */}
      <div className="w-full h-48 bg-gray-100 relative">
        <img 
          src={imageSrc} 
          alt="Instruction Step" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-lg text-gray-800 font-medium leading-relaxed">
          {text}
        </p>
      </div>
      
      {/* Footer area reserved for layout consistency */}
      <div className="px-4 pb-4"></div>
    </div>
  );
};
