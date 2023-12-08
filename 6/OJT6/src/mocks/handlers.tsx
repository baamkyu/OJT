import { http, HttpResponse } from "msw";
import Swal from "sweetalert2";

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const requestBody = await request.json();
    const { inputId, inputPw } = requestBody as {
      inputId: string;
      inputPw: string;
    };
    // 예제로 간단한 사용자 이름과 비밀번호를 확인
    if (inputId === "test" && inputPw === "1234") {
      // 로그인이 성공하면 세션에 사용자 정보를 저장하거나 토큰을 발급할 수 있음
      console.log("로그인 성공");
      return HttpResponse.json({ login: true, message: "로그인 성공" });
    } else {
      // 로그인 실패 시 에러 응답
      if (inputId === "test") {
        Swal.fire("비밀번호를 다시 확인하세요.");
      } else {
        Swal.fire("올바르지 않은 아이디입니다.");
      }
      return HttpResponse.json({ login: false, message: "로그인 실패" });
    }
  }),
];
