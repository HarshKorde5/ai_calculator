const cleanResponse = (responseText) => {
    // Clean the response text by removing Markdown formatting and normalizing quotes
    const cleanedResponse = responseText
    .replace(/```json/g, '') // Remove the opening Markdown code block
    .replace(/```/g, '')     // Remove the closing Markdown code block
    .replace(/'/g, '"')     // Replace single quotes with double quotes for valid JSON
    .replace(/True/g, 'true').replace(/False/g, 'false');  // Replace True with true as Js accepts true unlike Python which accepts True
    // Try parsing the cleaned response
    let answers = [];

    try {
        answers = JSON.parse(cleanedResponse);
    } catch (error) {
        console.error("Error parsing Gemini response:", error);
        console.error("Cleaned response:", cleanedResponse); // Log the cleaned response for debugging
    }

    return answers;
}

export default cleanResponse;
