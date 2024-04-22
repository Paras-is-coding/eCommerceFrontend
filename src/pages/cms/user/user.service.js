import HttpService from "../../../repository/http.service";

class UserService extends HttpService {
  getLoggedInUser = async ()=>{
    try {
      const userDetailsEndPoint = '/v1/me';
      const response = await this.getRequest(userDetailsEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }

  createUserByAdmin = async (userData) => {
    try {
      const endpoint = '/v1/user';
      const response = await this.postRequest(endpoint, userData, { auth: true,file:true });
      return response;
    } catch (error) {
      throw error;
    }
  };

  
  listAllUsers = async({page=1,limit=1000}) =>{
    try {
      const endpoint = `v1/user?page=${page}&limit=${limit}`;
      const response = await this.getRequest(endpoint,{auth:true});
      return response;
      
    } catch (error) {
      throw error;      
    }
  }



  listOfUsersByRole = async ({role,page=1,limit=1000})=>{
    try {
      const endpoint = `/v1/user/by-role/${role}?page=${page}&limit=${limit}`;
      const response = await this.getRequest(endpoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  listOfUsersByStatus = async ({status,page=1,limit=1000})=>{
    try {
      const endpoint = `/v1/user/by-status/${status}?page=${page}&limit=${limit}`;
      const response = await this.getRequest(endpoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }


  getUserById = async (id)=>{
    try {
      const userDetailsEndPoint = '/v1/user/'+id;
      const response = await this.getRequest(userDetailsEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }

  updateUserById = async (id, userData) => {
    try {
      console.log("ud",userData)
        const updateUserEndPoint = `/v1/user/${id}`;
        const response = await this.putRequest(updateUserEndPoint, userData, { auth: true,file:true });
        return response;
    } catch (error) {
        throw error;
    }
}

deleteUserById = async (id) => {
    try {
        const deleteUserEndPoint = `/v1/user/${id}`;
        const response = await this.deleteRequest(deleteUserEndPoint, { auth: true });
        return response;
    } catch (error) {
        throw error;
    }
}



}

const userSvc = new UserService();
export default userSvc;