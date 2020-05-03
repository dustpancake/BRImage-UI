/* eslint-disable */

const Compressor = require('compressorjs');

module.exports = {

    readLocalImage: (file) => {
        return new Promise((resolve,reject) => {
            const reader = new FileReader();
            reader.onload = e => {
              resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    },

    readLocalImageCompressed: (file) => {
        return new Promise((resolve,reject) => {
            new Compressor(file, {
                quality: 0.6,
                maxWidth: 500,
                maxHeight: 500,
                success(result) {
                    console.log('compressed');
                    console.log(result);
                    const reader = new FileReader();
                    reader.onload = e => {
                        resolve(e.target.result);
                    };
                    reader.readAsDataURL(result);
                },
                error(err) {
                  console.log(err.message);
                  reject(err);
                },
              });
        });
    },

    compressFile: (file) => {
        return new Promise((resolve,reject) => {
            console.log(file);
            // if(file.size < 500000) {
            //     console.log('uncompressed');
            //     resolve(file);
            // }
            // else {
                new Compressor(file, {
                    //quality: 0.6,
                    maxWidth: 900,
                    maxHeight: 900,
                    success(result) {
                        console.log('compressed');
                        console.log(result);
                        resolve(result);
                        //reject('WorkinProgress');
                    },
                    error(err) {
                        console.log(err.message);
                        reject(err);
                    },
                });
            // }
        });            
    },

    getRandom: () => {
        //return "https://www.newstatesman.com/sites/default/files/styles/lead_image/public/Longreads_2019/09/2019_39_patti_smith.jpg";
        return `https://picsum.photos/seed/${Math.floor(Math.random() * 0xFFFFFF).toString(16)}/500/500`;
    },

    getBridgetRiley: () => {
        return "br.jpg";
    }
    
}