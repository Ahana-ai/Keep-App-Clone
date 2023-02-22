import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../index.css";
import CreateNote from "./CreateNote";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";

export default function Keep() {
  //State for the create box
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  //State for the complete array to store all the notes
  const [item, setNewItem] = useState([]);
  //State to check
  const [bool, setBool] = useState(false);
  const [editItem, setEditItem] = useState();

  // useEffect(() => {
  //   console.log(bool);
  // }, [bool]);

  const addNote = (note) => {
    setNewItem((previous) => {
      if (note.title.trim() !== "" && note.content.trim() !== "") {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        return [
          ...previous,
          {
            title: note.title,
            content: note.content,
            id: new Date().getTime(),
          },
        ];
      } else {
        Swal.fire("Fields Empty!");
        return [...previous];
      }
    });

    console.log(item);
  };

  const deleteNote = (index) => {
    if (!bool) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          setNewItem(() => {
            return item.filter((val) => {
              return val.id !== index;
            });
          });
        }
      });
    } else {
      Swal.fire("Already in update!");
    }
  };

  const updateItems = (index) => {
    setBool(true);
    item.filter((val) => {
      if (val.id === index) {
        setNote({ title: val.title, content: val.content });
        setEditItem(index);
      }
    });
  };

  const updateNote = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        setNewItem(() => {
          return item.filter((val) => {
            if (val.id === editItem) {
              val.title = note.title;
              val.content = note.content;
            }
            return val.id !== null;
          });
        });
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    setBool(false);
  };

  return (
    <>
      <div className="container ">
        <Header />
        <CreateNote
          addNote={bool ? updateNote : addNote}
          setNote={setNote}
          note={note}
        />

        <div className="flex flex-wrap">
          {item.map((currVal, index) => {
            return (
              <>
                <Note
                  key={index}
                  id={currVal.id}
                  title={currVal.title}
                  content={currVal.content}
                  delete={deleteNote}
                  update={updateItems}
                />
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
