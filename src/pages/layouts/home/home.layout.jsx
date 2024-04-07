import React, { useEffect } from 'react'
import NavBar from '../../../component/home/navbar'
import { Outlet } from 'react-router-dom'
import authSvc from '../../home/auth/auth.service'
import { setLoggedInUser } from '../../../redux/reducers/user.reducers';
import { useDispatch, useSelector } from 'react-redux'
// import { helloTest } from '../../../redux/reducers/user.reducers';

export default function HomeLayout() {
  // adding data into store
  const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch(
        // helloTest("Hello message!")
  //     )
  // }, []);

  // using data in store
  // const userData = useSelector((storeData)=>{
  //   return storeData.User;
  // })

  // look home header component there we've used user data from store
  const loggedInUser = async()=>{
    try {
      const response = await authSvc.getLoggedInUser();
      if(response){
        // console.log(response.data.authUser)
        dispatch(
          setLoggedInUser(response.data.authUser)
        )
      }
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("_au");
    if(token){
      loggedInUser();
    }
  }, []);

  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}
