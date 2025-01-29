import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FormPublish from "./Publish_form";

const FormHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("questions");
  const { id, templateTy } = useParams();

  // Add scroll listener effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className=" top-0 left-0 right-0 z-50">
      <div
        className={`
        w-full bg-white transition-all duration-200
        ${isScrolled ? "shadow-md" : "shadow-sm"}
        border-b border-gray-200
      `}
      >
        {/* Main Navbar */}
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png"
                alt="Form Logo"
                className="h-8 w-8 transition-transform duration-200 hover:scale-110"
              />
              <div className="flex flex-col">
                <input
                  type="text"
                  defaultValue="Registration Form"
                  className="text-lg font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-purple-500 focus:outline-none transition-colors duration-200"
                />
                <div className="flex items-center space-x-2">
                  <button className="text-xs text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center space-x-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    <span>Move</span>
                  </button>
                  <button className="text-xs text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center space-x-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <span>Star</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </button>
            <Link to={`/FormPreview/${id}`}>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </Link>
            <div className="flex items-center space-x-2 border-l border-r px-3 mx-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 disabled:opacity-50">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 disabled:opacity-50">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
            <FormPublish />
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center overflow-hidden"
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                  >
                    Help & feedback
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex justify-center border-t border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("questions")}
              className={`py-3 px-4 relative transition-colors duration-200 ${
                activeTab === "questions"
                  ? "text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Questions
              {activeTab === "questions" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
            <Link to={`/FormResult/${templateTy}/${id}`}>
              <button
                onClick={() => setActiveTab("responses")}
                className={`py-3 px-4 relative transition-colors duration-200 ${
                  activeTab === "responses"
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Responses
                {activeTab === "responses" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
