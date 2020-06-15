const seriesController = require('./controllers/series.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
exports.routesConfig = function (app) {
app.post('/series', [
  seriesController.insert
]);
app.get('/series', [
  seriesController.list
]);
app.get('/series/:seriesId', [
  seriesController.getById
]);
app.patch('/series/:seriesId', [
  seriesController.patchById
]);
};
