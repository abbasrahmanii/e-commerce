import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      // <Html lang="fa-IR" dir="rtl" className="dark">
      <Html lang="fa-IR">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <meta charSet="utf-8" />
          <title>My E-Commerce</title>
        </Head>
        {/* <body className="dark:bg-gray-800"> */}
        <body className="dark:bg-gray-800" dir="rtl">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
