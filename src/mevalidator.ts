import express = require("express");

/*
* @param model The mongoose model to validate against
* @param modelPath The name of the path to access the model, for instance `/user` should be entered as `user`
*
*/
export default function(modelPath:string, model:any):express.RequestHandler {
    return function(req:express.Request,res:express.Response, next: Function) {
        // TODO: test a regex here instead, so we can handle nested paths
        const cond1 = req.path === ('/' + modelPath);
        const cond2 = req.path.slice(1,modelPath.length + 1) ===  (modelPath + '/');
        // TODO: Handle partial validation with PATCH
        if((cond1 || cond2) && req.method === 'POST' ) {
            if(!validateModel(req, res, model)) {
              return;
            }
          }
          next()
    };
}

  function validateModel(req:express.Request,res:express.Response, model:any) {
    const vUser = new model(req.body);
      const error = vUser.validateSync();
      if (error) {
        let message:string = '';
        Object.keys(error.errors).forEach((key:string, i:number) => {
          if(i > 0) {
            message += ', ';
          }
          message += error.errors[key].message;
        });
        res.send(message).status(400);
        res.end();
        return false; // Do not call next
      }
    return true;
  }