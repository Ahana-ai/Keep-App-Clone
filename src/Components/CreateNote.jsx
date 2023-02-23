import { Button } from "@mui/material";
import React, { useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import "../index.css";
import AddIcon from "@mui/icons-material/Add";

export default function CreateNote(props) {
  const InputEvent = (e) => {
    const { name, value } = e.target;

    props.setNote((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const newNote = () => {
    props.addNote(props.note);
    props.setNote({
      title: "",
      content: "",
    });
  };

  return (
    <>
      <div
        className="box max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-10 shadow-slate-700 "
      >
        <div className=" py-4">
          <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="title"
                value={props.note.title}
                onChange={InputEvent}
                placeholder="Title"
                autoComplete="off"
              />

            <hr />

            <textarea
              cols="40"
              rows="6"
              name="content"
              value={props.note.content}
              onChange={InputEvent}
              placeholder="Write your note..."
              className="my-2"
            />
          </form>
        </div>
          <div className="pl-16">
            <Button className="btnAdd" onClick={newNote}>
              <AddIcon />
            </Button>
            <Button className="btnRef" onClick={() => {return props.refresh()}}>
              <RefreshIcon />
            </Button>
          </div>
      </div>
    </>
  );
}
