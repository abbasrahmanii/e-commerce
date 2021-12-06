import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <form>
        <h1>Login</h1>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Login</button>
          <div>
            <p>
              Don't have an acount?{" "}
              <Link href="/register">
                <a>Register</a>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
