import { fetchWithFallback } from "./apiClient";

export async function askAssistant(question: string): Promise<string> {
    try {
        const response = await fetchWithFallback<{ answer: string }>("/rag/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        }, null as any);
        
        return response.answer;
    } catch (e) {
        // Fallback for Demo Mode
        await new Promise(r => setTimeout(r, 1500));
        
        const q = question.toLowerCase();
        if (q.includes("water") || q.includes("flood")) {
            return "Based on the recent intelligence, there is a major water pipe burst on Main St (Ward 14) which is causing flooding. This has been clustered into Incident INC-2048 and escalated to Priority P1.";
        }
        if (q.includes("pothole") || q.includes("road")) {
            return "There are multiple pothole reports clustered along 5th Avenue (Ward 8). This is tracked as INC-2049, currently In Progress by the Road Department.";
        }
        
        return "I am the CivicFlow AI Assistant. In this demo mode, I can tell you about recent water pipe bursts or road potholes. How can I assist you with municipal operations today?";
    }
}
