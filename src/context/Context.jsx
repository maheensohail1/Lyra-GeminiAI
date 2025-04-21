import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

   
   
   const [input , setInput] = useState("");
   const [recentPrompt , setrecentPrompt] = useState("");
   const [prevPrompts, setprevPrompts] = useState([]);
   const [showResult, setshowResult] = useState(false);
   const [loading, setloading] = useState(false);
   const [resultData, setresultData] = useState("")

   //input will be save in recentPrompt
   //to store all input history
   //showResult hides the greet text and display result once tru
   //loading will show loading, false when data comes
   //resultData to display result on webpage


   const delayPara = (index, nextWord) => {
        setTimeout(function (){
            setresultData(prev => prev + nextWord)
        }, 75*index)
   }

   const newChat = () => {
    setloading(false);
    setshowResult(false);
   }

   const onSent = async (prompt) => {

    //reset resultData
    setresultData("");
    setloading(true);
    setshowResult(true);
    let response;
    if(prompt !== undefined){
        response = await runChat(prompt);
        setrecentPrompt(prompt)
    }
    else{
        setprevPrompts(prev => [...prev, input])
        setrecentPrompt(input)
        response = await runChat(input);
    }
    
    let responseArray = response.split("**");
    let newResponse ="";
    for(let i=0; i< responseArray.length ; i++){
       if(i === 0 || i%2 !== 1){
        newResponse += responseArray[i]
       } 
       else{
        newResponse += "<b>" + responseArray[i] + "</b>";
       }
    }

    let newResponse2 = newResponse.split("*").join("</br>");

    let newResponseArray = newResponse2.split(" ");
    for(let i =0; i< newResponseArray.length; i++){
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord+" ")
    }
    setloading(false);
    setInput("");

}
   
    const contextValue = {
        prevPrompts,
        setprevPrompts,
        onSent,
        setrecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider