"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fintrack_controllers_1 = require("./fintrack_controllers");
const fintrack_controllers_2 = require("./fintrack_controllers");
const fintrack_controllers_3 = require("./fintrack_controllers");
const fintrack_controllers_4 = require("./fintrack_controllers");
const router = (0, express_1.Router)();
router.get('/user/:id', fintrack_controllers_1.fintrackGetbyid);
router.post('/transaction', fintrack_controllers_2.fintrackPost);
router.put('/transaction/:id', fintrack_controllers_3.fintrackPutbyid);
router.delete('/transaction/:id', fintrack_controllers_4.fintrackDeletebyid);
exports.default = router;
