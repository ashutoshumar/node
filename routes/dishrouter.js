const express=require('express');
const bodyParser=require('body-parser');

const dishRouter=express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send you all the dishes to you');
})

.post((req,res,next)=>{
    res.end('Will add the dish:'+ res.body.name+'with details: '+ req.body.description);
})

.put((req,res,next)=>{
 res.statusCode=403;
 res.end('Put request is not supported on /dishes');
})
.delete((req,res,next)=>{
    res.statusCode=404;
    res.end('Delete operation is not supported on /dishes');

});



//const dishRouterr=express.Router();
//dishRouterr.use(bodyParser.json());
dishRouter.route('/:dishId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})

.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})

.put((req,res,next)=>{
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
          ' with details: ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deleting dish: ' + req.params.dishId);

});
module.exports=dishRouter;
//module.exports=dishRouterr;
  
