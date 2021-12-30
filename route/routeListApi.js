const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const List=mongoose.model("List")


// adding new list data
router.post('/addtask',(req,res)=>{

    const {listdata,liststatus}=req.body;
    if(!listdata || !liststatus){
        return  res.status(422).json({error:"plase enter the list data!!!!"})
    }

    // console.log(listdata,liststatus)
    const list = new List({
        listdata,
        liststatus
    })

    list.save().then(resu=>{
        res.json({list:resu});
    }).catch(err=>{
        console.log(err);
    })

})

// getting all list data 
router.get('/alllist',(req,res)=>{

    //  console.log("insode ")
    List.find().populate('liststatus').then(lists=>{
        // console.log(lists)
        res.json({lists});
    }).catch(err=>{
        console.log(err);
    })

})

// update status of list
router.put('/statusupdate',(req,res)=>{

    const {liststatus,listid}=req.body;

    List.findByIdAndUpdate(listid,
        {liststatus:liststatus},
        
    {
        new:true
    }).exec((err,result)=>{
        if(err){
            res.status(422).json({error:err});
        }else{
            res.json(result)
        }
    })
    
})

// update list data 
router.put('/listdataupdate',(req,res)=>{

    const {updatedlistdata,listid}=req.body;

    // console.log(updatedlistdata,listid)
    List.findByIdAndUpdate(listid,
        {listdata:updatedlistdata},
        
    {
        new:true
    }).exec((err,result)=>{
        if(err){
            res.status(422).json({error:err});
        }else{
            res.json(result)
        }
    })
    
})

// delete list based on _id
router.delete('/deletelist/:listid',(req,res)=>{

    // console.log(req.params.taskid);

    List.findOne({_id:req.params.listid})
    .exec((err,list)=>{
        if(err || !list){
            return res.status(422).json({error:err});
        }
        
            list.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err);
            })
    })
})

module.exports= router;