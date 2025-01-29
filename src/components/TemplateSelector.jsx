import React from "react";
import { useDispatch } from "react-redux";
import { Button, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { loadTemplate, resetForm } from "../Redux/Slices/formSlice";

const TemplateSelector = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = uuid();
  const createBlankForm = () => {
    dispatch(resetForm());
    navigate("/formTemp/new/" + id);
  };

  const templates = [
    {
      id: 1,
      title: "Blank Form",
      imgSrc: "src/assets/imges/forms-blank-googlecolors.png",
      description: "Create a custom form from scratch",
      onClick_func: createBlankForm,
      templateType: "new",
    },
    {
      id: 2,
      title: "Contact Information",
      imgSrc: "src/assets/imges/contectinfo.png",
      description: "Collect contact details From the User",
      onClick_func: () => {
        dispatch(loadTemplate("CONTACT"));
        navigate("/formTemp/contact/" + id);
      },
      templateType: "CONTACT",
    },
    {
      id: 3,
      title: "Event Feedback",
      imgSrc: "src/assets/imges/eventfeedback.png",
      description: "Gather event and participant insights",
      onClick_func: () => {
        dispatch(loadTemplate("FEEDBACK"));
        navigate("/formTemp/feedback/" + id);
      },
      templateType: "FEEDBACK",
    },
  ];

  const TemplateCard = ({ title, imgSrc, description, clickCreate }) => {
    return (
      <div
        className="group relative w-full max-w-[14rem] rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        onClick={clickCreate}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative">
          <img
            src={imgSrc}
            alt={title}
            className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 border-4 border-transparent group-hover:border-purple-400/20 transition-all duration-300 rounded-xl" />
        </div>

        <div className="p-4 bg-white">
          <h3 className="text-base font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 space-y-4 sm:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Start a new form
            </h1>
            <p className="text-gray-600">
              Choose a template or start from scratch
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="text"
              className="transition-all duration-300 hover:bg-purple-50"
              style={{
                fontWeight: "500",
                textTransform: "none",
                fontSize: "16px",
                color: "#6366f1",
              }}
            >
              Template gallery
            </Button>
            <IconButton className="hover:bg-purple-50 transition-colors duration-300">
              <MoreVertIcon className="text-gray-600" />
            </IconButton>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="transform transition-all duration-300 hover:scale-[1.02]"
            >
              <TemplateCard
                title={template.title}
                description={template.description}
                imgSrc={template.imgSrc}
                clickCreate={template.onClick_func}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
