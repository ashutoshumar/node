const rectangle = require('./rectangle')
var rect=require('./rectangle')
function solveRect(l,b)
{
    console.log("solving for rectangle for l="+l+"and b="+b)
  rect(l,b,(err,rectangle)=>{
      if(err)
      {
          console.log("ERROR",err.message);
      }else{
          console.log("area=",rectangle.area());
          console.log("perinmeter=",rectangle.perimeter());

      }
  })
  console.log("this statement is after the call of rect()");
   
}

solveRect(4,5)