import { lazy, useEffect, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router";

import Header from "./components/Header/Header";
import NotFoundBlock from "./pages/NotFoundBlock";
import Loading from "./components/ui/Loading";

const Homepage = lazy(() => import("./pages/Home/Home"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const TaskDetail = lazy(() => import("./pages/TaskDetail/TaskDetail"));
const About = lazy(() => import("./pages/About/About"));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
     <div id={"#top"} className="container">
        <Header/>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="details/:id" element={<TaskDetail />} />
            <Route path="*" element={<NotFoundBlock/>} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
