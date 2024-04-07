import HttpService from "../../../repository/http.service";

class BrandService extends HttpService {
    brandLists = async({page=1,limit=10,search=""}) => {
        try {
            let data = await this.getRequest(
                '/v1/brand?page='+page+'&limit='+limit+'&search='+search,
                {auth: true}
            )
            return data;
        } catch(exception) {
            throw exception;
        }
    }

    storeBrand = async(data) => {
        try {
            let response = await this.postRequest(
                '/v1/brand',
                data,
                {file: true, auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    deleteById = async(id) => {
        try{
            let response = await this.deleteRequest(
                '/v1/brand/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    updateBrand = async(id, data) => {
        try {
            let response = await this.putRequest(
                '/v1/brand/'+id,
                data,
                {file: true, auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    getBrandById = async(id) => {
        try{
            let response = await this.getRequest(
                '/v1/brand/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    getBrandForHome = async() => {
        try {
            let result = await this.getRequest("/v1/brand/home")
            return result;
        } catch(exception) {
            throw exception
        }
    }
}

const brandSvc = new BrandService()
export default brandSvc