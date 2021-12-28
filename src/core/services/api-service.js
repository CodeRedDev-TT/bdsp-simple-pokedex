import axios from "axios";

const URL = "https://pokeapi.co/api/v2/";
const GlobalErrorHandler = function (err) {
    console.log("Something went wrong...", err);
}

class ApiService {
    static async authenticate(payload) {
        return await this.GeneratePostRequest("authorize", payload);
    }

    static async verifyToken(token) {
        return await this.GeneratePostRequest("verify", {token});
    }


    static async GenerateGetRequest(endpoint, data, useInternal = true) {
        let req = null;
        let url = useInternal ? URL : "";
        try {
            req = await axios({
                method: 'get',
                url: url + endpoint,
                //  headers: {'authorization': `Bearer ${store.getters["Auth/token"]}`},
                params: {
                    ...data
                }
            });
        } catch (err) {
            GlobalErrorHandler(err);
        }
        if (req && req["data"])
            req = req["data"];

        return req;
    }

    static async GenerateGetRequest(endpoint, data, useInternal = true) {
        let req = null;
        let url = useInternal ? URL : "";
        try {
            req = await axios({
                method: 'post',
                url: url + endpoint,
                //       headers: {'authorization': `Bearer ${store.getters["Auth/token"]}`},
                data: {
                    ...data
                }
            })
        } catch (err) {
            GlobalErrorHandler(err);
        }
        if (req && req["data"])
            req = req["data"];

        return req;
    }
}

export default ApiService;