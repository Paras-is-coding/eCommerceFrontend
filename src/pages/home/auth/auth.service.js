import HttpService from "../../../repository/http.service";

class AuthService extends HttpService {
  registerProcess = async (userData) => {
    try {
      // Define your API endpoint for user registration
      const registerEndpoint = 'v1/register';

      // Use postRequest from HttpService to make the registration request
      const response = await this.postRequest(registerEndpoint, userData,{file:true});

      // Process the response as needed (e.g., handle success or error cases)
      return response;
    } catch (error) {
      throw error;
    }
  };

  loginProcess = async(userData)=>{
    try {
      const loginEndpoint = 'v1/login';
      const response = await this.postRequest(loginEndpoint,userData);
      localStorage.setItem('_au',response.data.token)
      localStorage.setItem('_rt',response.data.refreshToken)
      return response;
      
    } catch (error) {
      throw error;      
    }
  }

  getLoggedInUser = async ()=>{
    try {
      const userDetailsEndPoint = '/v1/me';
      const response = await this.getRequest(userDetailsEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }


  getActivationTokenVerify = async (token)=>{
    try {
        const verifyEndpoint = 'v1/verify-token/';
        const response = await this.getRequest(verifyEndpoint+token);
        return response;
    } catch (error) {
        throw error;        
    }
  }

  activateUser = async(token,data)=>{
    try {
      const activateEndPoint = 'v1/set-password/';
      const  response = await this.postRequest(activateEndPoint+token,data);
      return response;
    } catch (error) {
      throw error;      
    }
  }
  
}

const authSvc = new AuthService();
export default authSvc;