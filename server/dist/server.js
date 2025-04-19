"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forceDatabaseRefresh = false;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hash = bcryptjs_1.default.hashSync('password123', 10);
console.log('Generated Hash:', hash);
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const index_js_2 = require("./models/index.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});
// Serves static files in the entire client's dist folder
app.use(express_1.default.static('../client/dist'));
app.use(express_1.default.json());
app.use(index_js_1.default);
index_js_2.sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
