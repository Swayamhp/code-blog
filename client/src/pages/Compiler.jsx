import React from 'react'
import { Button, Select, Textarea } from 'flowbite-react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/theme-cloud9_day'
import 'ace-builds/src-noconflict/theme-monokai'
import { Alert } from 'flowbite-react'

import { useState } from 'react'
import Axios from "axios";
import spinner from "./Spinner.svg";

const apiKey =import.meta.env.VITE_RAPID_COMPILER_API_KEY;
const appURL = "https://judge0-ce.p.rapidapi.com/submissions";

export default function App() {
  const [userCode, setUserCode] = useState(``);
  const [userLanguage, setUserLanguage] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");



  const handleTheme = () => {
    if (userTheme === "monokai") {
      setUserTheme("cloud9_day");
    }
    else {
      setUserTheme("monokai")
    }
  }

  function Compile() {
    setLoading(true);
    let languageId;
    if (userLanguage === "Java") {
      languageId = 62;
    } else if (userLanguage === "C") {
      languageId = 50;
    } else if (userLanguage === "C++") {
      languageId = 54;
    } else if (userLanguage === "Python") {
      languageId = 71;
    }
    else if (userLanguage === "uncategorized") {
      languageId = 999;
    }


    const formData = {
      language_id: languageId,
      source_code: btoa(userCode),
      stdin: btoa(userInput),
    };
    const options = {
      method: "POST",
      url: appURL,
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        base64_encoded: "true",
        fields: "*",
        ...formData,
      },
    };

    console.log("Axios Request Options:", options);
    Axios
      .request(options)
      .then(function response(response) {
        console.log("res.data", response.data)
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setLoading(false);
        console.log(error);
        setError("Please select language! ");
      })
  }

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: appURL + "/" + token,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };
    try {
      console.log(options)
      let response = await Axios.request(options);
      console.log(response)
      let statusId = response.data.status?.id;
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return;
      } else {
        setLoading(false);
        setError("");
        console.log("res.data", response.data)
        if (response.data.compile_output) {
          setUserOutput(atob(response.data.compile_output));
        } else if (response.data.stderr) {
          setUserOutput(atob(response.data.stderr));
        } else {
          setUserOutput(atob(response.data.stdout));
        }
      }
    } catch (err) {
      console.log(err);
    }
  }


  function clearOutput() {
    setUserOutput("");
  }
  return (
    <div>
      <h1 className='font-semibold text-2xl'>Code</h1>

      < div className='flex flex-wrap gap-3 mt-2 ml-3  '>
        <div className='flex flex-col gap-4 '>
          <Select className="w-52"
            onChange={(e) => setUserLanguage(e.target.value)}>
            <option value='uncategorized' >Select a language</option>
            <option value='C'>C</option>
            <option value='C++'>C++</option>
            <option value='Java'>Java</option>
            <option value='Python'>Python</option>
          </Select>

          <Button type='button' gradientDuoTone={"purpleToPink"}
            onClick={handleTheme}>{(userTheme === "monokai") ? "Light" : "Dark"}</Button>
          <div className=''>{Error && (
            <Alert color='failure' >{Error}</Alert>
          )}</div>
        </div>
        <AceEditor mode='c_cpp' theme={userTheme} 
          onChange={(value) => {
            setUserCode(value); 
          }}
        />      <div className='flex flex-col'>
          <div className='mx-auto justify-items-center gap-3'>
            <h1 className='font-semibold'>Input</h1>
            <Textarea onChange={(e) => setUserInput(e.target.value)}
              type="radio " name="inputRadio"
              id="inputRadio" className='' rows='8' cols='60' />
          </div>
          <div className='mx-auto justify-items-center gap-3 '>
            <Button className='mt-2' type='submit' gradientDuoTone='purpleToBlue' onClick={() => Compile()}

            >Run</Button>        <h1 className='font-semibold'>Output</h1>

            {loading ? (
              <div className="out-put">
                <img src={spinner} />
              </div>
            ) : (
              <Textarea type="radio " name="inputRadio" id="inputRadio"
                rows='8' cols='60' value={userOutput} disabled />
            )}
            <Button className='mt-2' type='submit' gradientDuoTone='pinkToOrange' onClick={() => clearOutput()}

            >Clear</Button>


          </div>
        </div>
      </div>
    </div>
  )
}
