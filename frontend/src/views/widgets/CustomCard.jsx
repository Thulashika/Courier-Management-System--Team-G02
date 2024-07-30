import { CCard, CCardBody, CCardImage, CCardText, CCol, CRow } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types';

const CustomCard = (props) => {

    const { source, sourceCount, text } = props;

  return (
    <>
        <CRow xs={{ cols: 1, gutter: 10 }} md={{ cols: 3 }} className='mb-4 '>
            <CCol xs>
                <CCard className="card mb-3" style={{width: '18rem' }}>
                <CRow className="g-0">
                    <CCol md={5}>
                    <CCardImage src={source} height={150}/>
                    </CCol>
                    <CCol md={7}>
                    <CCardBody>
                        <CCardText>
                        <div className="card-body">
                            <h1 className="card-title">{sourceCount}</h1>
                            <p className="card-text">{ text }</p>
                        </div>
                        </CCardText>
                    </CCardBody>
                    </CCol>
                </CRow>
                </CCard>
            </CCol>
        </CRow>
    </>
  )
}

CustomCard.propTypes = {
    source: PropTypes.string.isRequired,
    sourceCount: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default CustomCard;