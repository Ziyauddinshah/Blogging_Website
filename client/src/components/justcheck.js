// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { addItem, deleteItem } from "../redux/itemReducer";

// const JustCheck = () => {
//   const dispatch = useDispatch();
//   const selector = useSelector((state) => state.item);
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const itemData = selector.items;
//     console.log("selector 1 ", itemData);
//     setData(itemData);
//   }, [selector]);

//   const handleAdd = () => {
//     const id = Math.floor(Math.random() * 1000); // Generating a random ID
//     const newItem = { id: id, name: `Item ${id}` };
//     dispatch(addItem(newItem));
//   };

//   const handleDelete = (id) => {
//     const updatedData = data.filter((data) => data.id !== id);
//     setData(updatedData);
//     dispatch(deleteItem(id));
//   };

//   return (
//     <div>
//       <h2>List of Items</h2>
//       <ul>
//         {data &&
//           data.map((item) => (
//             <li key={item.id}>
//               {item.name}
//               <button onClick={() => handleDelete(item.id)}>Delete</button>
//             </li>
//           ))}
//       </ul>
//       <button onClick={handleAdd}>Add Item</button>
//     </div>
//   );
// };

// export default JustCheck;

import React, { useState } from "react";

function EditableList({ data }) {
  const [editableItemId, setEditableItemId] = useState(null);

  const onEdit = (itemId) => {
    setEditableItemId(itemId);
  };

  const handleSave = (newName) => {
    // Here you can update your data with the new name
    console.log(
      `Saving new name '${newName}' for item with id ${editableItemId}`
    );
    // After saving, reset editableItemId
    // setEditableItemId(null);
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          {editableItemId === item.id ? (
            <div>
              <input
                type="text"
                defaultValue={item.name}
                onChange={(e) => handleSave(e.target.value)}
              />
              <button onClick={() => setEditableItemId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <span>{item.name}</span>
              <button onClick={() => onEdit(item.id)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function JustCheck() {
  const initialData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  return (
    <div>
      <h1>Edit List Items</h1>
      <EditableList data={initialData} />
    </div>
  );
}

export default JustCheck;
