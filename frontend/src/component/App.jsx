import React, { useState, useEffect } from "react";
import ToDoitem from "./Todoitem.jsx";
import TrashItem from "./Trashitem";
import { Dialog } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function App() {

    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false)

    // const fake_data= [
    //         {
    //             "_id": "61cd9b4e9952bdb7be7164f6",
    //             "listdata": "abcde1",
    //             liststatus: "0",
    //             __v: 0
    //         },
    //         {
    //             _id: "61cd9c1522417b31a8633ffe",
    //             listdata: "abcde2",
    //             liststatus: "1",
    //             __v: 0
    //         },
    //         {
    //             _id: "61cd9c2422417b31a8634001",
    //             listdata: "abcde3",
    //             liststatus: "0",
    //             __v: 0
    //         },
    //         {
    //             _id: "61cd9c2422417b31b8634001",
    //             listdata: "abcde4",
    //             liststatus: "0",
    //             __v: 0
    //         }
    //     ]





    useEffect(() => {

        // ----------------------------------------call api fetching all list-------------------------
        fetch("/alllist", {
            method: "get"
        }).then(res => res.json())
            .then(result => {
                //    console.log(result.lists)
                setItems(result.lists);

            }).catch((err) => {
                console.log(err);
            });
        
    }, [])


    function hendleOpen() {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    };



    function handle(event) {
        const newval = event.target.value;
        setInputText(newval);
    }


    async function addItem() {

        if (inputText === "") {
            return;
        }

        // ----------------call add list api--------------------------------

        await fetch("/addtask", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                listdata: inputText,
                liststatus: "0",
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    items.push(data.list)
                }
            })
            .catch((err) => {
                console.log(err);
            });

        setInputText("");
    }

    return (
        <div className="container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input onChange={handle} type="text" value={inputText} /><br />
                <button onClick={addItem} className="addbutton"><span>Add</span></button>
                <button onClick={hendleOpen} className="addbutton1"><span>Show Trash</span></button>
            </div>
            <div>
                <ul>
                    {items.filter((x,index) => x.liststatus === "0").map((x,index) =>
                        <ToDoitem
                            text={x.listdata}
                            key={x._id}
                            id={x._id}
                            data={items}
                            setItems={setItems}
                            index={index+1}
                        />)
                    }
                </ul>
            </div>

            <Dialog open={open}>
                <div style={{display:"flex"}}>
                    <div className="TrashStyle" style={{ marginLeft: 200}}>Trash</div>
                    <div style={{ paddingLeft: 200 }}><CloseIcon onClick={() => handleClose()} /></div>
                </div>
                <div>
                <ul>
                    { items.filter((x,index) => x.liststatus === "1").map((x,index) =>
                        <TrashItem
                            text={x.listdata}
                            key={x._id}
                            id={x._id}
                            data={items}
                            setItems={setItems}
                            index={index+1}
                        />
                        // <li>{x.listdata}</li>
                        )
                    }
                </ul>

                </div>
            </Dialog>

        </div>
    )
}

export default App;