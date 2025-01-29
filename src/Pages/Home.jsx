import React from "react";
import Header from "../components/NavBar";
import TemplateSelector from "../components/TemplateSelector";
import Recent_forms from "../components/Recent_Forms";

function Home() {
  return (
    <div>
      <Header />

      <TemplateSelector />
      <Recent_forms />
    </div>
  );
}

export default Home;
