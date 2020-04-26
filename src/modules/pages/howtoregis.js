import React, { useState, useCallback, useEffect } from 'react';

//import Component ที่ต้องใช้
import MyNavbar from '../components/navbar/MyNavbar.js';
import '../components/text.css';
import '../css/App.css';
import { Container, Row, Col } from 'reactstrap';
import CarouselHowtoRsg from '../components/HowtoregisterPage/SlideShow.js'
import { useCookies } from 'react-cookie';

// ตัวแปรสำหรับตั้งค่า css
var colorheader ={
  // color: '#ffffff',
  padding: 20
}

//สร้าง component ชื่อ howtoregis โดยให้รับตัวแปรมาเป็น props ด้วย (React Hook)
const howtoregis = (props) => {
  	//ประกาศตัวแปรที่จำเป็นต้องใช้ใน component นี้
  const [cookies, setCookie, removeCookie] = useCookies(['theme']);
  const [theme,setTheme] = useState(props.theme);
  const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

  // สร้าง callback function สำหรับการเปลี่ยนแปลง theme
  const handleNavbarThemeChange = useCallback((current_theme) => {
    setNavbarTheme(current_theme);
    setTheme('theme_'+current_theme);
    props.onChangeTheme('theme_'+current_theme);
  },[setNavbarTheme,setTheme]);

  // update theme ด้วย cookie
  useEffect(() => {
      handleNavbarThemeChange(cookies.theme);
  },[cookies.theme]);


	// Render ออกไปเป็น html
  return (
      <div>
          <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>      
    <div className="textcenter">
    <Container className="container" fluid="true">
        <Row> {/* Centre */}
        <Col>
            <div className="textsize">
            <h1 style={colorheader}>HOW TO REGISTER</h1>
            </div>
            <CarouselHowtoRsg/>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
      );
    }
    
    // export เพื่อให้สามารถเรียกใช้ component นี้ได้ในที่อื่นโดยการ import
    export default howtoregis;