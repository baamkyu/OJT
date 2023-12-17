import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

/** 구글로그인 시도하는 함수 */
const TryGoogleLogin = () => {
  const navigate = useNavigate();

  const clientId =
    "22782167732-u6d2fmv2bnoh4k6jkmj6nmkkal9hcavq.apps.googleusercontent.com";

  const onSuccess = () => {
    localStorage.setItem("token", "success");
    navigate("/");
  };

  const onError = () => {
    alert("Google Login Error");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        logo_alignment="center"
        size="large"
        width="384px"
      />
    </GoogleOAuthProvider>
  );
};

export default TryGoogleLogin;
