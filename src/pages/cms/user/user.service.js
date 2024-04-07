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
  listOfUsers = async ({role,page=1,limit=1000})=>{
    try {
      const endpoint = `/v1/user/by-role/${role}?page=${page}&limit=${limit}`;
      const response = await this.getRequest(endpoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }



}

const userSvc = new UserService();
export default userSvc;