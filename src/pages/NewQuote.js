import { useNavigate } from 'react-router-dom'

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import { useEffect } from 'react';

const NewQuote = () => {
  const { sendRequest, status} = useHttp(addQuote)
  const history = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      history("/quotes");
    }
  }, [status, history]);

  const addQuoteHAndler = quoteData => {
    console.log(quoteData);
    sendRequest(quoteData)
  };
   
  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHAndler} />
};

export default NewQuote;