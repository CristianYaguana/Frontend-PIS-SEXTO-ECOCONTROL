import Head from 'next/head';

const Footer = () => {
    return (
        <>
        <Head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Ecocontrol</title>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
        </Head>

        <style jsx>{`
           *,
::before,
::after {
box-sizing: border-box;
}
body {
background: url(bg.png);
background-size: cover;
background-repeat: no-repeat;
background-attachment: fixed;
}
.unstyled {
list-style: none;
padding: 0;
margin: 0;
}
.unstyled a {
text-decoration: none;
}
.list-inline {
overflow: hidden;
}
.list-inline li {
float: left;
}
footer {
position: fixed;
left: 0;
bottom: 0;
width: 100%;
background: #0d60ef;
color: #dfdbd9;
}
.menu-btn {
cursor: pointer;
color: #dfdbd9;
font-size: 1.5rem;
padding: 1rem;
}
.wrapper {
display: flex;
justify-content: center;
align-items: center;
height: 100px; /* Adjust as needed */
}
.wrapper ul {
display: flex;
list-style: none;
margin: 0;
padding: 0;
}
.wrapper ul li {
margin: 0 10px;
}
.wrapper ul li a {
color: #dfdbd9;
text-decoration: none;
transition: color 0.3s ease;
}
.wrapper ul li a:hover {
color: #fff;
}
.center-text {
text-align: center;
}
        `}</style>
        
        <footer>
            
            <label htmlFor="active" className="menu-btn"><i className="fa-solid fa-bars"></i></label>
            
            <div className="wrapper">
            <img src="https://i.ibb.co/rHQrMSt/logo-pis.png" width={300} alt="logo" className="mb-4" />
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Gallery</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            <img src="https://siaaf.unl.edu.ec/static/img/logo.png" width={250} alt="logo" className="mb-4" />
            </div>
            <p className="center-text">&copy; 2024 EcoControl. Todos los derechos reservados.</p>
            <div className="content"></div>
        </footer>
    </>
    );
};

export default Footer;
