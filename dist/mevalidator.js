"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @param model The mongoose model to validate against
* @param modelPath The name of the path to access the model, for instance `/user` should be entered as `user`
*
*/
function default_1(modelPath, model) {
    return function (req, res, next) {
        // TODO: test a regex here instead, so we can handle nested paths
        var cond1 = req.path === ('/' + modelPath);
        var cond2 = req.path.slice(1, modelPath.length + 1) === (modelPath + '/');
        // TODO: Handle partial validation with PATCH
        if ((cond1 || cond2) && req.method === 'POST') {
            if (!validateModel(req, res, model)) {
                return;
            }
        }
        next();
    };
}
exports.default = default_1;
function validateModel(req, res, model) {
    var vUser = new model(req.body);
    var error = vUser.validateSync();
    if (error) {
        var message_1 = '';
        Object.keys(error.errors).forEach(function (key, i) {
            if (i > 0) {
                message_1 += ', ';
            }
            message_1 += error.errors[key].message;
        });
        res.status(400).send(message_1);
        res.end();
        return false; // Do not call next
    }
    return true;
}
