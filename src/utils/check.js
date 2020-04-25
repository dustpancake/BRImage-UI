/*eslint-disable*/
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
    },

    checkOmega: (value,params) => {
        console.log(JSON.stringify(params));
        if(value) {
            return validator.isFloat(value,{
                gt: Number(params.min.slice(1)),
                max: Number(params.max)
            }) && validator.isLength(value, {
                min: 0,
                max: params.step.toString().length
            });
        }
        return true;
    },

    checkPhase: (value,params) => {
        console.log(JSON.stringify(params));
        if(value) {
            return validator.isFloat(value,{
                gt: Number(params.min.slice(1)),
                max: Number(params.max)
            }) && validator.isLength(value, {
                min: 0,
                max: params.step.toString().length
            });
        }
        return true;
    },

    checkLowpass: (value,params) => {
        console.log(JSON.stringify(params));
        if(value) {
            return validator.isFloat(value,{
                min: Number(params.min),
                lt: Number(params.max.slice(1))
            }) && validator.isLength(value, {
                min: 0,
                max: params.step.toString().length
            });
        }
        return true;
    },

    checkPquantize: (value,params) => {
        console.log(JSON.stringify(params));
        if(value) {
            return validator.isFloat(value,{
                min: Number(params.min),
                lt: Number(params.max.slice(1))
            }) && validator.isLength(value, {
                min: 0,
                max: params.step.toString().length
            });
        }
        return true;
    }
}