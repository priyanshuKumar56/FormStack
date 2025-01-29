import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, ViewIcon, SortAscIcon, FolderOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  addRecentForm,
  removeRecentForm,
  clearRecentForms,
} from "../Redux/Slices/formSlice";

const RecentForms = () => {
  const dispatch = useDispatch();

  // Modified selector to correctly access the forms data
  const recentForms = useSelector((state) => {
    console.log("Accessing recentForms state:", state);

    // Check if state exists and has the form property
    if (!state || !state.form) {
      console.error("Redux state or form slice is undefined");
      return [];
    }

    // Access recentForms array from the form slice
    const forms = state.form.recentForms;
    if (!Array.isArray(forms)) {
      console.error("recentForms is not an array:", forms);
      return [];
    }

    return forms;
  });

  // Debug: Log the retrieved forms
  useEffect(() => {
    console.log("Retrieved forms:", recentForms);
  }, [recentForms]);

  const [sortOrder, setSortOrder] = useState("recent");

  // Early return with debugging info
  if (recentForms.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">
          No recent forms available. Create a new form to get started.
        </p>
        <p className="text-sm text-gray-400">
          Debug info: {recentForms.length} forms found in store
        </p>
      </div>
    );
  }

  const handleRemoveForm = (formId) => {
    console.log("Removing form with ID:", formId);
    dispatch(removeRecentForm(formId));
  };

  const handleClearForms = () => {
    console.log("Clearing all forms");
    dispatch(clearRecentForms());
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "recent" ? "alphabetical" : "recent");
  };

  const sortedForms = [...recentForms].sort((a, b) => {
    if (sortOrder === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.title.localeCompare(b.title);
  });

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      {/* Debug info */}
      <div className="max-w-7xl mx-auto mb-4 p-4 bg-gray-100 rounded-lg text-sm">
        <p>Debug Info:</p>
        <p>Forms count: {recentForms.length}</p>
        <p>Sort order: {sortOrder}</p>
      </div>
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Recent forms</h2>
            <p className="text-sm text-gray-500">
              Your recently accessed forms
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Create New Form
            </Button>

            <div className="flex items-center space-x-1 bg-white rounded-full p-1">
              <Button variant="ghost" size="icon" onClick={() => {}}>
                <ViewIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSort}>
                <SortAscIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => {}}>
                <FolderOpen className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedForms.map((form) => (
            <div
              key={form.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={form.imgSrc}
                  alt={form.title}
                  className="h-40 w-full object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-purple-600">
                  {form.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {form.description && (
                    <span className="block mb-1">{form.description}</span>
                  )}
                  Created: {formatDate(form.createdAt)}
                  {form.lastOpened && (
                    <span className="block">
                      Last opened: {form.lastOpened}
                    </span>
                  )}
                  {form.questions && (
                    <span className="block">
                      Questions: {form.questions.length}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <img src={form.imgSrc} alt="Form Icon" className="h-5 w-5" />
                  <span className="text-xs font-medium text-gray-600">
                    Form
                  </span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleRemoveForm(form.id)}>
                      Remove from recent
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleClearForms}>
                      Clear all recent forms
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentForms;
