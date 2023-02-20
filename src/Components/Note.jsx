import { Button } from "@mui/material";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../index.css";

export default function Note(props) {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100 shadow-slate-700 m-5">
        <div className="px-6 py-4 text-ellipsis">
          <h2>{props.title}</h2>
        </div>
        <hr />
        <div className="px-6 pt-4 pb-2">
          <p className="text-ellipsis h-auto max-w-xs text-left">
            {props.content}
          </p>
          <div className="pl-16">
            <Button
              onClick={() => {
                return props.delete(props.id);
              }}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
