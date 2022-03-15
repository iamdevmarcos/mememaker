import React, { useState, useEffect } from "react";

import { Wrapper, Card, Templates, Form, Button } from "./styles";
import logo from "../../images/logo.svg";

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedTemplate(item)}
              className={item.id === selectedTemplate?.id ? "selected" : ""}
            >
              <img src={item.url} alt={item.name} />
            </button>
          ))}
        </Templates>

        {selectedTemplate && (
          <>
            <h2>Textos</h2>
            <Form>
              <input type="text" placeholder="Texto #1" />
              <input type="text" placeholder="Texto #1" />
              <input type="text" placeholder="Texto #1" />

              <Button type="submit">MakeMyMeme</Button>
            </Form>
          </>
        )}
      </Card>
    </Wrapper>
  );
};

export default Home;
