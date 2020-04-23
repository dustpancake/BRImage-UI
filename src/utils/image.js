/* eslint-disable */

module.exports = {

    readLocalImage: () => {

    },

    getRandom: () => {
        return "https://picsum.photos/seed/" + Math.floor(Math.random()*0xFFFFFF).toString(16) + "/350/165";
    }
    
}