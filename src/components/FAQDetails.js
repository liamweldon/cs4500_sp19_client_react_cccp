import React from 'react'
import {Link} from 'react-router-dom';
import './FAQDetails.scss'
const FAQDetails = ({faqs, faq, selectFAQ, addFAQ, deleteFAQ, updateFAQ, setFAQ}) => (

            <div className="faqdetails">
                <h3>FAQ Details</h3>
                <select
                    value={faq.id}
                    onChange={(e) => selectFAQ(e.target.value)}
                    className="form-control">
                    {
                        faqs
                            .map(q =>
                                <option
                                    value={q.id}
                                    key={q.id}>
                                    {q.id}
                                </option>
                            )
                    }
                </select>
                <label>Title</label>
                <input
                    value={faq.title}
                    className="form-control"
                    onChange={(e) => {
                        let newFaq = faq;
                        newFaq.title = e.target.value;
                        setFAQ(newFaq)}}>
                </input>
                <label>Question</label><br/>
                <input
                    onChange={(e) => {
                        let newFaq = faq;
                        newFaq.question = e.target.value;
                        setFAQ(newFaq)}}
                    className="form-control"
                    value={faq.question}/>
                  <Link to={`/admin/faqs`}>                
                <button
                    onClick={() => {
                    }}
                  >
                   <i className="fas fa-arrow-left" />
                  </button>
                  </Link>
                  <button onClick={deleteFAQ}>
                    <i className="fas fa-trash-alt" />
                </button>
                  <button
                    onClick={() => {}}
                  >
                    <i className="fas fa-search" />
                  </button>
                  <button
                    onClick={addFAQ}
                  >
                    <i className="fas fa-plus-square" />
                  </button>
                  <button
                    onClick={updateFAQ}
                  >
                    <i className="fas fa-check-square" />
                  </button>
                  
            </div>
        )
export default FAQDetails;
