const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let subCategoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'la descripcion de la subCategoria es necesaria']
    }
});

module.exports = mongoose.model('SubCategoria', subCategoriaSchema);