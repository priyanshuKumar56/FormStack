import React from "react";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

const FormResults = () => {
  // Get all responses from localStorage
  const getStoredResponses = () => {
    try {
      // Get all responses from localStorage
      const allResponses = Object.keys(localStorage)
        .filter((key) => key.startsWith("form_responses_"))
        .map((key) => {
          try {
            return JSON.parse(localStorage.getItem(key));
          } catch (e) {
            return null;
          }
        })
        .filter((item) => item !== null);

      // Flatten if needed and ensure it's an array
      const responses = allResponses.flat();
      return responses;
    } catch (error) {
      console.error("Error getting responses:", error);
      return [];
    }
  };

  const responses = getStoredResponses();

  // Group all unique questions from responses
  const getUniqueQuestions = () => {
    const questions = new Set();
    const questionDetails = [];

    responses.forEach((response) => {
      response.answers?.forEach((answer) => {
        if (!questions.has(answer.questionId)) {
          questions.add(answer.questionId);
          questionDetails.push({
            id: answer.questionId,
            text: answer.questionText,
            type: answer.questionType,
          });
        }
      });
    });

    return questionDetails;
  };

  const uniqueQuestions = getUniqueQuestions();

  // Get all answers for a specific question
  const getAnswersForQuestion = (questionId) => {
    return responses
      .flatMap(
        (response) =>
          response.answers?.filter(
            (answer) => answer.questionId === questionId
          ) || []
      )
      .map((answer) => answer.answer);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen p-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Form Results</h1>
          <div className="flex items-center mt-4 text-white/90">
            <Users className="w-5 h-5 mr-2" />
            <span>{responses.length} total responses</span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {uniqueQuestions.map((question, index) => {
            const answers = getAnswersForQuestion(question.id);

            return (
              <Card
                key={question.id}
                className="p-6 space-y-4 border-l-4 border-purple-500 shadow-sm"
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {question.text}
                    </h3>
                  </div>
                </div>
                <div className="pl-11">
                  <div className="space-y-3">
                    {answers.map((answer, answerIndex) => (
                      <div
                        key={answerIndex}
                        className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
                      >
                        {answer}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormResults;
