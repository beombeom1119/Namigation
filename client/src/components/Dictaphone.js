import { useTheme } from '@material-ui/core'
import React, {useEffect,useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const Dictaphone = ({GetVoiceValue}) => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [usernum, setusernum] = useState(1234)
  const [transcript2, settransrcipt2] = useState("hello")
  useEffect(() => {
    SetVoiceValue()
    SpeechRecognition.startListening()
  }, [])
  
const handleValueChange= (e) => {
  
  setusernum(
    {
      [e.target.name.usernum] : e.target.value,
    }
  )
  // console.log(transcript)
 
}

function SetVoiceValue(){
  console.log("보이스 값 추출")
  GetVoiceValue(transcript)
}



  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      {/* <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
      {/* <input type ="text" name={usernum} value={transcript} onChange={handleValueChange.bind(this)}></input> */}
      <input type ="hidden" name={usernum} value={transcript} onChange={handleValueChange.bind(this)}></input>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone