import * as React from "react";
import { useState, useReducer } from "react";

// components
import Modal from "./modal";

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
  if (action.type === "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  }
  if (action.type === "REMOVE_ITEM") {
    const newPeople = state.people.filter(
      (person) => person.id !== action.payload
    );
    return { ...state, people: newPeople };
  }
  throw new Error("no matching action type");
};

const defaultState = {
  people: [],
  isModalOpen: true,
  modalContent: "",
};

const Index = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleChange = (e) => {
    setName(e.target.value);
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

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {state.isModalOpen && (
          <Modal closeModal={closeModal} modalContent={state.modalContent} />
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={handleChange}
              style={{ border: "none", background: "#fff", color: "#000" }}
            />
            <button
              type="submit"
              style={{
                border: "none",
                background: "#fff",
                color: "#000",
                marginLeft: "1rem",
              }}
            >
              ADD
            </button>
          </div>
        </form>
        <div style={{ marginTop: "1rem" }}>
          {state.people.map((person) => {
            return (
              <div
                key={person.id}
                style={{ display: "flex", marginBottom: "1rem" }}
              >
                <h4>{person.name}</h4>
                <button
                  onClick={() => {
                    dispatch({ type: "REMOVE_ITEM", payload: person.id });
                  }}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;
