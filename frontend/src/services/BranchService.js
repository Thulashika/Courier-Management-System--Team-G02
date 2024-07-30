import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function BranchService() {

    const navigate = useNavigate();
    const [data, setData] = useState([])

    const createBranch = () => {
        axios('http://localhost:6431/branch', {
            data:data,
            method:'POST'
        }).then(res => {
            if (res.data.statusCode === 201) {
            // branchCount(res.data.id)
            navigate('/branch')
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

    const getByIdBranch = () => {
        
    }
}

export default BranchService