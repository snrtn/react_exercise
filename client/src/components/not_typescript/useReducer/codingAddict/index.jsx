import * as React from "react";
import { useState, useReducer } from "react";

// components
import Modal from "./modal";

// data
import { data } from "./data";

const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newPeople = [...state.people, action.payload];
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: "item added",
    };
  }
  if (action.type === "NO_VALUE") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "please enter a value",
    };
  }
  throw new Error("no matching action type");
};

const defaultState = {
  people: data,
  isModalOpen: true,
  modalContent: "",
};

const Index = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setName("");
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {state.isModalOpen && <Modal modalContent={state.modalContent} />}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={handleChange}
              style={{ border: "none", background: "#fff", color: "#000" }}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <button
              type="submit"
              style={{
                border: "none",
                background: "#fff",
                color: "#000",
                padding: ".3rem",
              }}
            >
              ADD
            </button>
          </div>
        </form>
        <div style={{ marginTop: "1rem" }}>
          {state.people.map((person) => {
            return (
              <div key={person.id}>
                <h4>{person.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;
