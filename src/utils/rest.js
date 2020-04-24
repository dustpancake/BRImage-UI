/* eslint-disable */

const axios = require('axios');

module.exports = {
    // triggers transformation and waits for result
    postImageFm: () => {

    },

    postUriToFm: (uri,params) => {
        console.log(uri);
        console.log(params);
    },

    //stores local image in S3
    putImageStore: () => {

    },

    getFmParams: () => {
        return axios
            .get('https://dpwsttrm5b.execute-api.eu-west-1.amazonaws.com/Prod/interface/fm')
            .then(response => {
                const params = response.data.params;
                const fm = {};
                params.forEach(p => {
                    fm[p.name] = p;
                });
                return fm;
            });
    }
};