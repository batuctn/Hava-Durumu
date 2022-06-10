import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from "@mui/material";
import AlertDialog from "./alertdialog"



const MediaCard =({})=> {
    const [dataHava,setData]=useState([])
    const [region,setRegion]=useState("")
    const [city,setCity]= useState([])
    const [open, setOpen] = React.useState(false);
    const [selectedCity,setSelectedCity]=useState("Adana")
    const [show,setShow]=useState(false)
    const [selectedData,setSelectedData]=useState({})



    useEffect(()=> {
        setOpen(true)
        axios.get("https://weatherdbi.herokuapp.com/data/weather/"+selectedCity.toLowerCase())
            .then(response=>{
                setRegion(response.data.region)
                setData(response.data.next_days)

            })

            .catch(err=>{console.log(err)})
            .finally(()=>{
                setOpen(false)
        })
    },[selectedCity])

    useEffect(()=>{
        axios.get("https://countriesnow.space/api/v0.1/countries/population/cities").then(response=>{
            let test=[response.data.data]
            setCity(test[0].filter(item=>item.country.toLowerCase()==="turkey"))
        }).catch(err=>{
            console.log(err)
        })
    },[])


    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>


            <div style={{display:"flex",flex:1,justifyContent: "center",    alignItems: "center"}}>
                <h1>{region}</h1>
                <select value={selectedCity} onChange={(e)=>{
                    setSelectedCity(e.target.value)
                }} style={{width:"100px",height:"30px",marginLeft:"5px",borderRadius:"20px"}}>
                    {
                        city.map((item,index)=>{
                            return <option key={index} value={item.city}>{item.city}</option>
                        })
                    }

                </select>
            </div>

            <div style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-around",
                flexWrap: "wrap",
            }} >

                {
                    dataHava.map((item,index)=>{
                        return  (
                            <div key={index} style={{
                                display:"flex",
                                paddingTop:"50px",
                                flexDirection:"column",
                                width:"150px",
                                height:"200px",
                                alignItems:"center",
                                justifyContent:"center",
                                border:"1px solid black",
                                borderRadius:"20px",
                                marginBottom:"10px",

                            }} >
                                <div style={{display:"flex"}}>
                                    <h3>{item.day}</h3>
                                </div>
                                <div style={{display:"flex"}}>
                                    <img  src={item.iconURL} alt={item.day} />
                                </div>
                                <div style={{display:"flex",flex:1,flexDirection:"row",justifyContent: "space-between"  }}>
                                    <div>
                                        {item.max_temp.c} Derece
                                    </div>
                                    <div>
                                        {item.min_temp.c} Derece
                                    </div>
                                </div>
                                 <div>

                                     <Button  onClick={()=>{
                                         setShow(true)
                                         setSelectedData({comment:item.comment})

                                     }}>Comment.</Button>
                                 </div>
                            </div>
                        )
                    })
                }
            </div>
            <AlertDialog comment={selectedData.comment} show={show} handleClose={()=>{
                setShow(false)}
            } />
        </div>

    );
}


export default MediaCard