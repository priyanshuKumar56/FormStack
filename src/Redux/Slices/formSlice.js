import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Question Types Constants
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "multiple_choice",
  CHECKBOXES: "checkboxes",
  SHORT_ANSWER: "short_answer",
  PARAGRAPH: "paragraph",
  RATING: "rating",
  GRID: "grid",
  FILE_UPLOAD: "file_upload",
  EMAIL: "email",
  PHONE: "phone",
  NUMBER: "number",
};
console.log(QUESTION_TYPES.SHORT_ANSWER);
export const FORM_TEMPLATES = {
  CONTACT: {
    title: "Contact Form",
    description: "Get in touch with us",
    defaultQuestions: [
      {
        id: "name",
        text: "Full Name",
        type: QUESTION_TYPES.SHORT_ANSWER,
        required: true,
        validation: { required: true },
      },
      {
        id: "email",
        text: "Email Address",
        type: QUESTION_TYPES.EMAIL,
        required: true,
        validation: { required: true },
      },
      {
        id: "phone",
        text: "Phone Number",
        type: QUESTION_TYPES.PHONE,
        required: false,
      },
      {
        id: "message",
        text: "Your Message",
        type: QUESTION_TYPES.PARAGRAPH,
        required: true,
        validation: { required: true, minLength: 10 },
      },
    ],
  },
  FEEDBACK: {
    title: "Customer Feedback",
    description: "Help us improve our services",
    defaultQuestions: [
      {
        id: "overall_satisfaction",
        text: "Overall Satisfaction",
        type: QUESTION_TYPES.RATING,
        settings: { ratingScale: 5 },
        required: true,
      },
      {
        id: "experience_details",
        text: "Please describe your experience",
        type: QUESTION_TYPES.PARAGRAPH,
        required: false,
      },
      {
        id: "recommend_likelihood",
        text: "How likely are you to recommend us?",
        type: QUESTION_TYPES.RATING,
        settings: { ratingScale: 10 },
        required: true,
      },
      {
        id: "improvements",
        text: "What can we improve?",
        type: QUESTION_TYPES.PARAGRAPH,
        required: false,
      },
    ],
  },
};

// Default Question Generator
const createDefaultQuestion = (baseQuestion = {}) => ({
  id: uuidv4(),
  text: baseQuestion.text || "Untitled Question",
  type: baseQuestion.type || QUESTION_TYPES.MULTIPLE_CHOICE,
  description: baseQuestion.description || "",
  required: baseQuestion.required || false,
  options: baseQuestion.options || [
    {
      id: uuidv4(),
      text: "Option 1",
    },
  ],
  validation: {
    required: baseQuestion.validation?.required || false,
    minLength: baseQuestion.validation?.minLength || 0,
    maxLength: baseQuestion.validation?.maxLength || 500,
  },
  settings: {
    shuffle: false,
    ...baseQuestion.settings,
  },
});

// Initial State
const initialState = {
  title: "Untitled Form",
  description: "",
  questions: [createDefaultQuestion()],
  activeQuestionId: null,

  recentForms: JSON.parse(localStorage.getItem("recentForms")) || [],
};

// Form Slice
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },

    loadTemplate: (state, action) => {
      const templateType = action.payload;
      const template = FORM_TEMPLATES[templateType];

      if (template) {
        state.title = template.title;
        state.description = template.description;
        state.questions = template.defaultQuestions.map((q) => ({
          ...createDefaultQuestion({
            text: q.text,
            type: q.type,
            required: q.required,
            validation: q.validation,
            settings: q.settings,
          }),
          id: uuidv4(), // Ensure unique ID
        }));
        state.templateType = templateType;
        state.activeQuestionId = state.questions[0]?.id || null;
      }
    },

    // Add New Question
    addQuestion: (state, action) => {
      const newQuestion = createDefaultQuestion({
        type: action.payload || QUESTION_TYPES.MULTIPLE_CHOICE,
      });

      state.questions.push(newQuestion);
      state.activeQuestionId = newQuestion.id;
    },

    // Update Question
    updateQuestion: (state, action) => {
      const { id, updates } = action.payload;
      const questionIndex = state.questions.findIndex((q) => q.id === id);

      if (questionIndex !== -1) {
        state.questions[questionIndex] = {
          ...state.questions[questionIndex],
          ...updates,
        };
      }
    },

    // Delete Question
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter((q) => q.id !== action.payload);

      // Reset active question if needed
      if (state.activeQuestionId === action.payload) {
        state.activeQuestionId = state.questions[0]?.id || null;
      }
    },

    // Duplicate Question
    duplicateQuestion: (state, action) => {
      const originalQuestion = state.questions.find(
        (q) => q.id === action.payload
      );

      if (originalQuestion) {
        const duplicatedQuestion = createDefaultQuestion({
          ...originalQuestion,
          id: uuidv4(),
        });

        state.questions.push(duplicatedQuestion);
        state.activeQuestionId = duplicatedQuestion.id;
      }
    },

    // Set Active Question
    setActiveQuestion: (state, action) => {
      state.activeQuestionId = action.payload;
    },

    // Reorder Questions
    reorderQuestions: (state, action) => {
      const { draggedId, targetId } = action.payload;
      const draggedIndex = state.questions.findIndex((q) => q.id === draggedId);
      const targetIndex = state.questions.findIndex((q) => q.id === targetId);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [removed] = state.questions.splice(draggedIndex, 1);
        state.questions.splice(targetIndex, 0, removed);
      }
    },

    // Add Option to Question
    addQuestionOption: (state, action) => {
      const { questionId } = action.payload;
      const questionIndex = state.questions.findIndex(
        (q) => q.id === questionId
      );

      if (questionIndex !== -1) {
        state.questions[questionIndex].options.push({
          id: uuidv4(),
          text: `Option ${state.questions[questionIndex].options.length + 1}`,
        });
      }
    },

    // Update Option
    updateQuestionOption: (state, action) => {
      const { questionId, optionId, updates } = action.payload;
      const questionIndex = state.questions.findIndex(
        (q) => q.id === questionId
      );

      if (questionIndex !== -1) {
        const optionIndex = state.questions[questionIndex].options.findIndex(
          (opt) => opt.id === optionId
        );

        if (optionIndex !== -1) {
          state.questions[questionIndex].options[optionIndex] = {
            ...state.questions[questionIndex].options[optionIndex],
            ...updates,
          };
        }
      }
    },
    addRecentForm: (state, action) => {
      const newForm = {
        id: action.payload.id || uuidv4(),
        title: action.payload.title,
        imgSrc: action.payload.imgSrc || "default-form-image.png",
        lastOpened: new Date().toLocaleTimeString(),
        createdAt: new Date().toISOString(),
        description: action.payload.description,
        questions: action.payload.questions,
      };

      // Remove duplicate forms
      state.recentForms = state.recentForms.filter(
        (form) => form.id !== newForm.id
      );

      // Add new form to the beginning
      state.recentForms.unshift(newForm);

      // Limit to last 10 forms
      state.recentForms = state.recentForms.slice(0, 10);

      // Save to local storage
      localStorage.setItem("recentForms", JSON.stringify(state.recentForms));
    },

    removeRecentForm: (state, action) => {
      state.recentForms = state.recentForms.filter(
        (form) => form.id !== action.payload
      );
      localStorage.setItem("recentForms", JSON.stringify(state.recentForms));
    },

    clearRecentForms: (state) => {
      state.recentForms = [];
      localStorage.removeItem("recentForms");
    },

    // Remove Option
    removeQuestionOption: (state, action) => {
      const { questionId, optionId } = action.payload;
      const questionIndex = state.questions.findIndex(
        (q) => q.id === questionId
      );

      if (questionIndex !== -1) {
        state.questions[questionIndex].options = state.questions[
          questionIndex
        ].options.filter((opt) => opt.id !== optionId);
      }
    },

    // Reset Form
    resetForm: () => initialState,
  },
});

export const {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  duplicateQuestion,
  setActiveQuestion,
  reorderQuestions,
  setTitle,
  addRecentForm,
  removeRecentForm,
  clearRecentForms,
  setDescription,
  loadTemplate,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
