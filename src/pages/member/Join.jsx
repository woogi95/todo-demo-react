import styled from "@emotion/styled";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
const ErrorDiv = styled.p`
  width: 100%;
  color: red;
  font-size: 10px;
`;

// form 을 state 로 작동시키면
// 너무 많은 리랜더링이 일어난다.
// 글자를 1개만 적어도
// 리랜더링이 발생한다.
// 작성내용, 항목이 많으면
// 성능이슈가 발생할 소지가 높다.
// 이를 위해서 https://www.react-hook-form.com/ 사용함.
// npm install react-hook-form
function Join() {
  // register : 입력창을 훅폼에 등록
  // handleSubmit : 입력창에 내용을 입력 후 전송 실행시 처리
  // formState: {errors} : 폼의 에러상태를 이용해서 유효성 검사 적용하기
  // getValues: 입력된 값
  // form 태그의 요소에 초기값 셋팅하기
  // form 태그의 요소에 값 리셋하기

  // mode : 원하는 시점
  // - change   : 즉시, 즉시, 유효성 검사실행하기
  // - onBlur   : 사용자가 폼 외부를 클릭한 경우 검사실행하기
  // - onSubmit :  실행시에만 폼 유효성 검사실행하기
  // - all      : onChnage 와 onBlur 모두 포함

  // trigger    : 초기 화면 출력시 폼 유효성 검사 실행가기

  // Yup 적용해보기
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    trigger, // 유효성 검사 즉시 실행
    formState: { errors },
  } = useForm({
    // 디폴트값
    defaultValues: {
      name: "",
      email: "",
      pw: "",
      pwconfirm: "",
      birthday: "",
      gender: "",
      phone: "",
      address: {
        postcode: "",
        basic: "",
        detail: "",
      },
      agreementpolicy: false,
      policy: false,
    },
    mode: "all",
  });
  // 전송용 데이터
  const onSubmit = data => {
    console.log(data);
  };
  // 유효성 검사 즉시 실행
  useEffect(() => {
    trigger();
  }, [trigger]);
  return (
    <div style={{ padding: 50 }}>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 이름 */}
        <div>
          <label>이름</label>

          <input
            {...register(
              "name",
              { required: "이름을 입력해 주세요." },
              {
                minLength: {
                  value: 2,
                  message: "이름은 2글자 이상 입력해주세요.",
                },
              },
            )}
          />
          {/* name 이 없을 때 에러 내용 출력자리 */}
          {errors.name && <ErrorDiv>{errors.name.message}</ErrorDiv>}
        </div>
        {/* 이메일 */}
        <div>
          <label>이메일</label>

          <input
            {...register("email", {
              required: "이메일을 입력해 주세요.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                message: " 올바른 이메일을 입력해주세요.",
              },
            })}
          />
          {errors.email && <ErrorDiv>{errors.email.message}</ErrorDiv>}
        </div>
        {/* 비밀번호 */}
        <div>
          <label>비밀번호</label>

          <input
            type="password"
            {...register("pw", {
              required: "비밀번호를 입력하세요.",
              minLength: {
                value: 8,
                message: "최소 8자 이상 입력하세요.",
              },
              maxLength: {
                value: 16,
                message: "최대 16자만 입력하세요.",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "영문 대소문자, 숫자, 특수문자를 포함해주세요.",
              },
            })}
          />
          {errors.pw && <ErrorDiv>{errors.pw.message}</ErrorDiv>}
        </div>
        {/* 비밀번호 확인 */}
        <div>
          <label>비밀번호 확인</label>

          <input
            type="password"
            {...register("pwConfirm", {
              required: "비밀번호 확인을 입력해주세요.",
              validate: value =>
                value === getValues("pw") || "비밀번호가 일치하지 않습니다.",
            })}
          />
          {errors.pwConfirm && <ErrorDiv>{errors.pwConfirm.message}</ErrorDiv>}
        </div>
        {/* 생년월일 */}
        <div>
          <label>생년월일</label>
          <input
            type="date"
            {...register("birthday", {
              required: "생년월일을 입력하세요.",
            })}
          />
          {errors.birthday && <ErrorDiv>{errors.birthday.message}</ErrorDiv>}
        </div>
        {/* 성별 */}
        <div>
          <label>성별</label>
          <select {...register("gender")}>
            <option value={""}>선택해주세요.</option>
            <option value={"male"}>남성</option>
            <option value={"female"}>여성</option>
            <option value={"other"}>기타</option>
          </select>
        </div>
        {/* 전화번호 */}
        <div>
          <label>전화번호</label>
          <input
            type="tel"
            {...register("phone", {
              required: "전화번호를 입력해주세요.",
              pattern: {
                message: "올바른 전화번호 형식이 아닙니다.",
                value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
              },
            })}
          />
          {errors.phone && <ErrorDiv>{errors.phone.message}</ErrorDiv>}
        </div>
        {/* 우편번호 */}
        <div>
          <label>우편번호</label>
          <input {...register("address.postcode")} placeholder="12345" />
        </div>
        {/* 주소 */}
        <div>
          <label>주소</label>
          <input {...register("address.basic")} placeholder="기본주소" />
        </div>
        {/* 우편번호 */}
        <div>
          <label>상세 주소</label>
          <input {...register("address.detail")} placeholder="상세주소" />
        </div>
        {/* 이용약관 */}
        <div>
          <input
            type="checkbox"
            {...register("policy", { required: "이용약관에 동의해 주세요." })}
          />
          <label>이용약관에 동의 합니다.</label>
          {errors.policy && <ErrorDiv>{errors.policy.message}</ErrorDiv>}
          <div style={{ height: 150, overflowX: "hidden", overflowY: "auto" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
            deleniti libero maiores odio corrupti iure in ea fuga voluptas
            voluptates, adipisci maxime blanditiis, vero dolore numquam impedit
            amet sequi voluptatibus. Repellat reiciendis debitis nam quo
            doloremque dolores temporibus quos enim natus possimus veniam dicta
            perspiciatis adipisci, accusamus fugit magnam numquam voluptates
            nemo cupiditate id est sint pariatur porro facere! Consequatur?
            Necessitatibus vel repellat culpa, esse nisi officiis, magnam sint
            rem deserunt, cumque iusto! Inventore dicta pariatur totam ex neque
            eos itaque aut doloribus, eveniet quisquam incidunt officia error
            nulla iure? Animi ut necessitatibus aliquid nemo laboriosam! Harum
            quis itaque delectus, facere suscipit dolorem est animi ullam fugit
            sed ducimus laboriosam fuga, ea amet, ab perspiciatis quia eveniet
            ut. Delectus, molestias. Alias, eius corrupti. Labore, excepturi
            rerum atque distinctio est ut unde molestiae laborum amet delectus
            libero velit autem iure architecto ab soluta ad aliquam aperiam,
            quod itaque at? Esse, eos.
          </div>
        </div>
        {/* 리셋 */}
        <div>
          <input
            type="button"
            onClick={() => reset()}
            value="Custom Reset Field Values & Errors"
          />
        </div>
        <div>
          <button type="submit">제출하기</button>
        </div>
      </form>
    </div>
  );
}

export default Join;
