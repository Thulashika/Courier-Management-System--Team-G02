import React, { useCallback, useEffect, useRef, useState } from 'react'
import { 
  CButton,
  CCard, 
  CCardBody, 
  CCardHeader, 
  CCol, 
  CContainer,
  CRow, 
  CTable, 
  CTableBody, 
  CTableDataCell, 
  CTableHead, 
  CTableHeaderCell, 
  CTableRow, 
  CPagination,
  CPaginationItem,
  CFormInput,
  CCardImage,
  CImage,
  CListGroupItem,
  CListGroup,
  CButtonGroup,
  CProgress,
  CProgressBar,
  CCollapse, } from '@coreui/react'
import axios from 'axios'
import { cilTrash, cilPencil, cilCloudDownload, cilArrowThickToBottom } from '@coreui/icons'
import CIcon  from '@coreui/icons-react'
import { Link } from 'react-router-dom';
import eyeIcon from '../../../assets/images/eye.png'
import QRCodeReader, { QrReader } from 'react-qr-reader';
import { debounce } from 'lodash'
import ReactToPrint from 'react-to-print';
import BarCodeGenerator from './BarCodeGenerator'
import PrintButton from './PrintButton'
import NFP from '../../../assets/images/NoData.png';
// import { Html5QrcodeScanner } from 'html5-qrcode/minified/html5-qrcode.min.js';


const ParcelList = () => {

  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalParcels, setTotalParcels] = useState(0);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  // const [scanner, setScanner] = useState(null);
  // const scannerRef = useRef(null);

  const getStatus = (status) => {
    switch (status) {
      case 'COLLECTED':
        return 'primary'
      case 'ACCEPTED':
        return 'info'
      case 'SHIPPED':
        return 'secondary'
      case 'IN-TRANSIT':
        return 'warning'
      case 'DELIVERED':
        return 'success' 
      default:
        return 'danger'
    }
  }

  useEffect(() => {
    getAll()
    getTotalCount();
  }, [page, limit]);

  useEffect(() => {
    getAll(search);
  }, [search]);

  const getAll = useCallback(
    debounce(async (query) => {
      try {
        const response = await axios.get('http://localhost:6431/parcel', {
          params: { page: page,
                  limit: limit,
                  search: query ? query : {} }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 500), // Debounce delay in milliseconds
    []
  );

  const getTotalCount = () => {
    axios
      .get('http://localhost:6431/parcel/count')
      .then((res) => {
        setTotalParcels(res.data.count);
      })
      .catch((err) => {
        console.error('Error fetching total count:', err);
      });
  };

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      // setData(QRCodeGenerator)
      setShowScanner(false); // Close scanner after successful scan
    }
  };

  // const startScanner = () => {
  //   if (scannerRef.current) {
  //     const html5QrCodeScanner = new Html5QrcodeScanner(
  //       "qr-reader",
  //       { fps: 10, qrbox: 250 },
  //       true
  //     );
  //     html5QrCodeScanner.render(onScanSuccess, onScanError);
  //     setScanner(html5QrCodeScanner);
  //   }
  // };

  // const onScanSuccess = (decodedText, decodedResult) => {
  //   setResult(decodedText);
  //   if (scanner) {
  //     scanner.clear().catch((err) => console.log(err));
  //   }
  // };

  // const onScanError = (errorMessage) => {
  //   console.error(errorMessage);
  // };

  const handleError = (err) => {
    console.error(err);
  };

  const handleQRCodeButtonClick = () => {
    setShowScanner(true); // Show the scanner when the button is clicked
    // setData(QRCodeGenerator)
    // startScanner();
  };

  const handleClick = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this parcel?');

    if(confirmDelete){
      axios(`http://localhost:6431/parcel/${id}`, {
        method:'DELETE'
      }).then(res => {
        alert('Successfully Deleted')
        getAll()
      }).catch(err => {
        alert('Failed to delete the parcel') // Handle error appropriately
      })
    }
  }

  // Calculate the index range for the current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalParcels / limit);

  const [selectedStatus, setSelectedStatus] = useState('All');
  let [filteredData, setFilteredData] = useState(paginatedData);

  // filteredData = selectedStatus === 'All'
  // ? paginatedData
  // : paginatedData.filter(parcel => parcel.status === selectedStatus);


  // Filter data based on selected status
  useEffect(() => {
    if (selectedStatus === 'All') {
      setFilteredData(paginatedData);
    } else {
      setFilteredData(
        paginatedData.filter(parcel =>
          parcel.status.trim().toLowerCase() === selectedStatus.toLowerCase()
        )
      );
    }
  }, [selectedStatus, paginatedData]);

  // Function to get the card color based on status
  const getCardColor = (status) => getStatus[status] || 'secondary';

  // State to manage expanded cards
  const [expandedCard, setExpandedCard] = useState(null);

  // Toggle card expansion
  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };
  
  const [hoveredCard, setHoveredCard] = useState(null);

  const getCardStyle = (index) => ({
    transform: hoveredCard === index ? 'translateY(-5px)' : 'translateY(0)',
    boxShadow: hoveredCard === index ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  });

  const [isTableVisible, setIsTableVisible] = useState(false); // State to manage table visibility

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible); // Toggle table visibility
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className='mb-4'>
          <CCardHeader>
            <strong>Parcels List</strong>
          </CCardHeader>
          <CCardBody>
            <CContainer className='py-3'>
              <CRow className="mb-3">

                {/* <CCol>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <CButton onClick={handleQRCodeButtonClick} className='me-md-2' color='primary' variant='outline'>Scan QR code</CButton>
                  </div>
                </CCol> */}
                
                <CCol>
                  {/* Button to toggle table visibility */}
                  <CButton color='primary' onClick={toggleTableVisibility} variant='outline'>
                    {isTableVisible ? 'Hide Parcels' : 'Show Parcels'}
                  </CButton>
                </CCol>

                {showScanner && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'black' }}>
                    <QrReader
                      onScan={handleScan}
                      onError={handleError}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                )}

                {/* <div id="qr-reader" style={{ width: '100%', height: '400px' }}></div> */}
              
                {result && <div>Scanned QR Code Data: {result}</div>}

                <CCol>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton href='/parcels/new_parcels' className='me-md-2' color='primary' variant='outline'>AddNew</CButton>
                  </div>
                </CCol>
              </CRow>
            </CContainer>

            {/* <CRow className="mb-3">
              <CCol xs={6}>
                  <CFormInput 
                    label='Show entries:' 
                    type='number' 
                    className='w-25' 
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                  />
              </CCol>

              <CCol xs={6}>
                  <CFormInput 
                    label='Search:' 
                    type='text' 
                    className='w-50'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
              </CCol>
            </CRow>

            <CRow className="justify-content-center">
              <CTable className='table' bordered hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope='col'>Id</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Reference Number</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Sender Name</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Sender Date</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Recipient Name</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Recipient Date</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Status</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                {paginatedData.length > 0 ? (
                    paginatedData.map((parcel, index) => (
                      <CTableRow key={index}>
                      <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                        <CTableDataCell>{parcel.referenceNumber}</CTableDataCell>
                        <CTableDataCell>{`${JSON.parse(parcel.senderDetails).firstName} ${JSON.parse(parcel.senderDetails).lastName}`}</CTableDataCell>
                        <CTableDataCell>{parcel.senderDetails ? JSON.parse(parcel.senderDetails).date : ''}</CTableDataCell>
                        <CTableDataCell>{`${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).firstName : ''} ${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).lastName : ''}`}</CTableDataCell>
                        <CTableDataCell>{parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).date : ''}</CTableDataCell>
                        <CTableDataCell> <span className={`badge text-bg-${getStatus(parcel.status)}`}>{parcel.status}</span></CTableDataCell>
                        <CTableDataCell> 
                          <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=view`}>
                            <CButton
                              color='dark'
                              size='sm'
                              variant='ghost'
                              className="me-md-2">
                              <img src={eyeIcon} alt='view' height={20} width={20}/>
                            </CButton>
                          </Link>
                          
                          <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=edit`}>
                            <CButton 
                              color='primary' 
                              size='sm' 
                              variant='ghost' 
                              className="me-md-2">
                                <CIcon icon={cilPencil}/>
                            </CButton>
                            </Link>

                            <CButton
                              color='danger'
                              size='sm'
                              variant='ghost'
                              onClick={() => handleClick(parcel.id)}>
                                <CIcon icon={cilTrash}/>
                            </CButton>

                            <PrintButton id={parcel.id}></PrintButton>

                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ):
                  (
                    <CTableRow>
                      <CTableDataCell colSpan="9">
                        <CImage rounded src={NFP} width={300} height={300} align="center"/>
                      </CTableDataCell>
                    </CTableRow>
                    )}      
                </CTableBody> 
              </CTable>

              { limit >= 1 ? 
                <CRow className="justify-content-end">
                  <CPagination align="end" aria-label="Page navigation">
                    <CPaginationItem disabled={page <= 1} onClick={() => setPage(page - 1)}>
                      Previous
                    </CPaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <CPaginationItem key={i} active={i + 1 === page} onClick={() => setPage(i + 1)}>
                        {i + 1}
                      </CPaginationItem>
                    ))}
                    <CPaginationItem disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                      Next
                    </CPaginationItem>
                  </CPagination>
                </CRow>
              : null }
            </CRow>   */}

      
      <CRow className='mb-3'>
        {/* Conditional rendering of the table based on visibility */}
        {isTableVisible && (
          <CRow className="justify-content-center">
            <CRow className="mb-3">
              <CCol xs={6}>
                <CFormInput 
                  label='Show entries:' 
                  type='number' 
                  className='w-25' 
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </CCol>

              <CCol xs={6}>
                <CFormInput 
                  label='Search:' 
                  type='text' 
                  className='w-50'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </CCol>
            </CRow>

            <CTable className='table' bordered hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope='col'>Id</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Reference Number</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Sender Name</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Sender Date</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Recipient Name</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Recipient Date</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Status</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((parcel, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{startIndex + index + 1}</CTableDataCell> {/*{(page - 1) * limit + index + 1}*/}
                      <CTableDataCell>{parcel.referenceNumber}</CTableDataCell>
                      <CTableDataCell>{`${JSON.parse(parcel.senderDetails).firstName} ${JSON.parse(parcel.senderDetails).lastName}`}</CTableDataCell>
                      <CTableDataCell>{parcel.senderDetails ? JSON.parse(parcel.senderDetails).date : ''}</CTableDataCell>
                      <CTableDataCell>{`${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).firstName : ''} ${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).lastName : ''}`}</CTableDataCell>
                      <CTableDataCell>{parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).date : ''}</CTableDataCell>
                      <CTableDataCell><span className={`badge text-bg-${getStatus(parcel.status)}`}>{parcel.status}</span></CTableDataCell>
                      <CTableDataCell> 
                        <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=view`}>
                          <CButton
                            color='dark'
                            size='sm'
                            variant='ghost'
                            className="me-md-2">
                            <img src={eyeIcon} alt='view' height={20} width={20}/>
                          </CButton>
                        </Link>
                        <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=edit`}>
                          <CButton 
                            color='primary' 
                            size='sm' 
                            variant='ghost' 
                            className="me-md-2">
                            <CIcon icon={cilPencil}/>
                          </CButton>
                        </Link>
                        <CButton
                          color='danger'
                          size='sm'
                          variant='ghost'
                          onClick={() => handleClick(parcel.id)}>
                            <CIcon icon={cilTrash}/>
                        </CButton>
                        <PrintButton id={parcel.id}></PrintButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="9">
                      <CImage rounded src={NFP} width={300} height={300} align="center"/>
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>

            {limit >= 1 && (
              <CRow className="justify-content-end">
                <CPagination align="end" aria-label="Page navigation">
                  <CPaginationItem disabled={page <= 1} onClick={() => setPage(page - 1)}>
                    Previous
                  </CPaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <CPaginationItem key={i} active={i + 1 === page} onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                    Next
                  </CPaginationItem>
                </CPagination>
              </CRow>
            )}
          </CRow>
        )}   
      </CRow>     




{/* <CRow>
  {paginatedData.length > 0 ? (
    paginatedData.map((parcel, index) => {
      const cardColor = getStatus(parcel.status);  // Use a function to get color based on status
      return (
        <CCol sm="4" key={index}>
          <CCard className={`mb-3 text-white bg-${cardColor}`}>
            <CCardHeader>
              <h5>Parcel #{parcel.referenceNumber}</h5>
            </CCardHeader>
            <CCardBody>
              <p><strong>Sender Name:</strong> {`${JSON.parse(parcel.senderDetails).firstName} ${JSON.parse(parcel.senderDetails).lastName}`}</p>
              <p><strong>Sender Date:</strong> {parcel.senderDetails ? JSON.parse(parcel.senderDetails).date : 'N/A'}</p>
              <p><strong>Recipient Name:</strong> {`${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).firstName : ''} ${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).lastName : ''}`}</p>
              <p><strong>Recipient Date:</strong> {parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).date : 'N/A'}</p>
              <p><strong>Status:</strong> <span className={`badge bg-${getStatus(parcel.status)}`}>{parcel.status}</span></p>
              
              <div className="d-flex justify-content-between">
                <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=view`}>
                  <CButton color='dark' size='sm' variant='ghost'>
                    <img src={eyeIcon} alt='view' height={20} width={20} />
                  </CButton>
                </Link>
                <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=edit`}>
                  <CButton color='primary' size='sm' variant='ghost'>
                    <CIcon icon={cilPencil} />
                  </CButton>
                </Link>
                <CButton color='danger' size='sm' variant='ghost' onClick={() => handleClick(parcel.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
                <PrintButton id={parcel.id} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      );
    })
  ) : (
    <CCol>
      <CImage rounded src={NFP} width={300} height={300} align="center" />
    </CCol>
  )}
</CRow> */}

{/* <CRow>
  <CListGroup flush>
    {paginatedData.length > 0 ? (
      paginatedData.map((parcel, index) => (
        <CListGroupItem key={index} className={`bg-${getStatus(parcel.status)} text-white mb-3`}>
          <h5>Parcel #{parcel.referenceNumber}</h5>
          <p><strong>Sender:</strong> {`${JSON.parse(parcel.senderDetails).firstName} ${JSON.parse(parcel.senderDetails).lastName}`}</p>
          <p><strong>Sender Date:</strong> {parcel.senderDetails ? JSON.parse(parcel.senderDetails).date : 'N/A'}</p>
          <p><strong>Recipient:</strong> {`${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).firstName : ''} ${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).lastName : ''}`}</p>
          <p><strong>Recipient Date:</strong> {parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).date : 'N/A'}</p>
          <p><strong>Status:</strong> <span className={`badge bg-${getStatus(parcel.status)}`}>{parcel.status}</span></p>
          
          <div className="d-flex justify-content-between">
            <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=view`}>
              <CButton color='dark' size='sm' variant='ghost'>
                <img src={eyeIcon} alt='view' height={20} width={20} />
              </CButton>
            </Link>
            <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=edit`}>
              <CButton color='primary' size='sm' variant='ghost'>
                <CIcon icon={cilPencil} />
              </CButton>
            </Link>
            <CButton color='danger' size='sm' variant='ghost' onClick={() => handleClick(parcel.id)}>
              <CIcon icon={cilTrash} />
            </CButton>
            <PrintButton id={parcel.id} />
          </div>
        </CListGroupItem>
      ))
    ) : (
      <CListGroupItem>
        <CImage rounded src={NFP} width={300} height={300} align="center" />
      </CListGroupItem>
    )}
  </CListGroup>
</CRow> */}

  {/* Buttons for Status Filter */}
  {/* <CRow className="mb-4">
    <CCol>
      <CButton
        color={selectedStatus === 'All' ? 'primary' : 'secondary'}
        onClick={() => setSelectedStatus('All')}
      >
        All
      </CButton>
      <CButton
        color={selectedStatus === 'Delivered' ? 'primary' : 'secondary'}
        onClick={() => setSelectedStatus('Delivered')}
        className="mx-2"
      >
        Delivered
      </CButton>
      <CButton
        color={selectedStatus === 'Collected' ? 'primary' : 'secondary'}
        onClick={() => setSelectedStatus('Collected')}
      >
        Collected
      </CButton>
      <CButton
        color={selectedStatus === 'Accepted' ? 'primary' : 'secondary'}
        onClick={() => setSelectedStatus('Accepted')}
        className="mx-2"
      >
        Accepted
      </CButton>
      <CButton
        color={selectedStatus === 'In Transit' ? 'primary' : 'secondary'}
        onClick={() => setSelectedStatus('In-Transit')}
      >
        In-Transit
      </CButton>
      <CButton
        color={selectedStatus === 'Shipped' ? 'primary' : 'secondary'}
        onClick={() => setSelectedStatus('Shipped')}
        className="mx-2"
      >
        Shipped
      </CButton>
    </CCol>
  </CRow> */}

  {/* Card Layout */}
  {/* <CRow>
    {filteredData.length > 0 ? (
      filteredData.map((parcel, index) => (
        <CCol sm="4" key={index}>
          <CCard
            className={`mb-4 shadow-sm border-${getCardColor(parcel.status)}`}
          >
            <CCardHeader className={`bg-${getCardColor(parcel.status)} text-white`}>
              <h5>Parcel #{parcel.referenceNumber}</h5>
            </CCardHeader>
            <CCardBody>
              <p>
                <strong>Sender Name:</strong>{' '}
                {`${JSON.parse(parcel.senderDetails).firstName} ${JSON.parse(parcel.senderDetails).lastName}`}
              </p>
              <p>
                <strong>Sender Date:</strong>{' '}
                {parcel.senderDetails ? JSON.parse(parcel.senderDetails).date : 'N/A'}
              </p>
              <p>
                <strong>Recipient Name:</strong>{' '}
                {`${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).firstName : ''} ${
                  parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).lastName : ''
                }`}
              </p>
              <p>
                <strong>Recipient Date:</strong>{' '}
                {parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).date : 'N/A'}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`badge bg-${getCardColor(parcel.status)}`}>{parcel.status}</span>
              </p>

              {parcel.status === 'In Transit' && (
                <CProgress>
                  <CProgressBar value={50} color="info">
                    50% Delivered
                  </CProgressBar>
                </CProgress>
              )}

              <div className="d-flex justify-content-between mt-3">
                <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=view`}>
                  <CButton color="dark" size="sm" variant="ghost">
                    <img src={eyeIcon} alt="view" height={20} width={20} />
                  </CButton>
                </Link>
                <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=edit`}>
                  <CButton color="primary" size="sm" variant="ghost">
                    <CIcon icon={cilPencil} />
                  </CButton>
                </Link>
                <CButton
                  color="danger"
                  size="sm"
                  variant="ghost"
                  onClick={() => handleClick(parcel.id)}
                >
                  <CIcon icon={cilTrash} />
                </CButton>
                <PrintButton id={parcel.id} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      ))
    ) : (
      <CCol>
        <CImage rounded src={NFP} width={300} height={300} align="center" />
      </CCol>
    )}
  </CRow> */}

  {/* <CRow className="mb-4 justify-content-center">
    {['All', 'Delivered', 'Collected', 'Accepted', 'In-Transit', 'Shipped'].map((status) => (
      <CCol key={status} sm="2" className="mb-3">
        <CButton
          color={selectedStatus === status ? 'primary' : 'secondary'}
          className="w-100 text-white"
          onClick={() => setSelectedStatus(status)}
        >
          {status}
        </CButton>
      </CCol>
    ))}
  </CRow> */}

  {/* <CRow className="justify-content-center">
    {filteredData.length > 0 ? (
      filteredData.map((parcel, index) => (
        <CCol sm="4" key={index} className="mb-4">
          <CCard className={`shadow-lg border-${getCardColor(parcel.status)}`}>
            <CCardHeader className={`bg-${getCardColor(parcel.status)} text-white`}>
              <h5>Parcel #{parcel.referenceNumber}</h5>
            </CCardHeader>
            <CCardBody>
              <p><strong>Sender Name:</strong> {`${JSON.parse(parcel.senderDetails).firstName} ${JSON.parse(parcel.senderDetails).lastName}`}</p>
              <p><strong>Sender Date:</strong> {parcel.senderDetails ? JSON.parse(parcel.senderDetails).date : 'N/A'}</p>
              <p><strong>Recipient Name:</strong> {`${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).firstName : ''} ${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).lastName : ''}`}</p>
              <p><strong>Recipient Date:</strong> {parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).date : 'N/A'}</p>
              <p><strong>Status:</strong> <span className={`badge bg-${getCardColor(parcel.status)}`}>{parcel.status}</span></p>

              {parcel.status === 'In Transit' && (
                <CProgress>
                  <CProgressBar value={50} color="info">50% Delivered</CProgressBar>
                </CProgress>
              )}

              <div className="d-flex justify-content-between mt-3">
                <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=view`}>
                  <CButton color="dark" size="sm" variant="ghost">
                    <img src={eyeIcon} alt="view" height={20} width={20} />
                  </CButton>
                </Link>
                <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=edit`}>
                  <CButton color="primary" size="sm" variant="ghost">
                    <CIcon icon={cilPencil} />
                  </CButton>
                </Link>
                <CButton color="danger" size="sm" variant="ghost" onClick={() => handleClick(parcel.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
                <PrintButton id={parcel.id} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      ))
    ) : (
      <CCol className="text-center">
        <CImage rounded src={NFP} width={300} height={300} />
      </CCol>
    )}
  </CRow> */}

  {/* <CRow>
    {paginatedData.length > 0 ? (
      paginatedData.map((parcel, index) => (
        <CCol sm="4" key={index}>
          <CCard className={`mb-3 border-${getStatus(parcel.status)}`}>
            <CCardHeader
              className={`bg-${getStatus(parcel.status)} text-white`}
              onClick={() => toggleCard(index)}
              style={{ cursor: 'pointer' }}
            >
              <h5>Parcel #{parcel.referenceNumber}</h5>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={expandedCard === index}>
                <p><strong>Sender Name:</strong> {`${JSON.parse(parcel.senderDetails).firstName} ${JSON.parse(parcel.senderDetails).lastName}`}</p>
                <p><strong>Sender Date:</strong> {parcel.senderDetails ? JSON.parse(parcel.senderDetails).date : 'N/A'}</p>
                <p><strong>Recipient Name:</strong> {`${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).firstName : ''} ${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).lastName : ''}`}</p>
                <p><strong>Recipient Date:</strong> {parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).date : 'N/A'}</p>
                <p><strong>Status:</strong> <span className={`badge bg-${getStatus(parcel.status)}`}>{parcel.status}</span></p>

                {parcel.status === 'In Transit' && (
                  <CProgress>
                    <CProgressBar value={50} color="info">
                      50% Delivered
                    </CProgressBar>
                  </CProgress>
                )}

                <div className="d-flex justify-content-between mt-3">
                  <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=view`}>
                    <CButton color='dark' size='sm' variant='ghost'>
                      <img src={eyeIcon} alt='view' height={20} width={20} />
                    </CButton>
                  </Link>
                  <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=edit`}>
                    <CButton color='primary' size='sm' variant='ghost'>
                      <CIcon icon={cilPencil} />
                    </CButton>
                  </Link>
                  <CButton color='danger' size='sm' variant='ghost' onClick={() => handleClick(parcel.id)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                  <PrintButton id={parcel.id} />
                </div>
              </CCollapse>
            </CCardBody>
          </CCard>
        </CCol>
      ))
    ) : (
      <CCol>
        <CImage rounded src={NFP} width={300} height={300} align="center" />
      </CCol>
    )}
  </CRow> */}

            <CRow className="mb-4">
              <CCol>
                {['All', 'Delivered', 'Shipped', 'In-Transit', 'Collected', 'Accepted'].map(status => (
                  <CButton
                    key={status}
                    color={selectedStatus === status ? 'dark' : 'secondary'}
                    className="me-2"
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </CButton>
                ))}
              </CCol>
            </CRow>

            <CRow className='justify-content-center'>
              {filteredData.length > 0 ? (
                filteredData.map((parcel, index) => (
                  <CCol sm="4" key={index}>
                    <CCard 
                      className={`mb-3 border-${getStatus(parcel.status)}`} 
                      style={getCardStyle(index)}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <CCardHeader 
                        className={`bg-${getStatus(parcel.status)} text-white`}
                        // onClick={() => toggleCard(index)}
                        // style={{ cursor: 'pointer' }}
                      >
                        <h5>{parcel.referenceNumber}</h5>
                      </CCardHeader>
                      <CCardBody>
                        {/* <CCollapse visible={expandedCard === index}> */}
                        <p><strong>Sender Name:</strong> {`${JSON.parse(parcel.senderDetails).firstName} ${JSON.parse(parcel.senderDetails).lastName}`}</p>
                        <p><strong>Sender Date:</strong> {parcel.senderDetails ? JSON.parse(parcel.senderDetails).date : 'N/A'}</p>
                        <p><strong>Recipient Name:</strong> {`${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).firstName : ''} ${parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).lastName : ''}`}</p>
                        <p><strong>Recipient Date:</strong> {parcel.recipientDetails ? JSON.parse(parcel.recipientDetails).date : 'N/A'}</p>
                        <p><strong>Status:</strong> <span className={`badge bg-${getStatus(parcel.status)}`}>{parcel.status}</span></p>
                        {/* Optional Progress Bar */}
                        {/* {parcel.status === 'In Transit' && (
                          <CProgress>
                            <CProgressBar value={50} color="info">50% Delivered</CProgressBar>
                          </CProgress>
                        )} */}
                        <div className="d-flex justify-content-between mt-3">
                          <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=view`}>
                            <CButton color='dark' size='sm' variant='ghost'>
                              <img src={eyeIcon} alt='view' height={20} width={20} />
                            </CButton>
                          </Link>
                          <Link to={`/parcels/editViewParcel?id=${parcel.id}&type=edit`}>
                            <CButton color='primary' size='sm' variant='ghost'>
                              <CIcon icon={cilPencil} />
                            </CButton>
                          </Link>
                          <CButton color='danger' size='sm' variant='ghost' onClick={() => handleClick(parcel.id)}>
                            <CIcon icon={cilTrash} />
                          </CButton>
                          <PrintButton id={parcel.id} />
                        </div>
                        {/* </CCollapse> */}
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))
              ) : (
                <CCol>
                  <CImage rounded src={NFP} width={300} height={300} align="center" />
                </CCol>
              )}
            </CRow>



          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ParcelList
