import logo from './logo.svg';
import './App.css';
import { GithubLoginButton } from "react-social-login-buttons";
import { GoogleLogin } from 'react-google-login'


async function makeRequest(url = '', data = {}, reqType) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: reqType, // *GET, POST, PUT, DELETE, etc.
    // mode: 'same-origin', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
      
    },
    // referrerPolicy: 'no-referrer',
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function App() {



  const githubClickHandler = (e) => {
    window.location.href = `https://github.com/login/oauth/authorize?scope=user:email&client_id=501da70caadd2a47aebc`
  }

  async function handleGoogleLogin (googleData) {
    const res = await fetch("http://localhost:3000/user/login/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
  }

  let params = (new URL(document.location)).searchParams;
  let code = params.get("code");

  
  if(code !== null){
    // console.log(code)
    let data = {
      code,
    }

    makeRequest('http://localhost:3000/user/login/github', data , 'POST')
    .then(data => {
      return JSON.parse(data.data)

    }).then( data => {
      console.log(data)
     
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GithubLoginButton style={{ width: 250, height: 50 }} className="App-link" onClick={(e) => githubClickHandler(e)} />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={(e) => handleGoogleLogin(e)}
          onFailure={e => handleGoogleLogin(e)}
          cookiePolicy={'single_host_origin'}
        />
    

      </header>
    </div>
  );
}

export default App;
