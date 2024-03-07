import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/post-slice";
import TimeAndDatePicker from "./DateAndTimePicker";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
function PostForm() {
  const [text, setText] = useState("");
  const [isScheduled, setSchedule] = useState(false);
  const [scheduledAt, setScheduledAt]=useState(0);
  const dispatch = useDispatch();

  const handleSchedule = (scheduledValue) => {
    setScheduledAt(scheduledValue)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const postData =
    scheduledAt > 0
        ? {
            text,
            platforms: user?.access_tokens,
            published: false,
            scheduledAfter:scheduledAt,
          }
        : { text, platforms: user?.access_tokens, published: true };
        
    dispatch(createPost(postData));
    setScheduledAt(0)
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div>
            <label htmlFor="text">Posts</label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              placeholder="Make a Post"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        <div style={{
            display: "flex",
            flexDirection:'row',
            justifyContent: "space-between",
          }}>

        <FormControlLabel
          value={isScheduled}
          control={<Switch color="primary" />}
          label="Schedule Post"
          labelPlacement="start"
          onClick={()=>setSchedule(!isScheduled)}
          />{
            isScheduled  && <TimeAndDatePicker setScheduleValueHandler={(selectedValue)=>handleSchedule(selectedValue)} />
          }
          </div>
          <button type="submit" className="btn btn-block">
            Submit Post
          </button>
        </div>
        
      </form>
    </section>
  );
}

export default PostForm;
