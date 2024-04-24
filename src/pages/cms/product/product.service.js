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

    getProductForHome = async({page=1,limit=10,search="",category="",brand="",sort=""}) => {
        try {
            let result = await this.getRequest('/v1/product/home?page='+page+'&limit='+limit+'&search='+search+'&category='+category+'&brand='+brand+'&sort='+sort)
            return result;
        } catch(exception) {
            throw exception
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

   


    getProductBySlug = async(slug) => {
        try {
            let result = await this.getRequest(`/v1/product/slug/${slug}`,{auth:true})
            return result.data;
        } catch(exception) {
            throw exception;
        }
    }




    createReview = async ({productId, reviewData}) => {
        try {
            const response = await this.postRequest(
                `/v1/product/review/${productId}`,
                reviewData,
                { auth: true }
            );
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    updateReview = async ({productId, reviewId, reviewData}) => {
        try {
            const response = await this.putRequest(
                `/v1/product/${productId}/review/${reviewId}`,
                reviewData,
                { auth: true }
            );
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    getAllReviews = async (productId) => {
        try {
            const response = await this.getRequest(
                `/v1/product/reviews/${productId}`,
                { auth: true }
            );
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    

}

const productSvc = new ProductService()
export default productSvc