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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Initial1599524342666 = void 0;
var Initial1599524342666 = (function () {
    function Initial1599524342666() {
        this.name = 'Initial1599524342666';
    }
    Initial1599524342666.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("CREATE TABLE \"updoot\" (\"value\" integer NOT NULL, \"userId\" integer NOT NULL, \"postId\" integer NOT NULL, CONSTRAINT \"PK_6476d7e464bcb8571004134515c\" PRIMARY KEY (\"userId\", \"postId\"))")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"user\" (\"id\" SERIAL NOT NULL, \"username\" character varying NOT NULL, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"UQ_78a916df40e02a9deb1c4b75edb\" UNIQUE (\"username\"), CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"), CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"post\" (\"id\" SERIAL NOT NULL, \"title\" character varying NOT NULL, \"text\" character varying NOT NULL, \"points\" integer NOT NULL DEFAULT 0, \"creatorId\" integer NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_be5fda3aac270b134ff9c21cdee\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"updoot\" ADD CONSTRAINT \"FK_9df9e319a273ad45ce509cf2f68\" FOREIGN KEY (\"userId\") REFERENCES \"user\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 4:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"updoot\" ADD CONSTRAINT \"FK_fd6b77bfdf9eae6691170bc9cb5\" FOREIGN KEY (\"postId\") REFERENCES \"post\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 5:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"post\" ADD CONSTRAINT \"FK_9e91e6a24261b66f53971d3f96b\" FOREIGN KEY (\"creatorId\") REFERENCES \"user\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 6:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Initial1599524342666.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE \"post\" DROP CONSTRAINT \"FK_9e91e6a24261b66f53971d3f96b\"")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"updoot\" DROP CONSTRAINT \"FK_fd6b77bfdf9eae6691170bc9cb5\"")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"updoot\" DROP CONSTRAINT \"FK_9df9e319a273ad45ce509cf2f68\"")];
                    case 3:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"post\"")];
                    case 4:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"user\"")];
                    case 5:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"updoot\"")];
                    case 6:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return Initial1599524342666;
}());
exports.Initial1599524342666 = Initial1599524342666;
//# sourceMappingURL=1599524342666-Initial.js.map