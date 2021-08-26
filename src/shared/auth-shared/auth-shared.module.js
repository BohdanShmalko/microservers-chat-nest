"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var config_1 = require("@nestjs/config");
var auth_service_1 = require("@shared/auth/auth.service");
var AuthSharedModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Global(),
        common_1.Module({
            imports: [
                jwt_1.JwtModule.registerAsync({
                    inject: [config_1.ConfigService],
                    useFactory: function (config) { return ({
                        secret: config.get('SECRET_KEY')
                    }); }
                }),
            ],
            providers: [auth_service_1.AuthService],
            exports: [auth_service_1.AuthService, jwt_1.JwtModule]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthSharedModule;
