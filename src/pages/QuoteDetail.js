import { Fragment, useEffect } from "react";
import { useParams, Route, Routes, Outlet, Link, matchRoutes, MemoryRouter } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";

const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "Learning React is fun!" },
  { id: "q2", author: "Maximilian", text: "Learning React is great!" },
];

const QuoteDetail = () => {
    // const match = matchRoutes();
    // const memory = MemoryRouter();
    // const matchedRoutes = matchRoutes();
    // console.log(matchedRoutes);
    const params = useParams();
  console.log(params);

    const { quoteId } = params;
  
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner    />
      </div>
    );
  }
    
      if (error) {
        return <p className="centered">{error}</p>;
      }

      if (!loadedQuote.text) {
        return <p>No quote found!</p>;
      }

    return (
      <Fragment>
        <h1>Quotes Detail Page</h1>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
        {/* <Route path={`/quotes/${quoteId}/comments`}>
          <div className="centered">
            <Link
              className="btn--flat"
              to={`/quotes/${quoteId}/comments`}
            >
              Add a Comment
            </Link>
          </div>
        </Route> */}
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${quoteId}/comments`}>
            Load Comment
          </Link>
        </div>
        {/* <p>{quoteId}</p> */}
        {/* <Comments /> */}
        <Outlet />
      </Fragment>
    );
};

export default QuoteDetail; 