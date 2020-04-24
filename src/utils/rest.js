/* eslint-disable */

const axios = require('axios');

function headCheck(uri) {
    console.log(`headcheck: ${uri}`);
    return axios
        .head(uri)
        .then(response => {
            console.log(response);
            return {
                len: response.headers['content-length'],
                uri: uri
            };
        });
}

module.exports = {
    // triggers transformation and waits for result
    postImageFm: () => {

    },

    /*
                {
                    uri: uri,
                    omega: params.omega,
                    phase: params.phase,
                    lowpass: params.lowpass,
                    pquantize: params.pquantize
                }
    */
    postUriToFm: (uri,params) => {
        console.log(uri);
        console.log(params);
        return axios
            .post('https://dpwsttrm5b.execute-api.eu-west-1.amazonaws.com/Prod/image/fm',
                {
                    uri: uri,
                    omega: params.omega,
                    phase: params.phase,
                    lowpass: params.lowpass,
                    pquantize: params.pquantize
                }
            )
            .then(response => {
                console.log(response);
                return headCheck(response.data);
            })
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
    },

    isFmReady: (uri) => {
        return headCheck(uri);
    },

    test: param => {
        console.log(`test got: ${param}`);
        headCheck(param)
            .then(content => {
                console.log(content);
            });
    }
};