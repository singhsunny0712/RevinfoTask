import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';




function Trashitem(prop) {



  async function PermanentDelete(id) {
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
    console.log(id)
  }

  async function Restore(id) {
    // ----------------------------------------------call update liststatus api
    await fetch("/statusupdate", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        liststatus: "0",
        listid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {

          let newlistData = prop.data.map(item => {
            if (item._id === id) {
              item.liststatus = "0";
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
    console.log(id, "=====>0");
  }

  return (
    <div >
      <li className="trashIcon1">
        <div className="trashIcon2">
          {prop.index+". "}{prop.text}
        </div>
          <RestoreIcon onClick={() => { Restore(prop.id) }} />
          <DeleteIcon onClick={() => { PermanentDelete(prop.id) }} />
      </li>
    </div>
  )
}

export default Trashitem;