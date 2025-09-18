import Projects from '../tools/Projects'
import Skills from '../tools/Skills'
import Home from '../tools/Home'
import Education from "../tools/Education"
export default function BodyContent() {
  return(
    <div className="">

      <Home />
      <Education />
      <Projects />
      <Skills />
    </div>
  )  
};
