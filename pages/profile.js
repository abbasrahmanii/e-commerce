// import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Layout from "../components/layout";
import { Store } from "../context/Store";

const ProfilePage = () => {
  // const { data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  return (
    <Layout>
      {userInfo ? (
        <>
          {/* <div className="flex justify-center p-10">
            <Image
              src={session.user.image}
              width={180}
              height={180}
              alt="user"
            />
          </div> */}
          <h1 className="text-center p-6">Name: {userInfo.name}</h1>
          <h1 className="text-center p-6">Email: {userInfo.email}</h1>
          <div className="flex justify-center">
            <button
              // onClick={() => signOut()}
              className="py-2 px-3 m-10 bg-red-500 text-white"
            >
              Sign out
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <button
            // onClick={() => signIn("github")}
            className="py-2 px-3 m-10 bg-green-500"
          >
            Sign in with GitHub
          </button>
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;