import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../index.css";
import CreateNote from "./CreateNote";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";

export default function Keep() {
  //Function to fetch the local storage
  const getItem = () => {
    let list = localStorage.getItem("Notes");

    if (list) return JSON.parse(localStorage.getItem("Notes"));
    else return [];
  };

  //State for the create box
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  //State for the complete array to store all the notes
  const [item, setNewItem] = useState(getItem());
  //State to check add or edit
  const [bool, setBool] = useState(false);
  //State to find id for the note while editing
  const [editItem, setEditItem] = useState();
  //State to get the light or dark mode
  const [mode, setMode] = useState('light');

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(item));
  }, [item]);

  const addNote = (note) => {
    setNewItem((previous) => {
      if (note.title.trim() !== "" && note.content.trim() !== "") {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
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
    if (bool) {
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
    } else {
      setBool(true);
      item.filter((val) => {
        if (val.id === index) {
          setNote({ title: val.title, content: val.content });
          setEditItem(index);
        }
      });
    }
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

  const refresh = () => {
    if (note.title && note.content) {
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
          if (bool) {
            deleteNote(editItem);
          }
          setNote({
            title: "",
            content: "",
          });
          setBool(false);
          Swal.fire("Cleared!", "Your note has been cleared.", "success");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Field is empty!",
      });
    }
  };

  const toggleMode = () => {
    mode === 'light' ? setMode('dark') : setMode('light');
  }

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <>
      <div className="container">
        <Header />
        <div className="flex justify-centre">
          <input
            className="mx-96 mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(23,23,23,0.35)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={toggleMode}
          />
          <label
            className="label-text block pl-[0.15rem] hover:cursor-pointer"
            htmlFor="flexSwitchCheckDefault"
          >
            Enable Dark Mode
          </label>
        </div>

        <CreateNote
          addNote={bool ? updateNote : addNote}
          setNote={setNote}
          note={note}
          refresh={refresh}
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
