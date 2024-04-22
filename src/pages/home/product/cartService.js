import HttpService from "../../../repository/http.service";

class CartService extends HttpService {
    // Add item to the cart
    addToCart = async (data) => {
        try {
            let response = await this.postRequest(
                '/v1/cart/add',
                data,
                { auth: true }
            );
            return response;
        } catch (exception) {
            throw exception;
        }
    };

    // List items in the cart
    listCart = async () => {
        try {
            let response = await this.getRequest('/v1/cart/list', { auth: true });
            return response;
        } catch (exception) {
            throw exception;
        }
    };

    // List orders
    listOrder = async () => {
        try {
            let response = await this.getRequest('/v1/cart/order/list', { auth: true });
            return response;
        } catch (exception) {
            throw exception;
        }
    };

    // Delete item from the cart by ID
    deleteCartItem = async (id) => {
        try {
            let response = await this.deleteRequest(`/v1/cart/delete/${id}`, { auth: true });
            return response;
        } catch (exception) {
            throw exception;
        }
    };

    // Place an order
    placeOrder = async () => {
        try {
            let response = await this.postRequest('/v1/cart/order', null, { auth: true });
            return response;
        } catch (exception) {
            throw exception;
        }
    };
}

const cartSvc = new CartService();
export default cartSvc;
