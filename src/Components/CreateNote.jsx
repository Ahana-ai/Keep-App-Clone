import { Button } from "@mui/material";
import React, { useState } from "react";
import "../index.css";
import AddIcon from "@mui/icons-material/Add";

export default function CreateNote(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const InputEvent = (e) => {
        const { name, value } = e.target;

        setNote((previous) => {
            return {
            ...previous,
            [name]: value.trim()
            };
        })
    }

    const newNote = () => {
      props.addNote(note);
      setNote({
        title: "",
        content: ""
      });
    }

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-10 shadow-slate-700 bg-slate-100">
        <div className="px-6 py-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={InputEvent}
              placeholder="Title"
            autoComplete="off"
            />

            <hr />

            <textarea
              cols=""
              rows=""
              name="content"
              value={note.content}
              onChange={InputEvent}
              placeholder="Write your note..."
              className="my-2"
            />
          </form>
        </div>
        <div className="pl-16">
          <Button onClick={newNote}>
            <AddIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
