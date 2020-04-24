/* eslint-disable */

const axios = require('axios');

function headCheck(uri) {
    console.log(uri);
    axios
        .get(uri)
        .then(response => {
            console.log(response);
        });
}

module.exports = {
    // triggers transformation and waits for result
    postImageFm: () => {

    },

    postUriToFm: (uri,params) => {
        console.log(uri);
        console.log(params);
        axios
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
                headCheck(response.data);
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

    test: param => {
        console.log(`test got: ${param}`);
        headCheck(param);
    }
};