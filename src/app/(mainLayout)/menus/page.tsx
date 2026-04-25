import MenuCard, { MenuItem } from '@/components/common/MenuCard';
import MenuSearchFilter from '@/components/module/menu/MenuSearchFilter';
import { categoryServices } from '@/services/category.service'
import { menuServices } from '@/services/menu.service';
import { CategoryParams } from '@/types/category';
import { Search } from 'lucide-react';
import React from 'react'

export default async function MenuPage({searchParams}: {searchParams: Promise<{ searchParams: CategoryParams }>;}) {
  const params = await searchParams;

  const categoriesPromise = categoryServices.getAllCategories({limit: "all"}, {revalidate: 20});
  const menusPromise = menuServices.getAllMenus({isAvailable: true, limit: "all", ...params}, {revalidate: 20});
  const [{data: categoryData}, {data: menuData}] = await Promise.all([categoriesPromise, menusPromise]);

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto p-6 pb-12 sm:pb-25 pt-20 sm:pt-25">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-text">Available Menus</span>
        </h1>
        <p className="text-muted-foreground">
          Are you hungry? Check out our menu. We have a wide variety of dishes
          to choose from.
        </p>
      </div>
      <div>
        <MenuSearchFilter categories={categoryData.data} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menuData.data.length === 0 ? (
          <div className="text-center py-12 sm:col-span-2 lg:col-span-3 xl:col-span-4">
            <div className="bg-muted/30 rounded-lg p-8 max-w-md mx-auto">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          </div>
        ) : (
          menuData.data.map((item: MenuItem) => (
            <MenuCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
