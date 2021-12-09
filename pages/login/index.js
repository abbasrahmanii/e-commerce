import Link from "next/link";

const LoginPage = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1 className='text-center text-2xl p-4'>Login</h1>
        <div className='w-1/4 mx-auto'>
          <div className='flex flex-col my-2 justify-between h-14'>
            <label htmlFor="email">ایمیل:</label>
            <input type="email" id="email" className='bg-indigo-200' />
          </div>
          <div className='flex flex-col my-2 justify-between h-14'>
            <label htmlFor="password">رمز عبور:</label>
            <input type="password" id="password"  className='bg-indigo-200'/>
          </div>
          <button type="submit">ورود</button>
          <div>
            <p>
              آیا هنوز در سایت ثبت نام نکردی؟{" "}
              <Link href="/register">
                <a>بازیابی رمز</a>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
