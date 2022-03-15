import React, { useState, useEffect } from "react";

import qs from "qs";

import { Wrapper, Card, Templates, Form, Button } from "./styles";
import logo from "../../images/logo.svg";

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [generatedMeme, setGeneratedMeme] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const {
        data: { memes },
      } = await res.json();
      setTemplates(memes);
    })();
  }, []);

  const handleInputChange = (index) => (e) => {
    const newValues = boxes;
    newValues[index] = e.target.value;
    setBoxes(newValues);
  };

  const handleSelectedTemplate = (template) => {
    setSelectedTemplate(template);
    setBoxes([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = qs.stringify({
      template_id: selectedTemplate.id,
      username: "marcosdev.me",
      password: "Designer688fc",
      boxes: boxes.map((text) => ({ text })),
    });

    const res = await fetch(`https://api.imgflip.com/caption_image?${params}`);
    const json = await res.json();

    console.log(json);
    setGeneratedMeme(json.data.url);
  };

  const handleReset = () => {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  };

  return (
    <Wrapper>
      <img src={logo} alt="MemeMaker" />

      <Card>
        {generatedMeme && (
          <>
            <img src={generatedMeme} alt="Generated Meme" />

            <Button type="button" onClick={handleReset}>
              Criar outra meme
            </Button>
          </>
        )}
        {!generatedMeme && (
          <>
            <h2>Selecione um template</h2>
            <Templates>
              {templates.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectedTemplate(item)}
                  className={item.id === selectedTemplate?.id ? "selected" : ""}
                >
                  <img src={item.url} alt={item.name} />
                </button>
              ))}
            </Templates>

            {selectedTemplate && (
              <>
                <h2>Textos</h2>
                <Form onSubmit={handleSubmit}>
                  {new Array(selectedTemplate.box_count)
                    .fill("")
                    .map((_, index) => (
                      <input
                        key={String(Math.random())}
                        type="text"
                        placeholder={`Texto #${index + 1}`}
                        onChange={handleInputChange(index)}
                      />
                    ))}

                  <Button type="submit">MakeMyMeme</Button>
                </Form>
              </>
            )}
          </>
        )}
      </Card>
    </Wrapper>
  );
};

export default Home;
