import { RequestHandler } from "express";
import { PredictResponse, ResolveResponse, AreaHealthItem, PredictRequest } from "@shared/api";

// Flask backend base URL - can be configured via environment variable
const FLASK_BASE_URL = process.env.FLASK_API_URL || "http://localhost:5000";

export const handlePredict: RequestHandler = async (req, res) => {
  try {
    const { text, location } = req.body as PredictRequest;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const response = await fetch(`${FLASK_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        location: location || "0,0",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data: PredictResponse = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error calling Flask predict endpoint:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
};

export const handleResolveIssue: RequestHandler = async (req, res) => {
  try {
    const { issueId } = req.params;

    const response = await fetch(`${FLASK_BASE_URL}/resolve/${issueId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data: ResolveResponse = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error calling Flask resolve endpoint:", error);
    res.status(500).json({ error: "Failed to resolve issue" });
  }
};

export const handleAreaHealth: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(`${FLASK_BASE_URL}/area-health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data: AreaHealthItem[] = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error calling Flask area-health endpoint:", error);
    res.status(500).json({ error: "Failed to fetch area health data" });
  }
};
