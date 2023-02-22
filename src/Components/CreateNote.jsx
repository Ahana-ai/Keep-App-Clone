import { Button } from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "../index.css";
import AddIcon from "@mui/icons-material/Add";

export default function CreateNote(props) {
  const [expand, setExpand] = useState(false);

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
        className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-10 shadow-slate-700 "
        onDoubleClick={() => {
          setExpand(false);
        }}
      >
        <div className=" py-4">
          <form onSubmit={(e) => e.preventDefault()}>
            {expand ? (
              <input
                type="text"
                name="title"
                value={props.note.title}
                onChange={InputEvent}
                placeholder="Title"
                autoComplete="off"
              />
            ) : null}

            <hr />

            <textarea
              cols="40"
              rows="6"
              name="content"
              value={props.note.content}
              onClick={() => {
                setExpand(true);
              }}
              onChange={InputEvent}
              placeholder="Write your note..."
              className="my-2"
            />
          </form>
        </div>
        {expand ? (
          <div className="pl-16">
            <Button className="btnAdd" onClick={newNote}>
              <AddIcon />
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
}
