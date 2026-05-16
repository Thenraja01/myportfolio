import Navbar from "../tools/Navbar";
import Footer from "../tools/Footer";
import BodyContent from "./BodyContent";
import { ThemeProvider } from "../../dataprovider/ThemeContext";
export default function Layouts() {
  const goBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="">
      <ThemeProvider>
        <div className="">
          <Navbar />

          <div>
            <BodyContent />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}
