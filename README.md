
# AI Calcaulator using GEMINI

The Apple-Inspired AI Calculator is an advanced project designed to tackle mathematical problems using cutting-edge technology.By using Generative AI via Google's Gemini AI, this calculator allows users to draw mathematical expressions directly on the screen. The AI model interprets these visual inputs to deliver accurate and detailed solutions, making complex calculations intuitive and accessible. Inspired by the functionality of the Apple iPad calculator, this project enhances user experience with sophisticated AI capabilities, providing both precision and ease of use.

 
## Requirements

#### Before youu begin, ensure that you have installed following things.

- Node.js (v18 or higher)
- npm (v9 or higher)
- A stable internet connection to fetch api data

### Installation

#### Clone the repository

    git clone https://github.com/harshkorde5/ai_calculator.git

#### Install dependencies

    Note : `npm install` will install all dependencies via refering to package.json file.

##### Frontend dependencies
- npm install tailwindcss @tailwindcss/vite
- npm install axios
- npm install react-draggable
- npm install react-router-dom

##### Backend dependencies

- npm install @google/generative-ai
- npm install cors
- npm install dotenv
- npm install express
- npm install joi
- npm install sharp

##### Backend dev-dependency

- npm install nodemon

### Ensure you create an api key for your gemini model.

Visit the google's gemini website https://ai.google.dev/ and follow the steps to create api key which is needed for this project to execute.


### Start the development server using for both backend and frontend :

```
 npm run dev
```

### Open in browser

http://localhost:5173

### How to use the calculator

- You can select for the "dark" or "light" theme as per requirement.(By default it is set to dark mode).
- Choose color of your choice and try drawing using the mouse.
- Remember to draw mathematical expressions and be clear about variables such as x,y,z (e.g. decalre x = 2,y = 3 for equation 2x + 3y = ?)
- After drawing the equation click on the `Run` Button on top right corner
- This will execute the problem statement and display the result fetched from Gemini Api.
- As this is purely based on the gemini's output the results will be generated purely on what's being drawn and what gemini has understood.
- You can reset the canvas using the `Reset` button on top right side.
- Once you erase click again on the `Click to draw` button or select any color from the color palette to start drawing.

### Built using :

This project uses modern web technologies to deliver smooth and engaging experience:

- **React** - Used for building the interactive UI with efficient state management and reusable components.
- **Vite** - Chosen for its blazing-fast development server and optimized build process, improving performance during development.
-  **CSS (Tailwind or Custom Styles)** - Utilized for styling, ensuring a clean and responsive layout with minimal effort.
- **Google Gemini** - Used for analyzing the image and generating the outcomes for the mathematical calculations.
- **MathJax** - For displaying mathematical expressions on the webpage such as fractional calculations or exponentials.
- **Sharp** - The typical use case for this high speed Node-API module is to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions.

**Contributing**

Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request.



**Contact**

📧 Email: harshkorde05@gmail.com 

🌐 LinkedIn: [linkedin.com/in/harshkorde](https://www.linkedin.com/in/harshkorde)

For any further questions or inquiries, feel free to reach out. We are happy to assist you with any queries.