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
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
} from '@coreui/react'
import { DocsExample } from '../../../components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BRANCH_ERRORS } from '../../../const'

const AddNew = () => {

  const [branch, setBranch] = useState({
    branchCode:'',
    branchName:'',
    branchAddress:'',
    city:'',
    contactNumber:'',
    zipCode:''
  })

  const navigate = useNavigate()


  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsValid(true)

    // const BCregex = /^(?:Br)?[A-z]{2}?[0-9]{2}$/;  
    const BCregex = /^(?:BR)?[0-9]{3}$/;  

    if(branch.branchCode.length !== 5) {
      setError(BRANCH_ERRORS.CODE_LENGTH_VALIDATION)
      setIsValid(false)
      return
    }

    if (!BCregex.test(branch.branchCode)){
      setError(BRANCH_ERRORS.CODE_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }

    const CNregex = /^(?:0)?[7][01245678][0-9]{7}$/;
    
    if (branch.contactNumber.length !== 10) {
      setError(BRANCH_ERRORS.CONTACTNUMBER_LENGTH_VALIDATION);
      setIsValid(false);
      return;
    }

    if (!CNregex.test(branch.contactNumber)){
      setError(BRANCH_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }

    // Validate zip code (assuming it should be a 5-digit number)
    const ZCodeRegex = /^[0-9]{5}$/;

    if(branch.zipCode.length !== 5) {
      setError(BRANCH_ERRORS.ZIPCODE_LENGTH_VALIDATION);
      setIsValid(false);
      return;
    }

    if (!ZCodeRegex.test(branch.zipCode)){
      setError(BRANCH_ERRORS.ZIPCODE_FORMAT_VALIDATION);
      setIsValid(false);
      return;;
    }

    if(isValid) {
      axios('http://localhost:6431/createBranch', {
        data:branch,
        method:'POST'
      }).then(res => {
        if (res.data.statusCode === 201) {
          navigate('/')
        } else {
          alert("Not created successfully")
        }
      }).catch(err => {
        if(err.response?.data?.statusCode === 500) {
          alert(err.response.data.statusMessage)
          return
        }
        alert("Created not successfully")
      })
    }

  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <strong>New Branch</strong>
          </CCardHeader>
          <CForm className="row g-3" onSubmit={handleSubmit}>
            <CRow className="mb-5"></CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputCode">Branch Code</CFormLabel>
              <CCol xs="auto">
                <CFormInput 
                  type='text' 
                  id='code' 
                  className='form-control'
                  onChange={(e) => setBranch({ ...branch, branchCode: e.target.value })}
                  required
                />
              </CCol>
              {!isValid && error === BRANCH_ERRORS.CODE_LENGTH_VALIDATION && <p>{error}</p>}
              {!isValid && error === BRANCH_ERRORS.CODE_FORMAT_VALIDATION && <p>{error}</p>}
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputCode">Branch Name</CFormLabel>
              <CCol xs="auto">
                <CFormInput 
                  type='text' 
                  id='name' 
                  className='form-control'
                  onChange={(e) => setBranch({ ...branch, branchName: e.target.value })}
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputAddress">Branch Address</CFormLabel>
              <CCol xs="auto">
                <CFormInput 
                  type='text' 
                  id='address'
                  className='form-control'
                  onChange={(e) => setBranch({ ...branch, branchAddress: e.target.value })}
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputCity">City</CFormLabel>
              <CCol xs="auto">
                <CFormInput 
                  type='text' 
                  id='city'
                  className='form-control'
                  onChange={(e) => setBranch({ ...branch, city: e.target.value })}
                  required
                />
              </CCol>
            </CRow>
            
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputAddress">Contact Number</CFormLabel>
              <CCol xs="auto">
                <CFormInput 
                  type='text' 
                  id='contactNumber'
                  className='form-control'
                  onChange={(e) => setBranch({ ...branch, contactNumber: e.target.value })}
                  required
                />
              </CCol>
              {!isValid && error === BRANCH_ERRORS.CONTACTNUMBER_LENGTH_VALIDATION && <p>{error}</p>}
              {!isValid && error === BRANCH_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION && <p>{error}</p>}
            </CRow>
           
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputAddress">Zip Code/ Postal Code</CFormLabel>
              <CCol xs="auto">
                <CFormInput 
                  type='text' 
                  id='zipCode'
                  className='form-control'
                  onChange={(e) => setBranch({ ...branch, zipCode: e.target.value })}
                  required
                />
              </CCol>
              {!isValid && error === BRANCH_ERRORS.ZIPCODE_LENGTH_VALIDATION && <p>{error}</p>}
              {!isValid && error === BRANCH_ERRORS.ZIPCODE_FORMAT_VALIDATION && <p>{error}</p>}
            </CRow>


            <CRow>
              <CCol xs='auto'>
                <CButton color='primary' type='submit' className='mb-3'>Save</CButton>
              </CCol>
              <CCol xs='auto'>
                <CButton color='secondary' type='submit' className='mb-3'>Cancel</CButton>
              </CCol>
            </CRow>
          </CForm>
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
