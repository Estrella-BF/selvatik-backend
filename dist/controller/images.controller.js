"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.getFolderImagesController = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const getFolderImagesController = async (request, response) => {
    try {
        /*     const { folder_path } = request.query;
            console.log('---folder_path:', folder_path)
            const result = await cloudinary.search
              .expression(`folder:${folder_path}`)
              .max_results(500)
              .execute(); */
        return response.json('result.resources');
    }
    catch (err) {
        console.log('---ERROR FOLDER IMAGE:', err);
        return response.status(500).json({ error: JSON.stringify(err) });
    }
};
exports.getFolderImagesController = getFolderImagesController;
const uploadImage = (file, folder = "products") => {
    const buffer = file.buffer;
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder, public_id: file.originalname, overwrite: true }, (err, result) => {
            if (err)
                return reject(err);
            resolve(result);
        });
        streamifier_1.default.createReadStream(buffer).pipe(uploadStream);
    });
};
exports.uploadImage = uploadImage;
