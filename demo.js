const http=require('http');
const fs=require('fs');
const url=require('url');
//Dataset

let superheroes=[
{
id:"1",
name:"Thor",
age:"101",
planet:"Asgard",
weapons:"Strombreaker"
},
{
id:"2",
name:"Iron Man",
age:"56",
planet:"Earth",
weapons:"Suite"
},
{
id:"3",
name:"Captain America",
age:"101",
planet:"Earth",
weapons:"Shield"
},
{
id:4,
name:"Black Widow",
age:"45",
planet:"Earth",
weapons:"WEAPON"
},  
{
id:"5",
name:"Hulk",
age:"101",
planet:"Earth",
weapons:"Greens"
}      
];
// let superherostring=JSON.stringify(superheroes);
// let Superheroes=JSON.parse(superheroes);//object version of superheroes
// console.log(Superheroes);
// creating server

const server=http.createServer((req,res)=>
    {
        console.log(req.url);
        const path=url.parse(req.url,true);
        if(path.pathname=="/" || path.pathname=="/superheroes"){
        

          res.end(superheroes);
        }    
        else if(path.pathname=="/superhero")
        {
            if(req.method=="GET")
            {
            //id    
            const id=path.query.id;
            //singledata
            const singleData=superheroes.filter((ele)=>{
                return ele.id==id;
            })
            res.end(JSON.stringify(singleData));

             }
             else if(req.method=="POST")
             {
                //  res.end("post method");
                let body="";
                req.on('data',(data)=>
                {
                  body+=data;
                })
                req.on('end',()=>
                {   
                let heroes=JSON.parse(body);
                superheroes.push(heroes);
                console.log(superheroes)
                 })
                //  function addsuperhero()
                // {
                //  let val=document.getElementById("add").value;
                //  localStorage.setItem("myname",JSON.stringify(val));
                // }     
                    res.end(JSON.stringify({message:"product added"}));
             }

             else if(req.method=="PUT"){

                // product id 
                const id=path.query.id;
    
                // product data
                let body="";
                req.on('data',(data)=>{
                    body+=data;
                })
    
                req.on('end',()=>{
                    let hero=JSON.parse(body);
    
                    // index will not work 
    
                    superheroes.filter((ele)=>{
                        if(ele.id=id)
                        {
                            ele.id=hero.id;
                            ele.name=hero.name;
                            ele.age=hero.age;
                            ele.planet=hero.planet;
                            ele.weapons=hero.weapons;
                            // console.log(ele);

                        }
                        res.end(JSON.stringify(ele));

                    })

                    // res.end(JSON.stringify({message:"product updated"}));

                    
                    })
    
                }
             else if (req.method=="DELETE")
             {
                 const id=path.query.id;
                 superheroes.forEach((ele,index)=>
                 {
                     if(ele.id==id)
                     {
                         superheroes.splice(index,1);
                         res.end(JSON.stringify(superheroes));

                     }
                 })

             }
             else 
             {
            res.writeHead(404,{
                    "Content-Type":"text/html"
                });
                res.end("<h1>404 resource not found</h1>");
            } 
    }
    });
    //server listening
    server.listen("3000","127.0.0.1",()=>{
        console.log("server is running");
    })
    
