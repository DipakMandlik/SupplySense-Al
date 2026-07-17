import type { ChatMessage } from "@/types";

export const suggestedQuestions = [
  "Why did demand decrease in North India last month?",
  "Predict next month's sales for Waterproofing category.",
  "Suggest a production plan for the Pune plant.",
  "Show inventory risks across West India.",
  "Explain the current forecast for Interior Emulsion.",
];

interface MockResponse {
  content: string;
  chart?: ChatMessage["chart"];
}

const RESPONSES: Record<string, MockResponse> = {
  "why did demand decrease in north india last month?": {
    content:
      "Demand in North India declined 6.2% last month, primarily driven by three factors: (1) an early end to the construction season in Punjab and Haryana, (2) a 4% dealer inventory correction after last quarter's festival overstocking, and (3) unseasonal rainfall delaying exterior painting projects. The AI model expects demand to normalize within 2-3 weeks as dealer stock levels rebalance.",
    chart: {
      type: "bar",
      data: [
        { label: "Construction Slowdown", value: 3.1 },
        { label: "Dealer Correction", value: 2.4 },
        { label: "Weather Delay", value: 0.7 },
      ],
    },
  },
  "predict next month's sales for waterproofing category.": {
    content:
      "The AI forecast projects Waterproofing category sales to reach ₹42.6 Cr next month, an increase of 18.4% over the current month. This is driven primarily by continued monsoon activity across West and South India, with confidence interval of ±6%.",
    chart: {
      type: "line",
      data: [
        { label: "Week 1", value: 9.8 },
        { label: "Week 2", value: 10.4 },
        { label: "Week 3", value: 11.1 },
        { label: "Week 4", value: 11.3 },
      ],
    },
  },
  "suggest a production plan for the pune plant.": {
    content:
      "Based on current demand signals, I recommend increasing Pune plant utilization from 82% to 91% over the next 2 weeks, prioritizing Waterproofing and Exterior Emulsion lines. This aligns production capacity with the projected regional demand surge and reduces reliance on inter-plant transfers.",
  },
  "show inventory risks across west india.": {
    content:
      "West India currently has 2 warehouses flagged at elevated risk: Pune Distribution Center (12 days coverage, high risk) and Ahmedabad Distribution Center (18 days coverage, medium risk). I recommend a stock transfer from Ahmedabad to Pune to rebalance coverage before the projected demand increase.",
    chart: {
      type: "bar",
      data: [
        { label: "Pune DC", value: 12 },
        { label: "Ahmedabad DC", value: 18 },
        { label: "Nagpur DC", value: 24 },
      ],
    },
  },
  "explain the current forecast for interior emulsion.": {
    content:
      "Interior Emulsion demand is forecast to grow steadily at 9-11% YoY, consistent with historical trend. Contributing factors include sustained festival season repainting activity, a marketing campaign uplift in North India, and increased platinum-tier dealer order volumes in Maharashtra and Tamil Nadu.",
  },
};

const FALLBACK: MockResponse = {
  content:
    "Based on current forecasting models and supply chain signals, I don't have a pre-computed answer for that exact question yet in this demo environment. In production, this would query live SAP, Snowflake and MES data through the Pibythree AI orchestration layer to generate a grounded, real-time response.",
};

export const copilotService = {
  async ask(question: string): Promise<MockResponse> {
    const key = question.trim().toLowerCase();
    return RESPONSES[key] ?? FALLBACK;
  },

  getSuggestedQuestions() {
    return suggestedQuestions;
  },
};
