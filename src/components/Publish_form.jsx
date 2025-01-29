import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Link as LinkIcon, Settings, Send } from "lucide-react";
import { useParams } from "react-router-dom";

const FormPublish = () => {
  const { templateTy, id } = useParams();

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [publishSettings, setPublishSettings] = useState({
    collectEmail: false,
    limitOneResponse: true,
    showProgressBar: true,
    shuffleQuestions: false,
    confirmationMessage: "Thanks for submitting the form!",
    formLink: `https://localhost.com/${templateTy}/${id}`,
  });

  const handlePublish = () => {
    // Here you would typically make an API call to save publish settings
    setIsSubmitted(true);
    setTimeout(() => {
      setIsPublishModalOpen(false);
      setIsSubmitted(false);
    }, 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(publishSettings.formLink);
  };

  return (
    <>
      <Button
        onClick={() => setIsPublishModalOpen(true)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
      >
        <Send className="w-4 h-4" />
        <span>Send</span>
      </Button>

      <Dialog open={isPublishModalOpen} onOpenChange={setIsPublishModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Publish Form</DialogTitle>
            <DialogDescription>
              Configure your form settings before publishing
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Form published successfully! You can now share the link.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Form Link</CardTitle>
                  <CardDescription>
                    Share this link with respondents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input
                      value={publishSettings.formLink}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Button variant="outline" onClick={copyLink}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="collect-email">Collect email addresses</Label>
                  <Switch
                    id="collect-email"
                    checked={publishSettings.collectEmail}
                    onCheckedChange={(checked) =>
                      setPublishSettings((prev) => ({
                        ...prev,
                        collectEmail: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="limit-response">Limit to 1 response</Label>
                  <Switch
                    id="limit-response"
                    checked={publishSettings.limitOneResponse}
                    onCheckedChange={(checked) =>
                      setPublishSettings((prev) => ({
                        ...prev,
                        limitOneResponse: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="progress-bar">Show progress bar</Label>
                  <Switch
                    id="progress-bar"
                    checked={publishSettings.showProgressBar}
                    onCheckedChange={(checked) =>
                      setPublishSettings((prev) => ({
                        ...prev,
                        showProgressBar: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="shuffle">Shuffle questions</Label>
                  <Switch
                    id="shuffle"
                    checked={publishSettings.shuffleQuestions}
                    onCheckedChange={(checked) =>
                      setPublishSettings((prev) => ({
                        ...prev,
                        shuffleQuestions: checked,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmation">Confirmation Message</Label>
                  <Input
                    id="confirmation"
                    value={publishSettings.confirmationMessage}
                    onChange={(e) =>
                      setPublishSettings((prev) => ({
                        ...prev,
                        confirmationMessage: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <DialogFooter className="sm:justify-start">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsPublishModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handlePublish}
                >
                  Publish Form
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormPublish;
