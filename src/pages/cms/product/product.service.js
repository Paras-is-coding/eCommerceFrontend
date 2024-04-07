import HttpService from "../../../repository/http.service";

class ProductService extends HttpService {
    productLists = async({page=1,limit=10,search=""}) => {
        try {
            let data = await this.getRequest(
                '/v1/product?page='+page+'&limit='+limit+'&search='+search,
                {auth: true}
            )
            return data;
        } catch(exception) {
            throw exception;
        }
    }

    storeProduct = async(data) => {
        try {
            let response = await this.postRequest(
                '/v1/product',
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
                '/v1/product/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    updateProduct = async(id, data) => {
        try {
            let response = await this.putRequest(
                '/v1/product/'+id,
                data,
                {file: true, auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    getProductById = async(id) => {
        try{
            let response = await this.getRequest(
                '/v1/product/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    getProductForHome = async() => {
        try {
            let result = await this.getRequest("/v1/product/home")
            return result;
        } catch(exception) {
            throw exception
        }
    }
}

const productSvc = new ProductService()
export default productSvc