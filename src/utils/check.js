/*disable lint*/
const validator = require('validator');
module.exports = {

    checkUrl: (url) => {
        if(url && url.length > 0) {
            return validator.isURL(url,{ 
                protocols: ['http','https'],
                require_tld: true,
                require_protocol: true,
                require_host: true,
                require_valid_protocol: true,
                allow_underscores: false,
                host_whitelist: false,
                host_blacklist: false,
                allow_trailing_dot: false,
                allow_protocol_relative_urls: false,
                disallow_auth: false 
            });
        }
        else {
            return true;
        }
    }
}