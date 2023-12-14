import {
  GoogleLogin,
  GoogleOAuthProvider,
  // useGoogleLogin,
  // hasGrantedAnyScopeGoogle,
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import { isLoginAtom } from "../../store/store";

/** 구글로그인 시도하는 함수 */
const TryGoogleLogin = () => {
  const setIsLogin = useSetAtom(isLoginAtom);
  const navigate = useNavigate();

  const clientId =
    "22782167732-u6d2fmv2bnoh4k6jkmj6nmkkal9hcavq.apps.googleusercontent.com";

  // const hasAccess = hasGrantedAnyScopeGoogle(tokenResponse, "profile");

  // useGoogleLogin({ scope: "name" });

  const onSuccess = (res) => {
    console.log(res);
    setIsLogin(true);
    navigate("/");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
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
