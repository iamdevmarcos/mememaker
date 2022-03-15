import React, { useState, useEffect } from "react";

import { Wrapper, Card, Templates, Form, Button } from "./styles";
import logo from "../../images/logo.svg";

const Home = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const {
        data: { memes },
      } = await res.json();
      setTemplates(memes);
    })();
  }, []);

  return (
    <Wrapper>
      <img src={logo} alt="MemeMaker" />

      <Card>
        <h2>Selecione um template</h2>
        <Templates>
          {templates.map((item) => (
            <button key={item.id} type="button">
              <img src={item.url} alt={item.name} />
            </button>
          ))}
        </Templates>

        <h2>Textos</h2>
        <Form>
          <input type="text" placeholder="Texto #1" />
          <input type="text" placeholder="Texto #1" />
          <input type="text" placeholder="Texto #1" />

          <Button type="submit">MakeMyMeme</Button>
        </Form>
      </Card>
    </Wrapper>
  );
};

export default Home;
