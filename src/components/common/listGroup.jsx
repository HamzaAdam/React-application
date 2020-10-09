import React from "react";

const ListGroups = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
  } = props;

  return (
    <ul className="list-group ">
      <li onClick={() => onItemSelect(null)} className="list-group-item">
        All Genres
      </li>
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroups.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroups;
