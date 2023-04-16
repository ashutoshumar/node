const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promo = require('../models/promo');



 const promoRouter=express.Router();
 promoRouter.use(bodyParser.json());
 promoRouter.route('/')
 .get((req,res,next)=>{
     Promo.find({})
     .then((promos)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
     },err=>(next(err)))
     .catch((err)=>next(err))
 })
 .post((req,res,next)=>{
     Promo.create(req.body)
     .then((promo)=>{
        console.log('Promoted ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
     },(err) => next(err))
     .catch((err) => next(err));
 })
 .put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /promo');
 })
 .delete((req,res,next)=>{
    Promo.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
 })

 promoRouter.route('/:promoId')
 .get((req,res,next)=>{
    Promo.findById(req.params.promoId)
    .then((promo)=>{
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promo);
    },err=>(next(err)))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /promo/'+ req.params.promoId);
})
.put((req,res,next)=>{
    Promo.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next)=>{
    Promo.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports=promoRouter;


// const express=require('express');
// const bodyParser=require('body-parser');

// const promoRouter=express.Router();
// promoRouter.use(bodyParser.json());
// promoRouter.route('/')
// .all((req,res,next)=>{
//     res.statusCode=200;
//     res.setHeader('Content-Type','text/plain');
//     next();
// })
// .get((req,res,next)=>{
//     res.end('Will send all the promotion details to you');
// })

// .post((req,res,next)=>{
//     res.end('Will give permotion to employee named:'+ res.body.name+'his new position will be: '+ req.body.description);
// })

// .put((req,res,next)=>{
//  res.statusCode=403;
//  res.end('Put request is not supported on /promo');
// })
// .delete((req,res,next)=>{
//     res.statusCode=404;
//     res.end('Delete operation is not supported on /promo');

// });




// promoRouter.route('/:promoId')
// .all((req,res,next)=>{
//     res.statusCode=200;
//     res.setHeader('Content-Type','text/plain');
//     next();
// })
// .get((req,res,next)=>{
//     res.end('Will give the ppermotion to employee whose id is : ' + req.params.promoId );
// })

// .post((req,res,next)=>{
//     res.statusCode = 403;
//     res.end('POST operation not supported on /promo/'+ req.params.promoId);
// })

// .put((req,res,next)=>{
//     res.write('Permoting the employee whose id is: ' + req.params.promoId + '\n');
//     res.end('Will permote the employee named: ' + req.body.name + 
//           ' with details: ' + req.body.description);
// })
// .delete((req,res,next)=>{
//     res.end('Demoting the employee ehose id is: ' + req.params.promoId);

// });
// module.exports=promoRouter;
// //module.exports=dishRouterr;
  
