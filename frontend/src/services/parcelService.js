import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ParcelService = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([])

    const createParcel = (data) => {
        axios
        .post('http://localhost:6431/parcel', data)
        .then((res) => {
          if (res.data.statusCode === 201) {
            alert('Created Successfully')
            navigate('/parcels');
          } else {
            alert('Not created successfully');
          }
        })
        .catch((err) => {
          if (err.response?.data?.statusCode === 500) {
            alert(err.response.data.statusMessage);
            return;
          }
          alert('Created not successfully');
        });
    }

    // const getByIdParcel = () => {
    //     axios(`http://localhost:6431/parcel/${query.get('id')}`, {
    //         method: 'get'
    //       }).then(res => {
    //         const data = res.data;
    //         if (Array.isArray(data.parcelDetails)) {
    //           setData(data);
    //         } else {
    //           setData({
    //             ...data,
    //             parcelDetails: data.parcelDetails // or handle the error accordingly
    //           });
    //         }
    //       });
    // }

    // const deleteParcel = () => {
    //     axios(`http://localhost:6431/parcel/${id}`, {
    //         method:'DELETE'
    //       }).then(res => {
    //         alert('Successfully Deleted')
    //         // getAll()
    //       }).catch(err => {
    //         alert('Failed to delete the parcel') // Handle error appropriately
    //       })
    // }

    // const updateParcel = () => {
    //     axios
    //     .put(`http://localhost:6431/parcel/${query.get('id')}`, data)
    //     .then((res) => {
    //       if (res.data.statusCode === 201) {
    //         alert('Updated successfully')
    //         navigate('/parcels');
    //       } else {
    //         alert('Not updated successfully');
    //       }
    //     })
    //     .catch((err) => {
    //       if (err.response?.data?.statusCode === 500) {
    //         alert(err.response.data.statusMessage);
    //         return;
    //       }
    //       alert('Updated not successfully');
    //     });
    // }
}

export default ParcelService;
