import React, { useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  duplicateQuestion,
  setActiveQuestion,
  reorderQuestions,
} from "../Redux/Slices/formSlice";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image,
  Trash2,
  Copy,
  Plus,
  RadioIcon,
  CheckSquare,
  TextQuote,
  List,
  Video,
  Calendar,
  Clock,
  Star,
  Grid,
  DraftingCompassIcon,
  GripHorizontalIcon,
  Settings2,
  FileText,
  Upload,
  Link2,
  Phone,
  Mail,
  Hash,
} from "lucide-react";
import { SIDEBAR_TOOLS, QUESTION_TYPES } from "../Data/constents";

const FormComponent = () => {
  const dispatch = useDispatch();
  const { questions, activeQuestionId } = useSelector((state) => state.form);
  const [isDragging, setIsDragging] = React.useState(false);
  const [sidebarPosition, setSidebarPosition] = React.useState({ top: 0 });
  const questionsContainerRef = useRef(null);

  const renderQuestionContent = (question) => {
    switch (question.type) {
      case QUESTION_TYPES.MULTIPLE_CHOICE.id:
      case QUESTION_TYPES.CHECKBOXES.id:
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div
                key={option.id}
                className="flex items-center gap-2 group animate-fadeIn"
              >
                {question.type === QUESTION_TYPES.MULTIPLE_CHOICE.id ? (
                  <RadioIcon className="w-4 h-4 text-gray-400" />
                ) : (
                  <CheckSquare className="w-4 h-4 text-gray-400" />
                )}
                <Input
                  value={option.text}
                  onChange={(e) =>
                    handleOptionChange(question.id, option.id, e.target.value)
                  }
                  placeholder={`Option ${index + 1}`}
                  className="border-none hover:bg-gray-50 transition-colors"
                />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleImageUpload(question.id, option.id)}
                    className="h-8 w-8"
                  >
                    <Image className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveOption(question.id, option.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {option.image && (
                  <img
                    src={option.image || "/placeholder.svg"}
                    alt=""
                    className="w-8 h-8 rounded-lg object-cover shadow-sm"
                  />
                )}
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAddOption(question.id)}
              className="text-purple-600 hover:text-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add option
            </Button>
          </div>
        );
      case QUESTION_TYPES.DATE.id:
        return (
          <div className="space-y-2">
            <Input
              type="date"
              disabled
              className="bg-gray-50 cursor-not-allowed w-48"
            />
            {question.settings?.includeTime && (
              <Input
                type="time"
                disabled
                className="bg-gray-50 cursor-not-allowed w-48 mt-2"
              />
            )}
          </div>
        );

      case QUESTION_TYPES.TIME.id:
        return (
          <div className="space-y-2">
            <Input
              type="time"
              disabled
              className="bg-gray-50 cursor-not-allowed w-48"
            />
            <div className="flex items-center gap-2 mt-2">
              <Switch
                checked={question.settings?.is24Hour}
                onCheckedChange={(checked) =>
                  dispatch(
                    updateQuestion({
                      id: question.id,
                      updates: {
                        settings: {
                          ...question.settings,
                          is24Hour: checked,
                        },
                      },
                    })
                  )
                }
              />
              <span className="text-sm text-gray-500">24-hour format</span>
            </div>
          </div>
        );

      case QUESTION_TYPES.LINEAR_SCALE.id:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={question.settings?.minValue ?? 1}
                onChange={(e) =>
                  dispatch(
                    updateQuestion({
                      id: question.id,
                      updates: {
                        settings: {
                          ...question.settings,
                          minValue: parseInt(e.target.value),
                        },
                      },
                    })
                  )
                }
                className="w-24"
                min="0"
                max="10"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                value={question.settings?.maxValue ?? 5}
                onChange={(e) =>
                  dispatch(
                    updateQuestion({
                      id: question.id,
                      updates: {
                        settings: {
                          ...question.settings,
                          maxValue: parseInt(e.target.value),
                        },
                      },
                    })
                  )
                }
                className="w-24"
                min="1"
                max="10"
              />
            </div>
            <div className="flex items-center gap-2">
              {Array.from(
                {
                  length:
                    (question.settings?.maxValue ?? 5) -
                    (question.settings?.minValue ?? 1) +
                    1,
                },
                (_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="h-10 w-10"
                    disabled
                  >
                    {(question.settings?.minValue ?? 1) + i}
                  </Button>
                )
              )}
            </div>
          </div>
        );

      case QUESTION_TYPES.RATING.id:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: question.settings?.ratingScale ?? 5 }).map(
                (_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="h-10 w-10 flex items-center justify-center"
                    disabled
                  >
                    <Star
                      className={`w-4 h-4 ${i < 3 ? "fill-current" : ""}`}
                    />
                  </Button>
                )
              )}
            </div>
          </div>
        );

      case QUESTION_TYPES.GRID.id:
        return (
          <div className="space-y-4">
            {(question.settings?.rows || []).map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-4">
                <span className="w-24 text-sm">{row}</span>
                <div className="flex gap-4">
                  {(question.settings?.columns || []).map((col, colIndex) => (
                    <RadioIcon
                      key={colIndex}
                      className="w-4 h-4 text-gray-400"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case QUESTION_TYPES.FILE_UPLOAD.id:
        return (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Click to upload or drag and drop
            </p>
          </div>
        );

      case QUESTION_TYPES.PARAGRAPH.id:
        return (
          <Textarea
            placeholder="Long answer text"
            disabled
            className="bg-gray-50 cursor-not-allowed"
          />
        );

      case QUESTION_TYPES.SHORT_ANSWER.id:
      case QUESTION_TYPES.EMAIL.id:
      case QUESTION_TYPES.PHONE.id:
      case QUESTION_TYPES.WEBSITE.id:
      case QUESTION_TYPES.NUMBER.id:
        return (
          <Input
            placeholder={`Enter ${QUESTION_TYPES[
              question.type.toUpperCase()
            ].label.toLowerCase()}`}
            disabled
            className="bg-gray-50 cursor-not-allowed"
            type={
              question.type === QUESTION_TYPES.NUMBER.id ? "number" : "text"
            }
          />
        );

      default:
        return null;
    }
  };

  const updateSidebarPosition = useCallback((questionElement) => {
    if (questionElement && questionsContainerRef.current) {
      const containerRect =
        questionsContainerRef.current.getBoundingClientRect();
      const questionRect = questionElement.getBoundingClientRect();
      const newTop = questionRect.top - containerRect.top;
      const maxTop = containerRect.height - 300;
      const adjustedTop = Math.min(newTop, maxTop);
      const finalTop = Math.max(0, adjustedTop);
      setSidebarPosition({ top: finalTop });
    }
  }, []);

  const handleOptionChange = (questionId, optionId, value) => {
    dispatch(
      updateQuestion({
        id: questionId,
        updates: {
          options: questions
            .find((q) => q.id === questionId)
            .options.map((opt) =>
              opt.id === optionId ? { ...opt, text: value } : opt
            ),
        },
      })
    );
  };

  const handleAddOption = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    dispatch(
      updateQuestion({
        id: questionId,
        updates: {
          options: [
            ...question.options,
            {
              id: Date.now().toString(),
              text: `Option ${question.options.length + 1}`,
              image: null,
            },
          ],
        },
      })
    );
  };

  const handleRemoveOption = (questionId, optionId) => {
    const question = questions.find((q) => q.id === questionId);
    dispatch(
      updateQuestion({
        id: questionId,
        updates: {
          options: question.options.filter((opt) => opt.id !== optionId),
        },
      })
    );
  };

  const handleImageUpload = async (questionId, optionId) => {
    const input = document.createElement("input");
    input.type = "file";

    input.accept = "image/*";

    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(
            updateQuestion({
              id: questionId,
              updates: {
                options: questions
                  .find((q) => q.id === questionId)
                  .options.map((opt) =>
                    opt.id === optionId ? { ...opt, image: reader.result } : opt
                  ),
              },
            })
          );
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  const handleQuestionClick = (questionId, event) => {
    dispatch(setActiveQuestion(questionId));
    updateSidebarPosition(event.currentTarget);
    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handleDragStart = (e, questionId) => {
    e.dataTransfer.setData("questionId", questionId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = useCallback(
    (e, targetId) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("questionId");
      if (draggedId === targetId) return;
      dispatch(reorderQuestions({ draggedId, targetId }));
    },
    [dispatch]
  );

  const handleScroll = useCallback(() => {
    if (activeQuestionId) {
      const activeElement = document.getElementById(activeQuestionId);
      if (activeElement) {
        updateSidebarPosition(activeElement);
      }
    }
  }, [activeQuestionId, updateSidebarPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const renderQuestionInput = (question) => {
    const type = QUESTION_TYPES[question.type.toUpperCase()];
    if (!type) return null;

    const Icon = type.icon;
    return (
      <div className="relative group">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
          <GripHorizontalIcon className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-gray-400" />
          <Input
            value={question.text}
            onChange={(e) =>
              dispatch(
                updateQuestion({
                  id: question.id,
                  updates: { text: e.target.value },
                })
              )
            }
            placeholder="Question"
            className="text-lg font-medium border-none focus:ring-0 hover:bg-gray-50 transition-all"
          />
        </div>
      </div>
    );
  };

  const renderQuestionType = (question) => {
    const TypeIcon = QUESTION_TYPES[question.type.toUpperCase()]?.icon;

    return (
      <Select
        value={question.type}
        onValueChange={(value) =>
          dispatch(
            updateQuestion({ id: question.id, updates: { type: value } })
          )
        }
      >
        <SelectTrigger className="w-48 bg-white border-gray-200">
          <SelectValue>
            <div className="flex items-center gap-2">
              {TypeIcon && <TypeIcon className="w-4 h-4" />}
              {QUESTION_TYPES[question.type.toUpperCase()]?.label}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.values(QUESTION_TYPES).map((type) => (
            <SelectItem key={type.id} value={type.id}>
              <div className="flex items-center gap-2">
                <type.icon className="w-4 h-4" />
                {type.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      {/* Sidebar */}
      <div
        className="absolute left-[-4rem] transition-all duration-300 ease-in-out"
        style={{
          transform: `translateY(${sidebarPosition.top}px)`,
        }}
      >
        <Card className="static left-0 w-14 shadow-lg border-gray-200 flex flex-col items-center p-1 space-y-4">
          {Object.values(SIDEBAR_TOOLS).map((tool) => (
            <Button
              key={tool.label}
              variant="ghost"
              size="icon"
              onClick={() => {
                if (tool.label === "Add question") {
                  dispatch(addQuestion(QUESTION_TYPES.MULTIPLE_CHOICE.id));
                }
                // Add other tool handlers here
              }}
              className="w-10 h-[2.2rem] rounded-full hover:bg-purple-50 group relative"
              title={tool.label}
            >
              <tool.icon className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
            </Button>
          ))}
        </Card>
      </div>

      {/* Questions List */}
      <div className="space-y-4" ref={questionsContainerRef}>
        {questions.map((question) => (
          <Card
            key={question.id}
            id={question.id}
            className={`
              p-6 transition-all duration-200
              ${isDragging ? "cursor-grabbing" : "cursor-grab"}
              ${
                activeQuestionId === question.id
                  ? "ring-2 ring-purple-500 shadow-lg"
                  : "hover:shadow-md"
              }
              ${question.required ? "border-l-4 border-l-purple-500" : ""}
            `}
            draggable
            onDragStart={(e) => handleDragStart(e, question.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, question.id)}
            onClick={(e) => handleQuestionClick(question.id, e)}
          >
            <div className="space-y-6">
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  {renderQuestionInput(question)}
                  <Input
                    value={question.description}
                    onChange={(e) =>
                      dispatch(
                        updateQuestion({
                          id: question.id,
                          updates: { description: e.target.value },
                        })
                      )
                    }
                    placeholder="Description (optional)"
                    className="text-sm text-gray-500 border-none focus:ring-0 hover:bg-gray-50 transition-all"
                  />
                </div>
                {renderQuestionType(question)}
              </div>

              {/* Question Content */}
              <div className="pl-8">{renderQuestionContent(question)}</div>

              {/* Question Footer */}
              <div className="flex items-center justify-between pt-4 border-t mt-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(duplicateQuestion(question.id))}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(deleteQuestion(question.id))}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      /* Add question settings logic here */
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Settings2 className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Required</span>
                    <Switch
                      checked={question.required}
                      onCheckedChange={(checked) =>
                        dispatch(
                          updateQuestion({
                            id: question.id,
                            updates: { required: checked },
                          })
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Question Button */}
      <Button
        onClick={() => dispatch(addQuestion(QUESTION_TYPES.MULTIPLE_CHOICE.id))}
        className="w-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors group"
        variant="ghost"
        size="lg"
      >
        <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        Add Question
      </Button>
    </div>
  );
};

export default FormComponent;
