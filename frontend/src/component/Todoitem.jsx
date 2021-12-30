import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function Todoitem(prop) {

    const [open, setOpen] = useState(false)
    const [openp, setOpenp] = useState(false)
    const [dialogtext, setdialogtext] = useState(prop.text)
    const [dialogtextp, setdialogtextp] = useState("")

    function hendleOpen(id, text) {
        setdialogtext(text)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    };


    function hendleOpenp(id, text) {
        setdialogtextp(text)
        setOpenp(true)
    }

    const handleClosep = () => {
        setOpenp(false)
    };

   async function PermanentDelete(id){
        // ---------------------------------------------call delete api with _id
        await fetch(`/deletelist/${id}`, {
            method: "delete"
          }).then(res => res.json())
            .then(result => {
    
              let filterData = prop.data.filter(item => item._id !== result._id)
              // console.log(filterData);
              prop.setItems(filterData)
              // console.log(taskData);
            }).catch(err => {
              console.log(err);
            })
        // console.log(id)
        setOpenp(false)
    }
    
    async function InTrash(id){
        // ----------------------------------------------call update liststatus api
        await fetch("/statusupdate", {
            method: "put",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                liststatus: "1",
                listid: id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                console.log(data.error);
              } else {
      
                let newlistData=prop.data.map(item=>{
                  if(item._id===id){
                    item.liststatus="1";
                  }
                  return item;
                })
            
                // console.log(newlistData);
                prop.setItems(newlistData)
            
                // console.log("----------------------");
                
              }
            })
            .catch((err) => {
              console.log(err);
            });
        console.log(id);
        setOpenp(false);
    }

    async function updatelistdata(id,dialogtext){
        // ----------------------------------------------call update listdata api
        await fetch("/listdataupdate", {
            method: "put",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                updatedlistdata: dialogtext,
                listid: id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                console.log(data.error);
              } else {
      
                let newlistData=prop.data.map(item=>{
                  if(item._id===id){
                    item.listdata=dialogtext;
                  }
                  return item;
                })
            
                // console.log(newlistData);
                prop.setItems(newlistData)
            
                // console.log("----------------------");
                
              }
            })
            .catch((err) => {
              console.log(err);
            });
        // console.log(id,dialogtext)
        setdialogtext(dialogtext)
        setOpen(false)
    }

    return (
        <div >
            <li>{dialogtext}

                <EditIcon onClick={() => { hendleOpen(prop.id, prop.text); }} />
                <DeleteIcon onClick={() => { hendleOpenp(prop.id, prop.text); }} />
            </li>
            <Dialog open={open}>
                <div style={{ height: 200, width: 500 }}>
                    <input type="text" value={dialogtext} onChange={(e) => setdialogtext(e.target.value)} />

                    <Stack spacing={2} direction="row" paddingLeft={16} paddingTop={5}>
                     <Button variant="contained" onClick={()=>{updatelistdata(prop.id,dialogtext)}}>Update</Button>
                     <Button variant="outlined" onClick={()=>{handleClose()}}>Cancel</Button>
                    </Stack>
                </div>
            </Dialog>
            <Dialog  open={openp}>
                <div style={{paddingLeft:450}}><CloseIcon onClick={()=>handleClosep()}/></div>
                <div style={{ height: 200, width: 500,textAlign:'center' }}>
                    <h3>{dialogtextp}</h3>
                    <h2>Do you want to delete this list</h2>
                    <Stack spacing={2} direction="row" paddingLeft={13}>
                     <Button variant="contained" onClick={()=>{InTrash(prop.id)}}>In Trash</Button>
                     <Button variant="outlined" onClick={()=>{PermanentDelete(prop.id)}}>Permanent Delete</Button>
                    </Stack>
                </div>
            </Dialog>
        </div>
    )
}

export default Todoitem;