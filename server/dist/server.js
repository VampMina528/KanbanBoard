"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forceDatabaseRefresh = false;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const index_js_2 = require("./models/index.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const allowedOrigins = [
    'https://kanbanboardmina.netlify.app',
    'http://localhost:3000'
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(index_js_1.default);
app.use(express_1.default.static('client/dist'));
app.get('/ping', (_req, res) => {
    res.send('pong');
});
const hash = bcryptjs_1.default.hashSync('password123', 10);
console.log('Generated Hash:', hash);
index_js_2.sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
