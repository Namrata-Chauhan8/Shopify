import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiUrl from '../api/Api'
import { toast } from 'react-hot-toast'

const CategoryProduct = () => {
  const [products, setProducts] = useState([])
    const params = useParams()

    const getCategoryByProducts = async () => {
      try {
        const res= await fetch(apiUrl.productsByCategory.url)
        const data = await res.json()
        console.log('data: ', data);
        if (data.success) {
          setProducts(data.data)
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    useEffect(() => {
      getCategoryByProducts()
    }, [])

  return (
    <div>
      {params.categoryName}
    </div>
  )
}

export default CategoryProduct
