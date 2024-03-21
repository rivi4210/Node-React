import { Button } from "primereact/button";
import Login from "../../Login_register/login";
import {useNavigate } from "react-router-dom";

const ImageBackgroundHome = ({ imageName, children }) => {
    const imageUrl = process.env.PUBLIC_URL + '/' + imageName;
    const navigate=useNavigate()
      
    const backgroundStyle = {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1,
    };
  
    const contentStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
        zIndex: 1,
    };
  
    const buttonStyle = {
        padding: '10px 20px',
        background: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };
    return (
      <div>
        <div style={backgroundStyle} />
        <div style={contentStyle}>
          {children}
          <button style={buttonStyle}  onClick={()=>navigate("/login")} >Login</button>
          {/* <div><Button onClick={()=>navigate("/login")}>Login</Button></div> */}
        </div>
      </div>
    );
  };
  
  export default ImageBackgroundHome;