import { useRef,useState,useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';



function App() {
  const nodeRef = useRef(null); // Create a ref for each item
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [reset, setReset] = useState(false);
  const [isErasing, setIsErasing] = useState(false); // Track eraser state
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("black");
  const [theme, setTheme] = useState("dark"); // Light or Dark mode
  const [result, setResult] = useState(null);
  const [latexPosition, setLatexPosition] = useState({ x: 100, y: 300 });
  const [latexExpression, setLatexExpression] = useState([]);

  const [dictOfVars, setDictOfVars] = useState({});

  

  

  useEffect(() => {
    if (latexExpression.length > 0 && window.MathJax) {
          setTimeout(() => {
              window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
          }, 0);
      }
  }, [latexExpression]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - canvas.offsetTop;
            ctx.lineCap = 'round';
            ctx.lineWidth = 5;
        }
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
        window.MathJax.Hub.Config({
            tex2jax: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
        });
    };

    return () => {
        document.head.removeChild(script);
    };

  }, []);

  useEffect(() => {
      if (result) {
          renderLatexToCanvas(result.expression, result.answer);
      }
  }, [result]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1510;
    canvas.height = 585;
    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle =  isErasing
    ? theme === "dark"
      ? "#111111"
      : "#FFFFFF"
    : color;

    // Apply background color without clearing drawings
    context.fillStyle = theme === "dark" ? "#111111" : "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;

  }, [theme]);
  
  useEffect(() => {
    if (reset) {
        resetCanvas();
        setLatexExpression([]);
        setResult(null);
        setDictOfVars({});
        setReset(false);
    }
    if(isErasing){
      toggleEraser();
    }
  }, [reset]);

  useEffect(()=>{
    if(isErasing){
      toggleEraser();
    }
  },[color])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (theme === "dark") {
            ctx.fillStyle = "#111111"; // Dark mode background
          } else {
            ctx.fillStyle = "#FFFFFF"; // Light mode background
          }
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }
  };
  
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Toggle Eraser Mode
  const toggleEraser = () => {
    setIsErasing((prev) => !prev);
    contextRef.current.strokeStyle = isErasing
      ? color // Switch back to normal drawing
      : theme === "dark"
      ? "#111111" // Dark mode background
      : "#FFFFFF"; // Light mode background  
  };


  const renderLatexToCanvas = (expression, answer) => {
    const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
    
    setLatexExpression([...latexExpression, latex]);

    // Clear the main canvas
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
  };

  const runRoute = async () => {
    const canvas = canvasRef.current;

    if(canvas){
      const response = await axios( {
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/calculate`,
        data: {
          image : canvas.toDataURL('image/png'),
          dict_of_vars: dictOfVars
        }
      });

      const resp = await response.data;

      console.log("RESPONSE : ",resp);
      
      resp.data.forEach( (data) => {
        if(data.assign === true) {
          setDictOfVars( {
            ...dictOfVars,
            [data.expr] : data.result
          });
        }
      });

      resp.data.forEach((data) => {
        setTimeout(() => {
            setResult({
                expression: data.expr,
                answer: data.result
            });
        }, 1000);
      });
    }
    
  }

  return (
    <>
      <div className="flex flex-col items-center w-full p-4 bg-[#EEF1DA] h-screen">
        {/* Top Controls */}
        <div className="flex justify-between items-center w-full bg-[#443627] p-3 rounded-lg shadow-lg">
          <button 
            className="px-8 py-3 bg-[#D98324] text-white text-lg font-bold rounded-lg hover:bg-[#a7641a]"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          <button 
            // className="px-8 py-3 bg-[#D98324] text-white text-lg font-bold rounded-lg hover:bg-[#a7641a]"
            onClick={toggleEraser}
            className={`px-8 py-3 text-lg font-bold rounded-lg ${
              isErasing ? "bg-red-500 text-white" : "bg-[#D98324] text-white"
            } hover:bg-[#a7641a]`}  
          >
          {isErasing ? "Click to Draw!" : "Eraser"}
          </button>

          {/* Color Palette */}
          <div className="flex space-x-2 bg-[#EFDCAB]  px-4 py-2 rounded-lg">
              {[
                    "#000000",  // black
                    "#ffffff",  // white
                    "#ee3333",  // red
                    "#e64980",  // pink
                    "#be4bdb",  // purple
                    "#893200",  // brown
                    "#228be6",  // blue
                    "#3333ee",  // dark blue
                    "#40c057",  // green
                    "#00aa00",  // dark green
                    "#fab005",  // yellow
                    "#fd7e14",  // orange
                ].map((col) => (
              <button
                key={col}
                className={`w-8 h-8 rounded-full border-2 `}
                style={{ backgroundColor: col }}
                onClick={() => {
                  
                  setColor(col)
                  contextRef.current.strokeStyle = col; // Change stroke color without resetting canvas
                }}
              />
            ))}
          </div>

          <button className="px-8 py-3 bg-[#EFDCAB] text-xl tracking-wide font-bold rounded-lg">
            AI-CALCULATOR
          </button>
          <button 
            onClick={() => setReset(true)}
            className="px-8 py-3 bg-[#D98324]  text-white text-lg font-bold rounded-lg hover:bg-[#a7641a]"
          >
            Reset
          </button>
          <button 
            onClick={runRoute}
            className="px-8 py-3 bg-[#D98324]  text-white text-lg font-bold rounded-lg hover:bg-[#a7641a]"
          >
            Run
          </button>
        </div>

        <div >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full border border-gray-300 mt-4 rounded-lg shadow-lg bg-black"
          />
        </div>

        {latexExpression && latexExpression.map((latex, index) => (
         <Draggable
              key={index}
              nodeRef={nodeRef} // Assign the ref to Draggable
              defaultPosition={latexPosition}
              onStop={(_e, data) => setLatexPosition({ x: data.x, y: data.y })}
          >
              <div ref={nodeRef} className="absolute p-2 text-white rounded shadow-md">
                  <div className="latex-content">{latex}</div>
              </div>
          </Draggable>
            ))}

      </div>
    </>
  )
}

export default App
