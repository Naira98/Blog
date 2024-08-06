const dotenv = require("dotenv");
dotenv.config();

exports.MONGOOSE_USER = process.env.MONGOOSE_USER;
exports.MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD;
exports.MONGOOSE_DATABASE = process.env.MONGOOSE_DATABASE;
exports.JWT_SECRET = process.env.JWT_SECRET;
