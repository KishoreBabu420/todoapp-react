import React, { useState, useEffect } from 'react';

import Alert from './components/Alert';
import List from './components/List';

import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      //display Alert
      showAlert(true, 'Grocery cannot be empty', 'danger');
    } else if (name && isEditing) {
      //deal with edit
      const newList = list.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            title: name,
          };
        } else {
          return item;
        }
      });

      setList(newList);
      setIsEditing(false);
      setEditId(null);
      //show edit alert
      showAlert(true, 'Grocery updated', 'success');
    } else {
      //deal with adding grocery
      const newGrocery = { id: uuidv4(), title: name };
      //add to list
      setList([...list, newGrocery]);
      setName('');
      //show add alert
      showAlert(true, 'Grocery added', 'success');
    }
  };

  const showAlert = (show, message, type) => {
    setAlert({
      show: show,
      message: message,
      type: type,
    });

    // setAlert({
    //   show,
    //   message,
    //   type,
    // });
  };

  const removeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const removeItem = (id) => {
    //deal with removing item
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
    //show Alert
    showAlert(true, 'Grocery removed', 'danger');
  };

  const editItem = (id) => {
    //deal with edit
    const itemToEdit = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(itemToEdit.title);
    console.log(itemToEdit);
    //show Alert
    showAlert(true, 'Grocery updted successfully', 'sucess');
  };
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={submitHandler}>
        {alert.show && (
          <Alert {...alert} removeAlert={removeAlert} items={list} />
        )}
        <h3>Add Grocery items</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. Mangoes'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            Submit
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem} />
        <button
          className='clear-btn'
          onClick={() => {
            setList([]);
            showAlert(true, 'All items removed', 'danger');
          }}
        >
          Clear Items
        </button>
      </div>
    </section>
  );
};

export default App;
