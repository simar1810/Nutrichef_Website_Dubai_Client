import React from 'react';
import Image from 'next/image';
import { MenuItem } from '../../app/menu/data';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  return (
    <div className="group flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-100 rounded-[32px] overflow-hidden mb-4">
        <Image 
          src={item.imageUrl} 
          alt={item.title} 
          fill
          unoptimized
          className="object-cover"
        />
        
        {/* Calories Badge Overlay */}
        <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md rounded-full px-3 py-1 text-sm font-semibold text-[#343B42]">
          {item.calories} kcal
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-2">
        {item.isNew && (
          <span className="text-[#FF5C39] text-xs font-bold uppercase tracking-wider mb-2">
            New
          </span>
        )}
        <h3 className="text-lg font-bold text-[#343B42] leading-tight mb-1 group-hover:text-[#114B34] transition-colors">{item.title}</h3>
        <p className="text-sm text-gray-500 mb-6 flex-grow">{item.description}</p>
        
        {/* Macros */}
        <div className="flex items-center space-x-6 text-sm font-medium text-[#343B42] mt-auto">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#7C6EFF] mr-2"></span>
            {item.macros.protein}g Pro
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#FFB340] mr-2"></span>
            {item.macros.carbs}g Carbs
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#40B3FF] mr-2"></span>
            {item.macros.fat}g Fat
          </div>
        </div>
      </div>
    </div>
  );
};
