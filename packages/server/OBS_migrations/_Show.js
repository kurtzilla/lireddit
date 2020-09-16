"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.Show = exports.enum_ShowTimeQualifier = void 0;
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var uuid_1 = require("uuid");
var Enum_1 = require("./Enum");
var enum_ShowTimeQualifier;
(function (enum_ShowTimeQualifier) {
    enum_ShowTimeQualifier["EARLY_SHOW"] = "early";
    enum_ShowTimeQualifier["MATINEE"] = "matinee";
    enum_ShowTimeQualifier["LATE_SHOW"] = "late show";
    enum_ShowTimeQualifier["CANCELLED"] = "cancelled";
    enum_ShowTimeQualifier["RESCHEDULED"] = "rescheduled";
    enum_ShowTimeQualifier["POSTPONED"] = "postponed";
})(enum_ShowTimeQualifier = exports.enum_ShowTimeQualifier || (exports.enum_ShowTimeQualifier = {}));
var Show = (function (_super) {
    __extends(Show, _super);
    function Show() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Show.prototype.generateUuid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4, uuid_1.v4()];
                    case 1:
                        _a.idx = _b.sent();
                        return [2];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.PrimaryGeneratedColumn()
    ], Show.prototype, "id");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column(),
        typeorm_1.Index({ unique: true })
    ], Show.prototype, "idx");
    __decorate([
        typeorm_1.BeforeInsert()
    ], Show.prototype, "generateUuid");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ type: 'date' })
    ], Show.prototype, "dateOfShow");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column({
            nullable: true,
            type: 'enum',
            "enum": enum_ShowTimeQualifier
        })
    ], Show.prototype, "showTimeQualifier");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column({
            nullable: true,
            type: 'enum',
            "enum": Enum_1.enum_ShowTimeQualifierTEST
        })
    ], Show.prototype, "showTimeQualifierT");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column()
    ], Show.prototype, "performers");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column()
    ], Show.prototype, "text");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column()
    ], Show.prototype, "creatorId");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.posts; })
    ], Show.prototype, "creator");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.CreateDateColumn()
    ], Show.prototype, "createdAt");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.UpdateDateColumn()
    ], Show.prototype, "updatedAt");
    Show = __decorate([
        type_graphql_1.ObjectType(),
        typeorm_1.Entity()
    ], Show);
    return Show;
}(typeorm_1.BaseEntity));
exports.Show = Show;
//# sourceMappingURL=_Show.js.map