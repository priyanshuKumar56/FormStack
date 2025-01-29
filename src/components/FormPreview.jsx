import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Star,
  Upload,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";
import { QUESTION_TYPES } from "../Data/constents";
import { useParams } from "react-router-dom";
// import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FormPreview = () => {
  const { questions, title, description } = useSelector((state) => state.form);
  const [formResponses, setFormResponses] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Validate required fields
    const requiredQuestions = questions.filter((q) => q.required);
    const missingResponses = requiredQuestions.filter(
      (q) => !formResponses[q.id]
    );

    if (missingResponses.length > 0) {
      setSubmitError("Please answer all required questions");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create a structured response object
      const structuredResponse = {
        id: Date.now(), // Add a unique identifier for each submission
        timestamp: new Date().toISOString(),
        answers: questions.map((question) => ({
          questionId: question.id,
          questionType: question.type,
          questionText: question.text,
          answer: formResponses[question.id] || null,
        })),
      };

      // Store responses in localStorage with better structure
      const formId = id || "default";
      const storedResponses =
        JSON.parse(localStorage.getItem(`form_responses_${formId}`)) || [];
      storedResponses.push(structuredResponse);
      localStorage.setItem(
        `form_responses_${formId}`,
        JSON.stringify(storedResponses)
      );

      // Simulate API call delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowConfirmation(true);
    } catch (error) {
      setSubmitError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleResponseChange = (questionId, value) => {
    setFormResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const renderQuestionContent = (question) => {
    const commonProps = {
      onChange: (e) => handleResponseChange(question.id, e.target.value),
      value: formResponses[question.id] || "",
    };

    switch (question.type) {
      case QUESTION_TYPES.MULTIPLE_CHOICE.id:
        return (
          <RadioGroup
            onValueChange={(value) => handleResponseChange(question.id, value)}
            className="space-y-3 animate-fade-in"
          >
            {question.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="border-purple-500 focus:ring-purple-300"
                />
                <Label
                  htmlFor={option.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <span>{option.text}</span>
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.text}
                      className="w-10 h-10 rounded-md object-cover shadow-sm"
                    />
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case QUESTION_TYPES.RATING.id:
        return (
          <div className="flex items-center space-x-2 py-2">
            {Array.from({ length: question.settings?.ratingScale || 5 }).map(
              (_, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  onClick={() => handleResponseChange(question.id, i + 1)}
                  className={`
                    h-12 w-12 rounded-full 
                    ${
                      formResponses[question.id] &&
                      formResponses[question.id] > i
                        ? "text-yellow-500 bg-yellow-50"
                        : "text-gray-300 hover:text-yellow-400"
                    }
                  `}
                >
                  <Star className="w-6 h-6" />
                </Button>
              )
            )}
          </div>
        );

      case QUESTION_TYPES.PARAGRAPH.id:
        return (
          <Textarea
            {...commonProps}
            placeholder="Share your detailed thoughts..."
            className="bg-white border-purple-100 focus:border-purple-300 min-h-[120px]"
          />
        );

      case QUESTION_TYPES.SHORT_ANSWER.id:
      case QUESTION_TYPES.EMAIL.id:
      case QUESTION_TYPES.PHONE.id:
      case QUESTION_TYPES.NUMBER.id:
        return (
          <div className="relative">
            <Input
              {...commonProps}
              type={
                question.type === QUESTION_TYPES.NUMBER.id ? "number" : "text"
              }
              placeholder={`Enter your ${question.text.toLowerCase()}`}
              className="bg-white border-purple-100 focus:border-purple-300 pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {question.type === QUESTION_TYPES.EMAIL.id && (
                <Info className="w-5 h-5" />
              )}
              {question.type === QUESTION_TYPES.PHONE.id && (
                <CheckCircle className="w-5 h-5" />
              )}
              {question.type === QUESTION_TYPES.NUMBER.id && (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen p-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="text-sm text-white/80 mt-2">{description}</p>
          )}
        </div>

        <div className="p-8 space-y-8">
          {questions.map((question, index) => (
            <Card
              key={question.id}
              className="p-6 space-y-4 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {question.text}
                    {question.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </h3>
                  {question.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {question.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="pl-11">{renderQuestionContent(question)}</div>
            </Card>
          ))}
        </div>

        <div className="p-8 bg-gray-100 border-t">
          {submitError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Form"
            )}
          </Button>
        </div>
      </div>
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Submitted Successfully!</DialogTitle>
            <DialogDescription>
              Thank you for your response. Your submission has been recorded.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              setShowConfirmation(false);
              setFormResponses({});
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormPreview;
