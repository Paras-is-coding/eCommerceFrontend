import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home/landing/home.page'
import Error404 from '../pages/common/error.page'
import CagetoryDetailPage from '../pages/home/category/category-detail.page'
import CategoryDetailLayout from '../pages/home/category/category-detail.layout'
import AdminDashboard from '../pages/cms/dashboard/dashboard.page'
import PermissionCheck from '../pages/common/checkPermission.page'
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from 'react-toastify'

import { SetPasswordPage,Login,ForgetPassword } from '../pages/home/auth';
// import CMSLayout from '../pages/layouts/cms/cms.layout'
// import HomeLayout from '../pages/layouts/home/home.layout'
// import BannerLayout from '../pages/layouts/banner/banner.layout'
import * as Layouts from '../pages/layouts';
import RegisterPage from '../pages/home/auth/register'

import BannerLayout from '../pages/cms/banner/banner.layout'
import BannerCreate from '../pages/cms/banner/banner.create'
import BannerEdit from '../pages/cms/banner/banner.edit'
import BannerList from '../pages/cms/banner/banner.list'

import BrandLayout from '../pages/cms/brand/brand.layout'
import BrandCreate from '../pages/cms/brand/brand.create'
import BrandEdit from '../pages/cms/brand/brand.edit'
import BrandList from '../pages/cms/brand/brand.list'


import CategoryLayout from '../pages/cms/category/category.layout'
import CategoryCreate from '../pages/cms/category/category.create'
import CategoryEdit from '../pages/cms/category/category.edit'
import CategoryList from '../pages/cms/category/category.list'

import ProductLayout from '../pages/cms/product/product.layout'
import ProductCreate from '../pages/cms/product/product.create'
import ProductEdit from '../pages/cms/product/product.edit'
import ProductList from '../pages/cms/product/product.list'

import ProductDetailsPage from '../pages/home/product/product-detail.page'
import ProductDetailLayout from '../pages/home/product/product-detail.layout'
import ProductsPage from '../pages/home/product/products-page'

import CartPage from '../pages/home/cart/cart-page'


import UserLayout from '../pages/cms/user/user.layout'
import UserList from '../pages/cms/user/user.list'
import UserCreate from '../pages/cms/user/user.create'
import UserEdit from '../pages/cms/user/user.edit'
import SearchResultPage from '../pages/home/search/search-result-page'


export default function Routing() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
        <Routes>

            {/* parent child routes Nesting */}
            <Route path="/" element={<Layouts.HomeLayout/>}>
                <Route index element={<HomePage/>}></Route>
                <Route path='register' element={<RegisterPage/>}></Route>
                <Route path='activate/:token' element={<SetPasswordPage/>}></Route>
                <Route path='forget-password' element={<ForgetPassword/>}></Route>
                <Route path='login' element={<Login/>}></Route>


                <Route path='category/:slug' element={<CategoryDetailLayout/>}>
                    <Route index element={<CagetoryDetailPage/>}></Route>
                    <Route path=":childCat" element={<CagetoryDetailPage/>}></Route>
                </Route>


                <Route path='products/' element={<ProductDetailLayout/>}>
                    <Route index element={<ProductsPage/>}></Route>
                    <Route path=':slug' element={<PermissionCheck Component={<ProductDetailsPage/>}  accessBy={['customer','admin']}/>} ></Route>
                </Route>

                <Route path='carts' element={<PermissionCheck Component={<CartPage/>} accessBy={['customer','admin']}/>}/>

                <Route path='/search' element={<SearchResultPage/>} />

                <Route path='*' element={<Error404/>}/>
            </Route>

           
          {/* different view for admin pannel */}
            <Route path='/admin' element={<PermissionCheck Component={<Layouts.CMSLayout/>} accessBy={["admin"]} />}>
                <Route index element={<AdminDashboard/>}></Route>
                
                <Route path="banner" element={<BannerLayout />}>
                        <Route index element={<BannerList />}></Route>
                        <Route path="create" element={<BannerCreate/>}></Route>
                        <Route path=":id" element={<BannerEdit />}></Route>
                    </Route>

                <Route path="brand" element={<BrandLayout />}>
                        <Route index element={<BrandList />}></Route>
                        <Route path="create" element={<BrandCreate/>}></Route>
                        <Route path=":id" element={<BrandEdit />}></Route>
                    </Route>

                <Route path="category" element={<CategoryLayout />}>
                        <Route index element={<CategoryList />}></Route>
                        <Route path="create" element={<CategoryCreate/>}></Route>
                        <Route path=":id" element={<CategoryEdit/>}></Route>
                    </Route>

                    <Route path="product" element={<ProductLayout />}>
                        <Route index element={<ProductList />}></Route>
                        <Route path="create" element={<ProductCreate/>}></Route>
                        <Route path=":id" element={<ProductEdit />}></Route>
                    </Route>


                    <Route path="user" element={<UserLayout />}>
                        <Route index element={<UserList />}></Route>
                        <Route path="create" element={<UserCreate/>}></Route>
                        <Route path=":id" element={<UserEdit />}></Route>
                    </Route>


            </Route>

        
        </Routes>
    </BrowserRouter>
    </>
  )
}