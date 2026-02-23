import AddMenuForm from '@/components/module/provider/add-menu/addMenuForm'
import { categoryServices } from '@/services/category.service'
import React from 'react'

export default async function AddMenuPage() {
    const {data} = await categoryServices.getAllCategories({limit: "all"}, {revalidate: 20});
  return (
    <AddMenuForm availableCategories={data.data}/>
  )
}
