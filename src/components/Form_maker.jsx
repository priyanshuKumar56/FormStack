import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTitle, setDescription } from "../Redux/Slices/formSlice";
import { addRecentForm } from "../Redux/Slices/formSlice";
import { TextField, Paper, Box } from "@mui/material";
import FormComponent from "./form_component";
import { useParams } from "react-router-dom";

const FormBuilder = () => {
  const dispatch = useDispatch();
  const { title, description, questions } = useSelector((state) => state.form);
  const { id } = useParams();

  const debouncedSave = useCallback(
    debounce((formData) => {
      const currentDate = new Date();
      dispatch(
        addRecentForm({
          id: formData.id,
          title: formData.title || "Untitled Form",
          imgSrc: "src/assets/forms_2020q4_48dp.png", // Using your form icon
          lastOpened: currentDate.toLocaleTimeString(),
          createdAt: currentDate.toISOString(),
          description: formData.description,
          questions: formData.questions,
        })
      );
    }, 1000),
    [dispatch]
  );

  // Save form when title, description, or questions change
  useEffect(() => {
    debouncedSave({
      id,
      title,
      description,
      questions,
    });
  }, [title, description, questions, id, debouncedSave]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Paper className="transform transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600" />
          <div className="p-8">
            <Box className="space-y-4">
              <div className="relative group">
                <TextField
                  variant="standard"
                  fullWidth
                  value={title}
                  onChange={(e) => dispatch(setTitle(e.target.value))}
                  placeholder="Untitled form"
                  className="transition-all duration-300"
                  InputProps={{
                    classes: {
                      root: "before:border-transparent hover:before:border-gray-300 focus:before:border-purple-600",
                    },
                    style: {
                      fontSize: "1.875rem",
                      fontWeight: "600",
                      color: "#1a1a1a",
                    },
                  }}
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full" />
              </div>

              <div className="relative group mt-6">
                <TextField
                  variant="standard"
                  fullWidth
                  value={description}
                  onChange={(e) => dispatch(setDescription(e.target.value))}
                  placeholder="Form description"
                  className="transition-all duration-300"
                  InputProps={{
                    classes: {
                      root: "before:border-transparent hover:before:border-gray-300 focus:before:border-purple-600",
                    },
                    style: {
                      fontSize: "1rem",
                      color: "#4b5563",
                    },
                  }}
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full" />
              </div>
            </Box>
          </div>
        </Paper>

        <FormComponent />
      </div>
    </div>
  );
};

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default FormBuilder;
