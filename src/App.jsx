import React, { useState } from "react";
import Home from "./Pages/Home";
import Drag from "./components/Drag";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form_Create from "./components/Form_Create";
import FormPreview from "./components/FormPreview";
import { addRecentForm } from "./Redux/Slices/formSlice";
import FormResults from "./components/Form_Result";

function App() {
  const [questions, setQuestions] = useState([
    {
      text: "Sample Question",
      type: "multiple choice",
      options: ["Option 1", "Option 2"],
      required: false,
    },
  ]);
  const dispatch = useDispatch();

  const handleFormSave = (formDetails) => {
    dispatch(
      addRecentForm({
        title: formDetails.title,
        imgSrc: formDetails.imgSrc || "default-form-image.png",
      })
    );
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/FormResult/:templateTy/:id"
            element={<FormResults />}
            onSave={handleFormSave}
          />
          <Route
            path="/formTemp/:templateTy/:id"
            element={<Form_Create onSave={handleFormSave} />}
          />
          <Route
            path="/FormPreview/:id"
            element={
              <FormPreview questions={questions} onSave={handleFormSave} />
            }
          />
          <Route
            path="/FormPreview/:templatetype/:id"
            element={
              <FormPreview questions={questions} onSave={handleFormSave} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
