import React, { useState } from 'react';
import '../../Css/accordion.css';

const Accordion = ({accordionData, handleAccordionClick }) =>{
  const [openTab, setOpenTab] = useState(null);
  const [selectedInnerTab, setSelectedInnerTab] = useState(null);

  const toggleTab = (tabId) => {
    if (openTab === tabId) {
      setOpenTab(null);
    } else {
      setOpenTab(tabId);
    }
  };

  const handleInnerTabClick = (innerTabId) => {
    setSelectedInnerTab(innerTabId); 
    handleAccordionClick(innerTabId);
  };

  return (
    <div className="custom-accordion">
      {accordionData.map((outerTab) => (
        <div key={outerTab.id} className="accordion">
          <div
            className={`accordion-header flex justify-between items-center`}
            onClick={() => toggleTab(outerTab.id)}
          >
            {outerTab.title} <span className={`fa fa-caret-up ${openTab === outerTab.id ? 'down' : 'up'}`}></span>
          </div>
          {openTab === outerTab.id && (
            <div className={`accordion-content ${openTab === outerTab.id?'scalestart':'scaleend'}`}>
              {outerTab.innerTabs?.map((innerTab, index) => (
                <div className='outer flex items-center'>
                  <div key={innerTab.id} className={`inner-tab px-2 ${innerTab.id === selectedInnerTab ? 'selected' : ''}`}
                    onClick={() => handleInnerTabClick(innerTab.id)}
                    style={{ cursor: "pointer" }}>
                    <span className={`px-4 dash ${innerTab.id === selectedInnerTab ? 'selected' : ''}`}>
                    -
                    </span>
                    {innerTab.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
