import React from "react";

import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import moment from "moment";

function PostItem({ goal }) {
  const id = goal._id;
  const dispatch = useDispatch();
  const handleDeleteClick = () => {};

  return (
    <div className="goal">
      {moment(goal.createdAt).format("DD-MM-YYYY")}
      <h1>{goal.text}</h1>
      <Link to={`UpdatePost/${goal._id}`} className="edit">
        <FaRegEdit />
      </Link>
      <button className="close" onClick={handleDeleteClick}>
        <FaRegTrashAlt />
      </button>
    </div>
  );
}

export default PostItem;
