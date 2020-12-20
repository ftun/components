const Request = require('./Request');

/**
* @author avnel santos <avsantos@palaceresorts.com>
* @modificated Felipe Tun <ftun@palaceresorts.com> Implementa componente Request 2020-04-14
* @modificated Felipe Tun <ftun@palaceresorts.com> Implementa componente Request 2020-09-10
*   Se egrega los parametros de 'maxContentLength' y 'maxBodyLength' para la peticion por axios
*   Por default 20000000 bytes => 20M, considerar los siguientes configuraciones en el servidor FE de implementacion y FRM
*   - FRM API => 'upload_max_filesize' php.init
*   - FE (de implementacion) => 'client_max_body_size' /etc/nginx/nginx.conf
* Función para realizar una peticion http utilizando axios
* @param Object Request express
* @param Object Response express
* @param string Endpoint API
* @param integer Tamaño maximo en bytes para la peticion, default 20000000 (20MB)
* @return
*/
const RequestUpload = (req, res, url, maxSize = 20000000) => {

    var buf = new Buffer.from([]),
        size = 0
    ;
    req.on('data', data => {
        size = size + data.length;
        buf = Buffer.concat([buf, data], size);
    }).on('end', dat => {
        let extHeaders = {
            'content-type' : req.headers['content-type'],
            'content-length' : req.headers['content-length'],
        };
        return Request.axiosRequest({
           method: 'POST',
           url: url,
           auth: req.headers.authorization,
           data: buf,
           maxContentLength: maxSize,
           maxBodyLength: maxSize,
        }, false, extHeaders
        ).then(response => {
            return res.status(response.code).json(response.data);
        }).catch(error => {

            if (!error.response) {
                res.json({
                    code: 500,
                    error: true,
                    message: error.message,
                    data: {}
                });
            }

            if(error.response.data.code === '404' && error.response.data.hasOwnProperty('messages')){
                error.response.data.error = true;
            }

            return res.json(error.response.data);
        });
    });
};

module.exports = RequestUpload;
