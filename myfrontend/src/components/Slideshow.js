import React, { useState, useEffect, useContext } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Font, { Text } from 'react-font'
import './mycss.css'
function Slideshow() {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
    return (
        <div >
          <Font family='Karantina'>
            <h1 style={{marginLeft:"41.5%", marginTop:"2%"}}>Featured Images</h1>
            <h1 style={{borderTop:"1px solid", width:"178px", marginLeft:"41%", marginTop:"-9px"}}></h1>
            <h1 style={{borderTop:"1px solid", width:"120px", marginLeft:"43%"}}></h1>
          </Font>
          <div style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid"}}>
            <Carousel style={{height:"30%", width:"60%", marginLeft:"20%"}} activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='/content/BBSS22.jpg'
          alt="First slide"
          style={{height:"400px", width:"800px"}}
        />
        <Carousel.Caption>
          <h3>Bike Arena 1</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='/content/BikeSS1.jpg'
          alt="Second slide"
          style={{height:"400px", width:"800px"}}
        />

        <Carousel.Caption>
          <h3>Bike Arena 2</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='/content/BBS3.jpg'
          alt="Third slide"
          style={{height:"400px", width:"800px"}}
        />

        <Carousel.Caption>
          <h3>Bike Arena 3</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    <br></br>
    <Font family='Karantina'>
    <h1 style={{marginLeft:"41.5%"}}>Featured Brands</h1>
    <h1 style={{borderTop:"1px solid", width:"178px", marginLeft:"41%", marginTop:"-9px"}}></h1>
    <h1 style={{borderTop:"1px solid", width:"120px", marginLeft:"43%"}}></h1>

    </Font>
    <div style={{ textAlign:"center", marginLeft:"0%"}}>
        <div style={{display:'inline-block'}}>
            <img
            src='https://bikebazaar.pk/assets/honda.png'
            />
            <Font family='Karantina'>
                <h1 >Honda</h1>
                </Font>
        </div>
    
        <div style={{display:'inline-block',marginLeft:"2%"}} >
            <img
            src='https://bikebazaar.pk/assets/suzuki.png'
            />
            <Font family='Karantina'>
                <h1 >Suzuki</h1>
                </Font>
        </div>
        <div style={{display:'inline-block',marginLeft:"2%"}} >
            <img
            height="100px" width="100px"
            src='https://bikebazaar.pk//uploads/2019/04/20/sub/400x400_1555766110.jpeg'
            />
            <Font family='Karantina'>
                <h1 >Yamaha</h1>
                </Font>
        </div>
        <div style={{display:'inline-block',marginLeft:"2%"}} >
            <img
            height="100px" width="100px"
            src='https://bikebazaar.pk//uploads/2019/04/20/sub/400x400_1555766860.jpeg'
            />
            <Font family='Karantina'>
                <h1 >Road Prince</h1>
                </Font>
        </div>
        <div style={{display:'inline-block',marginLeft:"2%"}} >
            <img
            height="100px" width="100px"
            src='https://bikebazaar.pk//uploads/2019/11/15/sub/400x400_1573815027.jpeg'
            />
            <Font family='Karantina'>
                <h1 >Super Power</h1>
                </Font>
        </div>
        <div style={{display:'inline-block',marginLeft:"2%"}} >
            <img
            height="100px" width="100px"
            src='https://bikebazaar.pk//uploads/2019/04/20/sub/400x400_1555765428.jpeg'
            />
            <Font family='Karantina'>
                <h1 >Crown</h1>
                </Font>
        </div>

    
    </div>
    
    
        </div>
        
    )
}

export default Slideshow
