import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import { isLogin } from "../../store/store";

/** 구글로그인 시도하는 함수 */
const TryGoogleLogin = () => {
  const setIsLogin = useSetAtom(isLogin);
  const navigate = useNavigate();

  const clientId =
    "22782167732-u6d2fmv2bnoh4k6jkmj6nmkkal9hcavq.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(res) => {
          console.log("success", res);
          setIsLogin(true);
          navigate("/");
        }}
        onError={() => {
          console.log("error");
        }}
        logo_alignment="center"
        size="large"
        width="384px"
      />
    </GoogleOAuthProvider>
  );
};

export default TryGoogleLogin;
