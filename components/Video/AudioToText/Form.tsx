"use client";

import { useState, useRef } from "react";
import { Upload, Mic, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { transcribeAudio } from "@/actions/video/action";
import type { TranscriptionResponse } from "@/actions/video/action";

export default function AudioToText() {
  // State
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  // Refs
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingInterval = useRef<NodeJS.Timeout>();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const audioFile = new File([audioBlob], "recording.webm", {
          type: "audio/webm",
          lastModified: Date.now(),
        });
        await handleAudioFile(audioFile);
      };

      mediaRecorder.current.start(200);
      setIsRecording(true);
      setError("");
      setRecordingTime(0);

      // Start recording timer
      recordingInterval.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      setError("Microphone access denied or not available");
      console.error("Recording error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());

      // Clear recording timer
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("audio/")) {
        setError("Please upload an audio file");
        return;
      }
      setSelectedFileName(file.name);
      await handleAudioFile(file);
    }
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file?.type.startsWith("audio/")) {
      setSelectedFileName(file.name);
      await handleAudioFile(file);
    } else {
      setError("Please upload an audio file");
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleAudioFile = async (file: Blob) => {
    try {
      setIsProcessing(true);
      setError("");
      setTranscription("");

      if (file.size > 25 * 1024 * 1024) {
        throw new Error("Audio file must be less than 25MB");
      }

      // Convert Blob to File if it isn't already a File
      const audioFile =
        file instanceof File
          ? file
          : new File([file], "audio.webm", {
              type: file.type,
              lastModified: Date.now(),
            });

      const formData = new FormData();
      formData.append("audio", audioFile);

      const result = await transcribeAudio(formData);

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.text) {
        setTranscription(result.text);
      } else {
        throw new Error("No transcription received");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to transcribe audio"
      );
      console.error("Transcription error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 ${
              isDragging ? "border-primary" : "border-dashed"
            } 
                       rounded-lg p-8 text-center mb-4 transition-colors
                       ${isDragging ? "bg-primary/10" : "bg-background"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleUploadClick}
                disabled={isProcessing || isRecording}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Audio
              </Button>

              {selectedFileName && (
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedFileName}
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                or drag and drop an audio file here
              </div>

              <Button
                variant="outline"
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-full ${
                  isRecording ? "border-red-500 hover:border-red-500" : ""
                }`}
                disabled={isProcessing}
              >
                <Mic
                  className={`mr-2 h-4 w-4 ${
                    isRecording ? "text-red-500" : ""
                  }`}
                />
                {isRecording
                  ? `Stop Recording (${formatTime(recordingTime)})`
                  : "Record Audio"}
              </Button>
            </div>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Processing audio...</span>
              </div>
              <Progress value={33} className="w-full" />
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {transcription && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Transcription:</h3>
              <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                {transcription}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
