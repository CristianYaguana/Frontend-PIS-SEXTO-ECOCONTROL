import Head from 'next/head';
import './globals.css';

const Footer = () => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                {/* == google font == */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
                {/* == icon == */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" />
                {/* == css == */}
                <link rel="stylesheet" href="style.css" />
                <title>Responsive Footer</title>
            </Head>
            <footer className="footer">
                <div className="container">
                    <div className="col1">
                        <img src="https://i.ibb.co/rHQrMSt/logo-pis.png" width={600} alt="logo" className="mb-4" />
                    </div>
                    <div className="col2">
                        <p>El monitoreo constante de CO2, temperatura y humedad en los espacios de la UNL no solo asegura un entorno óptimo, sino que también promueve un ambiente seguro y productivo para todos.</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="mekk">
                        <p>ECOCONTROL 2024 - Derechos Reservados</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
