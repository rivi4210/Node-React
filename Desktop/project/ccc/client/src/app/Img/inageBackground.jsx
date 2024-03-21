import { Button } from "primereact/button";
import Login from "../../Login_register/login";
import {useNavigate } from "react-router-dom";

const ImageBackground = ({ imageName, children }) => {
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
  
 
    return (
      <div>
        <div style={backgroundStyle} />
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    );
  };
  
  export default ImageBackground;