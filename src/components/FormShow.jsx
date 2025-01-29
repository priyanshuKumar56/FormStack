import React from "react";
import { Button } from "@mui/material";

const TemplateSelector = () => {
  // Template data for the cards
  const templates = [
    {
      id: 1,
      title: "Blank Form",
      imgSrc: "https://via.placeholder.com/400",
      description: "Blank form",
    },
    {
      id: 2,
      title: "Event Feedback",
      imgSrc: "https://via.placeholder.com/400",
      description: "Event Feedback",
    },
    {
      id: 3,
      title: "Time Off Request",
      imgSrc: "https://via.placeholder.com/400",
      description: "Time Off Request",
    },
    {
      id: 4,
      title: "Order Form",
      imgSrc: "https://via.placeholder.com/400",
      description: "Order Form",
    },
    {
      id: 5,
      title: "Job Application",
      imgSrc: "https://via.placeholder.com/400",
      description: "Job Application",
    },
  ];

  // Template Card Component (kept within App)
  const TemplateCard = ({ title, description, imgSrc }) => {
    return (
      <div className="w-full max-w-sm border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
        <img src={imgSrc} alt={title} className="h-40 w-full object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Start a new form</h1>
        <Button
          variant="text"
          style={{
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          Template gallery
        </Button>
      </div>

      {/* Main Grid for Template Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            description={template.description}
            imgSrc={template.imgSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
