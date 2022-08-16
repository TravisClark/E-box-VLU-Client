import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IntroductionBanner from '../components/IntroductionBanner/IntroductionBanner'
import LoginForm from '../components/LoginForm/LoginForm'


function Login() {
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  useEffect(() => {
    isLoggedIn && history.push("/E-boxVLU/Home");
  }, [isLoggedIn, history]);
  
  return (
    <IntroductionBanner>
        <LoginForm/>
    </IntroductionBanner>
  )
}

export default Login