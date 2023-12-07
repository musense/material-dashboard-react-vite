import React from "react";

export default function ContentTitle({ value, onChange }) {
  return <div className='iEditor-Title-Container'>
    <label htmlFor='title'>文章標題</label>
    <input
      name='title'
      id='content-editor-title'
      type='text'
      value={value}
      onChange={onChange} />
  </div>;
}