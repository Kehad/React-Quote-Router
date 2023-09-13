import React, { Suspense } from 'react';
import { Routes, Route, Outlet, useParams, redirect } from 'react-router-dom';

// import NewQuote from './pages/NewQuote';
// import QuoteDetail from './pages/QuoteDetail';
// import AllQuotes from './pages/AllQuotes';

// import Comments from './components/comments/Comments';
// import NotFound from './pages/NotFound';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuote = React.lazy(() => import('./pages/NewQuote'))
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const Comments = React.lazy(() => import(".//components/comments/Comments"));


function App() {
 
  return (
    <Layout>
      <Suspense fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }>
        <Routes>
          <Route path="/" element={<AllQuotes />  } exact />
          <Route path="/quotes" element={<AllQuotes />} exact />
          <Route path="quotes/:quoteId" element={<QuoteDetail />}>
            <Route path="comments" element={<Comments />} />
          </Route>
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />

          {/* <Route path="/quotes/:quoteId" element={<QuoteDetail />} /> */}
        </Routes>
      </Suspense>
    </Layout>
  ); 
}

export default App;

    /*
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
      </Switch>
      */