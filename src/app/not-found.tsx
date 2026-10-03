import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="wrap notfound">
        <h1 className="h1">Nothing here.</h1>
        <p>
          <Link href="/#work" className="link">
            Back to the work
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
