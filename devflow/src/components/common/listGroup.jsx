import React from "react";

const ListGroup = ({
  items,
  selectedItem,
  onItemSelect,
  forceSelect
}) => {
  console.log(items)
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
};


export default ListGroup;
