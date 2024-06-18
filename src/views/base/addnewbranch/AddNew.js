import React, { useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { DocsExample } from '../../../components'

const AddNew = () => {
  const [branch, setBranch] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <CRow>
      VIII
      <CCol>
        <CCard>
          <CCardHeader>
            <strong>New Branch</strong>
          </CCardHeader>
          <form>
            <div className="mb-2">
              <label htmlFor="">Branch Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                onChange={(e) => setBranch({ ...branch, [e.target.id]: e.target.value })}
              />
              <span>
                <label htmlFor="">City</label>
                <input
                  type="text"
                  id="City"
                  className="form-control"
                  onChange={(e) => setBranch({ ...branch, City: e.target.value })}
                />
              </span>
            </div>
            <div className="mb-2">
              <label htmlFor="">Thana</label>
              <input
                type="text"
                id="Thana"
                className="form-control"
                onChange={(e) => setBranch({ ...branch, Thana: e.target.value })}
              />

              <span>
                <label htmlFor="">Zip Code/ Postal Code</label>
                <input
                  type="text"
                  id="Code"
                  className="form-control"
                  onChange={(e) => setBranch({ ...branch, Code: e.target.value })}
                />
              </span>
            </div>
            <div className="mb-2">
              <label htmlFor="">Country</label>
              <input
                type="text"
                id="Country"
                className="form-control"
                onChange={(e) => setBranch({ ...branch, Country: e.target.value })}
              />
              <span>
                <label htmlFor="">Contact #</label>
                <input
                  type="number"
                  id="Contact"
                  className="form-control"
                  onChange={(e) => setBranch({ ...branch, Contact: e.target.value })}
                />
              </span>
            </div>
            <button type="submit" className="btn btn-success bg-primary">
              Save
            </button>
            <button type="submit" className="btn btn-success bg-primary">
              Cancel
            </button>
          </form>
        </CCard>
      </CCol>
    </CRow>

    // <CRow>
    //   <CCol xs={12}>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>New Branch</strong>
    //       </CCardHeader>
    //       {/* <CCardBody>
    //         <p className="text-body-secondary small">
    //           Click the accordions below to expand/collapse the accordion content.
    //         </p>
    //         <DocsExample href="components/accordion">
    //           <CAccordion activeItemKey={2}>
    //             <CAccordionItem itemKey={1}>
    //               <CAccordionHeader>Accordion Item #1</CAccordionHeader>
    //               <CAccordionBody>
    //                 <strong>This is the first item&#39;s accordion body.</strong> It is hidden by
    //                 default, until the collapse plugin adds the appropriate classes that we use to
    //                 style each element. These classes control the overall appearance, as well as the
    //                 showing and hiding via CSS transitions. You can modify any of this with custom
    //                 CSS or overriding our default variables. It&#39;s also worth noting that just
    //                 about any HTML can go within the <code>.accordion-body</code>, though the
    //                 transition does limit overflow.
    //               </CAccordionBody>
    //             </CAccordionItem>
    //             <CAccordionItem itemKey={2}>
    //               <CAccordionHeader>Accordion Item #2</CAccordionHeader>
    //               <CAccordionBody>
    //                 <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
    //                 default, until the collapse plugin adds the appropriate classes that we use to
    //                 style each element. These classes control the overall appearance, as well as the
    //                 showing and hiding via CSS transitions. You can modify any of this with custom
    //                 CSS or overriding our default variables. It&#39;s also worth noting that just
    //                 about any HTML can go within the <code>.accordion-body</code>, though the
    //                 transition does limit overflow.
    //               </CAccordionBody>
    //             </CAccordionItem>
    //             <CAccordionItem itemKey={3}>
    //               <CAccordionHeader>Accordion Item #3</CAccordionHeader>
    //               <CAccordionBody>
    //                 <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
    //                 default, until the collapse plugin adds the appropriate classes that we use to
    //                 style each element. These classes control the overall appearance, as well as the
    //                 showing and hiding via CSS transitions. You can modify any of this with custom
    //                 CSS or overriding our default variables. It&#39;s also worth noting that just
    //                 about any HTML can go within the <code>.accordion-body</code>, though the
    //                 transition does limit overflow.
    //               </CAccordionBody>
    //             </CAccordionItem>
    //           </CAccordion>
    //         </DocsExample>
    //       </CCardBody> */}
    //     </CCard>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Accordion</strong> <small>Flush</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           Add <code>flush</code> to remove the default <code>background-color</code>, some
    //           borders, and some rounded corners to render accordions edge-to-edge with their parent
    //           container.
    //         </p>
    //         <DocsExample href="components/accordion#flush">
    //           <CAccordion flush>
    //             <CAccordionItem itemKey={1}>
    //               <CAccordionHeader>Accordion Item #1</CAccordionHeader>
    //               <CAccordionBody>
    //                 <strong>This is the first item&#39;s accordion body.</strong> It is hidden by
    //                 default, until the collapse plugin adds the appropriate classes that we use to
    //                 style each element. These classes control the overall appearance, as well as the
    //                 showing and hiding via CSS transitions. You can modify any of this with custom
    //                 CSS or overriding our default variables. It&#39;s also worth noting that just
    //                 about any HTML can go within the <code>.accordion-body</code>, though the
    //                 transition does limit overflow.
    //               </CAccordionBody>
    //             </CAccordionItem>
    //             <CAccordionItem itemKey={2}>
    //               <CAccordionHeader>Accordion Item #2</CAccordionHeader>
    //               <CAccordionBody>
    //                 <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
    //                 default, until the collapse plugin adds the appropriate classes that we use to
    //                 style each element. These classes control the overall appearance, as well as the
    //                 showing and hiding via CSS transitions. You can modify any of this with custom
    //                 CSS or overriding our default variables. It&#39;s also worth noting that just
    //                 about any HTML can go within the <code>.accordion-body</code>, though the
    //                 transition does limit overflow.
    //               </CAccordionBody>
    //             </CAccordionItem>
    //             <CAccordionItem itemKey={3}>
    //               <CAccordionHeader>Accordion Item #3</CAccordionHeader>
    //               <CAccordionBody>
    //                 <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
    //                 default, until the collapse plugin adds the appropriate classes that we use to
    //                 style each element. These classes control the overall appearance, as well as the
    //                 showing and hiding via CSS transitions. You can modify any of this with custom
    //                 CSS or overriding our default variables. It&#39;s also worth noting that just
    //                 about any HTML can go within the <code>.accordion-body</code>, though the
    //                 transition does limit overflow.
    //               </CAccordionBody>
    //             </CAccordionItem>
    //           </CAccordion>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //     <CCard className="mb-4">
    //       <CCardHeader>
    //         <strong>React Accordion</strong> <small>Always open</small>
    //       </CCardHeader>
    //       <CCardBody>
    //         <p className="text-body-secondary small">
    //           Add <code>alwaysOpen</code> property to make accordion items stay open when another
    //           item is opened.
    //         </p>
    //         <DocsExample href="components/accordion#flush">
    //           <CAccordion alwaysOpen>
    //             <CAccordionItem itemKey={1}>
    //               <CAccordionHeader>Accordion Item #1</CAccordionHeader>
    //               <CAccordionBody>
    //                 <strong>This is the first item&#39;s accordion body.</strong> It is hidden by
    //                 default, until the collapse plugin adds the appropriate classes that we use to
    //                 style each element. These classes control the overall appearance, as well as the
    //                 showing and hiding via CSS transitions. You can modify any of this with custom
    //                 CSS or overriding our default variables. It&#39;s also worth noting that just
    //                 about any HTML can go within the <code>.accordion-body</code>, though the
    //                 transition does limit overflow.
    //               </CAccordionBody>
    //             </CAccordionItem>
    //             <CAccordionItem itemKey={2}>
    //               <CAccordionHeader>Accordion Item #2</CAccordionHeader>
    //               <CAccordionBody>
    //                 <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
    //                 default, until the collapse plugin adds the appropriate classes that we use to
    //                 style each element. These classes control the overall appearance, as well as the
    //                 showing and hiding via CSS transitions. You can modify any of this with custom
    //                 CSS or overriding our default variables. It&#39;s also worth noting that just
    //                 about any HTML can go within the <code>.accordion-body</code>, though the
    //                 transition does limit overflow.
    //               </CAccordionBody>
    //             </CAccordionItem>
    //             <CAccordionItem itemKey={3}>
    //               <CAccordionHeader>Accordion Item #3</CAccordionHeader>
    //               <CAccordionBody>
    //                 <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
    //                 default, until the collapse plugin adds the appropriate classes that we use to
    //                 style each element. These classes control the overall appearance, as well as the
    //                 showing and hiding via CSS transitions. You can modify any of this with custom
    //                 CSS or overriding our default variables. It&#39;s also worth noting that just
    //                 about any HTML can go within the <code>.accordion-body</code>, though the
    //                 transition does limit overflow.
    //               </CAccordionBody>
    //             </CAccordionItem>
    //           </CAccordion>
    //         </DocsExample>
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    // </CRow>
  )
}

export default AddNew
