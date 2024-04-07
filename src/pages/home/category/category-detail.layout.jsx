import React from 'react'
import { Outlet, useParams, useSearchParams } from 'react-router-dom';


export default function CategoryDetailLayout() {
  const params = useParams();
  const [query,setQuery] = useSearchParams();

  console.log(params)
  console.log(query)

return (

  <>
  <Outlet/>
  </>
)
}
