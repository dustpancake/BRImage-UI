/* eslint-disable */

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

    getRandom: () => {
        //return "https://www.newstatesman.com/sites/default/files/styles/lead_image/public/Longreads_2019/09/2019_39_patti_smith.jpg";
        return `https://picsum.photos/seed/${Math.floor(Math.random() * 0xFFFFFF).toString(16)}/500/500`;
    }
    
}