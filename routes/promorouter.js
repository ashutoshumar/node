const express=require('express');
const bodyParser=require('body-parser');

const promoRouter=express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all the promotion details to you');
})

.post((req,res,next)=>{
    res.end('Will give permotion to employee named:'+ res.body.name+'his new position will be: '+ req.body.description);
})

.put((req,res,next)=>{
 res.statusCode=403;
 res.end('Put request is not supported on /promo');
})
.delete((req,res,next)=>{
    res.statusCode=404;
    res.end('Delete operation is not supported on /promo');

});




promoRouter.route('/:promoId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will give the ppermotion to employee whose id is : ' + req.params.promoId );
})

.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /promo/'+ req.params.promoId);
})

.put((req,res,next)=>{
    res.write('Permoting the employee whose id is: ' + req.params.promoId + '\n');
    res.end('Will permote the employee named: ' + req.body.name + 
          ' with details: ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Demoting the employee ehose id is: ' + req.params.promoId);

});
module.exports=promoRouter;
//module.exports=dishRouterr;
  
