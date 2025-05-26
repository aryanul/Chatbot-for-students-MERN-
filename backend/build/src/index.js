"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connections_1 = require("./db/connections");
const PORT = process.env.PORT || 3000;
(0, connections_1.connectDatabase)().then(() => {
    app_1.default.listen(PORT, () => console.log("Server is running on Port 3000 & connected to DataBase"));
}).catch((err) => console.log(err));
//# sourceMappingURL=index.js.map