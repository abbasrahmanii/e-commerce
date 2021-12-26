import Link from "next/link";

const LoginPage = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="mb-6">
      <form onSubmit={submitHandler}>
        <h1 className="text-center text-2xl p-4 dark:text-white">Login</h1>
        <div className="w-1/4 mx-auto">
          <div className="flex flex-col my-2 justify-between h-14 dark:text-white">
            <label htmlFor="email" className="mb-2">
              ایمیل:
            </label>
            <input
              type="email"
              id="email"
              className="bg-indigo-200 py-1 px-3"
              placeholder="📧"
            />
          </div>
          <div className="flex flex-col my-2 justify-between h-14 dark:text-white">
            <label htmlFor="password" className="mb-2">
              رمز عبور:
            </label>
            <input
              type="password"
              id="password"
              className="bg-indigo-200 py-1 px-3"
              placeholder="🔒"
            />
          </div>
          <button
            type="submit"
            className="block bg-indigo-600 w-full my-6 p-2 rounded text-white dark:bg-indigo-300 dark:text-gray-900"
          >
            ورود
          </button>
          <div className="dark:text-white">
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
