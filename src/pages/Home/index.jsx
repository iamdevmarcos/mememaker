import React from "react";

import { Wrapper, Card, Templates } from "./styles";
import logo from "../../images/logo.svg";

const Home = () => {
  return (
    <Wrapper>
      <img src={logo} alt="MemeMaker" />

      <Card>
        <h2>Selecione um template</h2>
        <Templates>
          <button type="button">
            <img src="" alt="Template 1" />
          </button>
          <button type="button">
            <img src="" alt="Template 1" />
          </button>
          <button type="button">
            <img src="" alt="Template 1" />
          </button>
          <button type="button">
            <img src="" alt="Template 1" />
          </button>
        </Templates>

        <h2>Textos</h2>
      </Card>
    </Wrapper>
  );
};

export default Home;
