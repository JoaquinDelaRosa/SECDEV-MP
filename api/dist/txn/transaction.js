"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTransaction = void 0;
const postgres_1 = require("@vercel/postgres");
const executeTransaction = (statements) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield postgres_1.db.connect();
    yield (0, postgres_1.sql) `BEGIN;`;
    statements.forEach((statement) => __awaiter(void 0, void 0, void 0, function* () {
        client.query(statement);
    }));
    yield (0, postgres_1.sql) `END;`;
});
exports.executeTransaction = executeTransaction;
