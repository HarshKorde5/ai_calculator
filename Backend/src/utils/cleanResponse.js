
const cleanResponse = (responseText) => {
    // Clean the response text by removing Markdown formatting
    let cleanedResponse = responseText
        .replace(/```json/g, '')  // Remove opening Markdown code block
        .replace(/```/g, '')      // Remove closing Markdown code block
        .replace(/True/g, 'true') // Convert Python-style booleans
        .replace(/False/g, 'false');

    // Convert single quotes to double quotes correctly
    cleanedResponse = cleanedResponse
        .replace(/'\s*([a-zA-Z0-9_]+)\s*'\s*:/g, '"$1":')  // Fix keys
        .replace(/:\s*'([^']*)'/g, ': "$1"')               // Fix values
        .replace(/'([^']*)'/g, '"$1"');                    // Fix any remaining single-quoted values

    // Ensure fractions in "result" are converted to strings (e.g., 2/3 -> "2/3")
    cleanedResponse = cleanedResponse.replace(/"result":\s*(\d+)\/(\d+)/g, '"result": "$1/$2"');

    // Try parsing the cleaned response
    let answers = [];

    try {
        answers = JSON.parse(cleanedResponse);
    } catch (error) {
        console.error("Error parsing Gemini response:", error);
        console.error("Cleaned response:", cleanedResponse); // Log for debugging
    }

    return answers;
}

export default cleanResponse;
