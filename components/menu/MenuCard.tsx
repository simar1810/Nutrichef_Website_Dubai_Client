import React from "react";
import Image from "next/image";
import { MenuItem } from "../../app/menu/data";

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  return (
    <div className="group flex cursor-pointer flex-col transition-transform duration-300 hover:-translate-y-2">
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-[2rem] bg-bg-light">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          unoptimized
          className="object-cover"
        />

        <div className="absolute left-4 top-4 rounded-full bg-surface/85 px-3 py-1 text-sm font-semibold text-foreground backdrop-blur-md">
          {item.calories} kcal
        </div>
      </div>

      <div className="flex flex-grow flex-col px-2">
        {item.isNew ? (
          <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            New
          </span>
        ) : null}
        <h3 className="mb-1 text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mb-6 flex-grow text-sm text-secondary-text">
          {item.description}
        </p>

        <div className="mt-auto flex items-center space-x-6 text-sm font-medium text-foreground">
          <div className="flex items-center">
            <span className="mr-2 h-3 w-3 rounded-full bg-violet-500" />
            {item.macros.protein}g Pro
          </div>
          <div className="flex items-center">
            <span className="mr-2 h-3 w-3 rounded-full bg-amber-400" />
            {item.macros.carbs}g Carbs
          </div>
          <div className="flex items-center">
            <span className="mr-2 h-3 w-3 rounded-full bg-sky-400" />
            {item.macros.fat}g Fat
          </div>
        </div>
      </div>
    </div>
  );
};
