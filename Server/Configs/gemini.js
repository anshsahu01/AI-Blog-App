// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// async function main(prompt) {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [
//         {
//           role : "user",
//           parts : [{text : prompt}],
//         },
//       ]
//     });
//    return response.candidates[0]?.content?.parts[0]?.text||"";
//   } catch (error) {
//     console.error("Gemini API error",error);
//     throw error;
    
//   }
// }

// export default main;


import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main(prompt) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" }); 
    // use "gemini-2.5-flash" if enabled in your account

    const response = await model.generateContent(prompt);

    // Gemini returns text directly
    return response.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export default main;
