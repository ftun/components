const Request = require('./Request');

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Funcionalidad para realizar peticiones del lado del servidor via axios con el componente Request, en base a las propiedades request y response de express
* @param array express request
* @param array express response
* @param string endpoint API
* @param object response type (default:json) node: 'arraybuffer', 'document', 'json', 'text', 'stream'; browser only: 'blob'
*/
const MakeRequest = async (req, res, url, request = {responseType: 'json', promise: false, toString: false, method: null}) => {
    const response = await Request.axiosRequest({
       method: (!request.method) ? req.method.toLowerCase() : request.method,
       url: url,
       auth: req.headers.authorization,
       responseType: request.responseType,
       data: request.toString ? JSON.stringify(req.body) : req.body
    }, false);

    return (request.promise) ? response : res.status(response.code).send(response);
};

module.exports = MakeRequest;
