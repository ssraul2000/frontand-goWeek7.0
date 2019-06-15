import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./New.css";

const New = props => {
  const [forms, setForms] = useState({
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  });
  const handleImageChange = e => {
    setForms({ ...forms, image: e.target.files[0] });
  };
  const handleChange = e => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", forms.image);
    data.append("author", forms.author);
    data.append("place", forms.place);
    data.append("description", forms.description);
    data.append("hashtags", forms.hashtags);

    await api.post("posts", data);
    props.history.push("/");
  };

  return (
    <form id="new-post" onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        name="author"
        placeholder="Autor do post"
        onChange={handleChange}
        value={forms.author}
      />
      <input
        type="text"
        name="place"
        placeholder="Local do post"
        onChange={handleChange}
        value={forms.place}
      />
      <input
        type="text"
        name="description"
        placeholder="Descricao do post"
        onChange={handleChange}
        value={forms.description}
      />
      <input
        type="text"
        name="hashtags"
        placeholder="Hashtags do post"
        onChange={handleChange}
        value={forms.hashtags}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default New;
