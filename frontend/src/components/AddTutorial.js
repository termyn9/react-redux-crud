import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../actions/tutorials";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    Latitude: "", 
    Longitude: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const { title, description, Latitude, Longitude } = tutorial;

    dispatch(createTutorial(title, description, Latitude, Longitude))
      .then(data => {
        setTutorial({
          id: data.id,
          title: data.title,
          description: data.description,
          Latitude: data.Latitude, 
          Longitude: data.Longitude,
          published: data.published
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Latitude">Latitude</label>
            <input
              type="text"
              className="form-control"
              id="Latitude"
              required
              value={tutorial.Latitude}
              onChange={handleInputChange}
              name="Latitude"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Longitude">Longitude</label>
            <input
              type="text"
              className="form-control"
              id="Longitude"
              required
              value={tutorial.Longitude}
              onChange={handleInputChange}
              name="Longitude"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
