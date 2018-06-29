"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roleEnum_1 = require("./Enums/roleEnum");
/*
This is the main module of an Angular App
It contains the declarations of every others (Main or not) modules, or components or services
*/
var UserRegister = /** @class */ (function () {
    function UserRegister() {
        this.role = roleEnum_1.RoleEnum.Regular;
    }
    return UserRegister;
}());
exports.UserRegister = UserRegister;
//# sourceMappingURL=userRegister.js.map