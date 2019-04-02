import React from 'react';
import './Provider.scss';

const FAQs = ({faqs}) => (
  <div className="faqs">
    {faqs.map((faq) => (
      <div className="faq">
        <h5>{faq.question}</h5>
        <div>{faq.answer}</div>
      </div>
    ))}
  </div>
);

export default FAQs;
