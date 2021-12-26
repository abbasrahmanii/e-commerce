import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fa-IR" dir="rtl" className="dark">
        <Head>
          <meta charSet="utf-8" />
          {/* <title>My E-Commerce</title> */}
        </Head>
        <body className="dark:bg-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
