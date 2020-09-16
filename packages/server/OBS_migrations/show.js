"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ShowResolver = void 0;
var type_graphql_1 = require("type-graphql");
var isAuth_1 = require("../middleware/isAuth");
var typeorm_1 = require("typeorm");
var User_1 = require("../entities/User");
var Show_1 = require("../entities/Show");
var ShowInput = (function () {
    function ShowInput() {
    }
    __decorate([
        type_graphql_1.Field()
    ], ShowInput.prototype, "dateOfShow");
    __decorate([
        type_graphql_1.Field()
    ], ShowInput.prototype, "performers");
    __decorate([
        type_graphql_1.Field()
    ], ShowInput.prototype, "text");
    ShowInput = __decorate([
        type_graphql_1.InputType()
    ], ShowInput);
    return ShowInput;
}());
var PaginatedShows = (function () {
    function PaginatedShows() {
    }
    __decorate([
        type_graphql_1.Field(function () { return [Show_1.Show]; })
    ], PaginatedShows.prototype, "posts");
    __decorate([
        type_graphql_1.Field()
    ], PaginatedShows.prototype, "hasMore");
    PaginatedShows = __decorate([
        type_graphql_1.ObjectType()
    ], PaginatedShows);
    return PaginatedShows;
}());
var ShowResolver = (function () {
    function ShowResolver() {
    }
    ShowResolver.prototype.textSnippet = function (show) {
        return show.text.slice(0, 50);
    };
    ShowResolver.prototype.creator = function (show, _a) {
        var userLoader = _a.userLoader;
        return userLoader.load(show.creatorId);
    };
    ShowResolver.prototype.shows = function (limit, cursor) {
        return __awaiter(this, void 0, void 0, function () {
            var realLimit, reaLimitPlusOne, replacements, shows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        realLimit = Math.min(50, limit);
                        reaLimitPlusOne = realLimit + 1;
                        replacements = [reaLimitPlusOne];
                        if (cursor) {
                            replacements.push(new Date(parseInt(cursor)));
                        }
                        return [4, typeorm_1.getConnection().query("\n    select s.*\n    from show s\n    " + (cursor ? "where s.\"dateOfShow\" < $2" : '') + "\n    order by s.\"dateOfShow\" DESC\n    limit $1\n    ", replacements)];
                    case 1:
                        shows = _a.sent();
                        return [2, {
                                posts: shows.slice(0, realLimit),
                                hasMore: shows.length === reaLimitPlusOne
                            }];
                }
            });
        });
    };
    ShowResolver.prototype.post = function (id) {
        return Show_1.Show.findOne(id);
    };
    ShowResolver.prototype.createShow = function (input, _a) {
        var req = _a.req;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2, Show_1.Show.create(__assign(__assign({}, input), { creatorId: req.session.userId })).save()];
            });
        });
    };
    ShowResolver.prototype.updateShow = function (id, dateOfShow, performers, text, _a) {
        var req = _a.req;
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, typeorm_1.getConnection()
                            .createQueryBuilder()
                            .update(Show_1.Show)
                            .set({ dateOfShow: dateOfShow, performers: performers, text: text })
                            .where('id = :id and "creatorId" = :creatorId', {
                            id: id,
                            creatorId: req.session.userId
                        })
                            .returning('*')
                            .execute()];
                    case 1:
                        result = _b.sent();
                        return [2, result.raw[0]];
                }
            });
        });
    };
    ShowResolver.prototype.deleteShow = function (id, _a) {
        var req = _a.req;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, Show_1.Show["delete"]({ id: id, creatorId: req.session.userId })];
                    case 1:
                        _b.sent();
                        return [2, true];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.FieldResolver(function () { return String; }),
        __param(0, type_graphql_1.Root())
    ], ShowResolver.prototype, "textSnippet");
    __decorate([
        type_graphql_1.FieldResolver(function () { return User_1.User; }),
        __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx())
    ], ShowResolver.prototype, "creator");
    __decorate([
        type_graphql_1.Query(function () { return PaginatedShows; }),
        __param(0, type_graphql_1.Arg('limit', function () { return type_graphql_1.Int; })),
        __param(1, type_graphql_1.Arg('cursor', function () { return String; }, { nullable: true }))
    ], ShowResolver.prototype, "shows");
    __decorate([
        type_graphql_1.Query(function () { return Show_1.Show; }, { nullable: true }),
        __param(0, type_graphql_1.Arg('id', function () { return type_graphql_1.Int; }))
    ], ShowResolver.prototype, "post");
    __decorate([
        type_graphql_1.Mutation(function () { return Show_1.Show; }),
        type_graphql_1.UseMiddleware(isAuth_1.isAuth),
        __param(0, type_graphql_1.Arg('input')),
        __param(1, type_graphql_1.Ctx())
    ], ShowResolver.prototype, "createShow");
    __decorate([
        type_graphql_1.Mutation(function () { return Show_1.Show; }, { nullable: true }),
        type_graphql_1.UseMiddleware(isAuth_1.isAuth),
        __param(0, type_graphql_1.Arg('id', function () { return type_graphql_1.Int; })),
        __param(1, type_graphql_1.Arg('dateOfShow')),
        __param(2, type_graphql_1.Arg('performers')),
        __param(3, type_graphql_1.Arg('text')),
        __param(4, type_graphql_1.Ctx())
    ], ShowResolver.prototype, "updateShow");
    __decorate([
        type_graphql_1.Mutation(function () { return Boolean; }),
        type_graphql_1.UseMiddleware(isAuth_1.isAuth),
        __param(0, type_graphql_1.Arg('id', function () { return type_graphql_1.Int; })),
        __param(1, type_graphql_1.Ctx())
    ], ShowResolver.prototype, "deleteShow");
    ShowResolver = __decorate([
        type_graphql_1.Resolver(Show_1.Show)
    ], ShowResolver);
    return ShowResolver;
}());
exports.ShowResolver = ShowResolver;
//# sourceMappingURL=show.js.map