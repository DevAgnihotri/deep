import * as tf from "@tensorflow/tfjs";

let depressionModel: tf.GraphModel | null = null;
let personalityModel: tf.GraphModel | null = null;

// Classification labels for the models
const classNames = {
  depression: [
    "Normal",
    "Mild Depression",
    "Moderate Depression",
    "Severe Depression",
    "Extremely Severe Depression",
  ],
  personality: ["Non-depressed", "Depressed"],
};

export interface PredictionResult {
  class: string;
  confidence: number;
  probabilities: number[];
}

/**
 * Load the depression classification model
 */
export const loadDepressionModel = async (): Promise<void> => {
  if (!depressionModel) {
    try {
      depressionModel = await tf.loadGraphModel("/model/depression/model.json");
      console.log("Depression model loaded successfully");
    } catch (error) {
      console.error("Failed to load depression model:", error);
      throw error;
    }
  }
};

/**
 * Load the personality-based depression risk model
 */
export const loadPersonalityModel = async (): Promise<void> => {
  if (!personalityModel) {
    try {
      personalityModel = await tf.loadGraphModel("/model/personality/model.json");
      console.log("Personality model loaded successfully");
    } catch (error) {
      console.error("Failed to load personality model:", error);
      throw error;
    }
  }
};

/**
 * Make prediction using the depression model
 */
export const predictDepression = async (responses: number[]): Promise<PredictionResult> => {
  if (!depressionModel) {
    throw new Error("Depression model not loaded. Call loadDepressionModel() first.");
  }

  try {
    // Create tensor from input data
    const inputTensor = tf.tensor2d([responses], [1, responses.length]);
    
    // Make prediction
    const prediction = depressionModel.predict(inputTensor) as tf.Tensor;
    const probabilities = await prediction.data();
    
    // Get the class with highest probability
    const classIndex = tf.argMax(prediction, 1).dataSync()[0];
    const className = classNames.depression[classIndex];
    const confidence = probabilities[classIndex];

    // Clean up tensors
    inputTensor.dispose();
    prediction.dispose();

    return {
      class: className,
      confidence: confidence,
      probabilities: Array.from(probabilities)
    };
  } catch (error) {
    console.error("Depression prediction failed:", error);
    throw error;
  }
};

/**
 * Make prediction using the personality model
 */
export const predictPersonalityRisk = async (responses: number[]): Promise<PredictionResult> => {
  if (!personalityModel) {
    throw new Error("Personality model not loaded. Call loadPersonalityModel() first.");
  }

  try {
    // Create tensor from input data
    const inputTensor = tf.tensor2d([responses], [1, responses.length]);
    
    // Make prediction
    const prediction = personalityModel.predict(inputTensor) as tf.Tensor;
    const probabilities = await prediction.data();
    
    // For binary classification, apply sigmoid and threshold
    const sigmoidProbs = tf.sigmoid(prediction).dataSync();
    const classIndex = sigmoidProbs[0] > 0.5 ? 1 : 0;
    const className = classNames.personality[classIndex];
    const confidence = sigmoidProbs[0];

    // Clean up tensors
    inputTensor.dispose();
    prediction.dispose();

    return {
      class: className,
      confidence: confidence,
      probabilities: Array.from(probabilities)
    };
  } catch (error) {
    console.error("Personality prediction failed:", error);
    throw error;
  }
};

/**
 * Calculate traditional PHQ-9 score from depression quiz responses
 * PHQ-9 consists of the first 9 questions, each scored 0-3 (total 0-27)
 * The 10th question is about functional impairment and is not included in the score
 */
export const calculatePHQ9Score = (responses: number[]): { score: number; severity: string } => {
  // Only sum the first 9 responses (PHQ-9 questions)
  const phq9Responses = responses.slice(0, 9);
  const score = phq9Responses.reduce((sum, response) => sum + response, 0);
  
  let severity: string;
  if (score >= 0 && score <= 4) {
    severity = "Minimal depression";
  } else if (score >= 5 && score <= 9) {
    severity = "Mild depression";
  } else if (score >= 10 && score <= 14) {
    severity = "Moderate depression";
  } else if (score >= 15 && score <= 19) {
    severity = "Moderately severe depression";
  } else if (score >= 20 && score <= 27) {
    severity = "Severe depression";
  } else {
    // Fallback for any edge cases
    severity = "Severe depression";
  }

  return { score, severity };
};

/**
 * Initialize all models
 */
export const initializeModels = async (): Promise<void> => {
  try {
    await Promise.all([
      loadDepressionModel(),
      loadPersonalityModel()
    ]);
    console.log("All models initialized successfully");
  } catch (error) {
    console.error("Failed to initialize models:", error);
    throw error;
  }
};
