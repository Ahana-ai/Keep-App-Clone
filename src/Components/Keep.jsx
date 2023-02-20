import React, { useState } from "react";
import Swal from "sweetalert2";
import "../index.css";
import CreateNote from "./CreateNote";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";

export default function Keep() {
  const [item, setNewItem] = useState([]);
  const [bool, setBool] = useState(false);

  const addNote = (note) => {
    setBool(false);
    setNewItem((previous) => {
      console.log(previous);
      console.log(note);
      if (note.title.trim() !== "" && note.content.trim() !== "")
        return [
          ...previous,
          {
            title: note.title,
            content: note.content,
            id: new Date().getTime(),
          },
        ];
      else return [...previous];
    });

    console.log(item);
  };

  const deleteNote = (index) => {
    setBool(true);

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
            item.filter((val) => {
              return val.id !== index;
            });
          });
        }
      });
    }
  };

  return (
    <>
      <div className="container ">
        <Header />
        <CreateNote addNote={addNote} />

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
