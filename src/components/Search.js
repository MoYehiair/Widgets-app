import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResult(data.query.search);
    };
    const timeoutID = setTimeout(() => {
      if (term) {
        search();
      }
    }, 500);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [term]);

  const renderedResult = result.map((e) => {
    return (
      <div className="item" key={e.pageid}>
        <div className="right floated content ">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid${e.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{e.title}</div>
          <span dangerouslySetInnerHTML={{ __html: e.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="ui form ui container">
        <div className="field">
          <label>Search here</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResult}</div>
    </div>
  );
};

export default Search;
