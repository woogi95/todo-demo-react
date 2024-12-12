import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
const ErrorDiv = styled.p`
  width: 100%;
  color: red;
  font-size: 10px;
`;
const schema = yup.object({
  email: yup
    .string()
    .email("이메일을 확인해주세요.")
    .required("이메일을 입력해주세요."),
  pw: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "비밀번호가 틀렸습니다.",
    ),
});
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", pw: "" },
    mode: "all",
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <div>
      <h1>로그인 화면</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
        <div>
          <label>이메일</label>
          <input {...register("email")} />
          {errors.email && <ErrorDiv>{errors.email.message}</ErrorDiv>}
        </div>
        {/* 비밀번호 */}
        <div>
          <label>비밀번호</label>
          <input {...register("pw")} />
          {errors.pw && <ErrorDiv>{errors.pw.message}</ErrorDiv>}
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <div>
          <Link to="">[비밀번호 찾기] </Link>
          <Link to="">[이메일 찾기] </Link>
          <Link to="/member">[회원가입하기] </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
