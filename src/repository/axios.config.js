import axios from 'axios';

   const axiosInstance = axios.create({
     baseURL: import.meta.env.VITE_API_URL,
     timeout: 30000, // Set your preferred timeout
     timeoutErrorMessage: 'Request timed out',
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json'
     },
   });

  //  axiosInstance.interceptors.response.use(
  //   (response)=>{
  //     // return response.data;
  //   },
  //   (error)=>{
  //     // error handeling


  //     if(error.response.status === 401){
  //     // clear token
  //     // redirect to login
  //     // refresh token 
              // local storage
              // accesstoken => existing token update
              // exception => localstorage.clear()
                  // login redirect
  //     }
  //   }
   
  //  )



   export default axiosInstance;