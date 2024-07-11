import Head from 'next/head';

const Footer = () => {
    return (
        <>
            <style jsx>{`
            * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Poppins", sans-serif;
    background: #333;
    padding-bottom: 120px; /* Ajusta el valor según el tamaño de tu footer */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

h1 {
    color: #fff;
    text-align: center;
    margin: 3em 0;
    font-size: 3em;
}

main {
    flex: 1;
}

footer {
    width: 100%;
    background: rgba(37, 94, 142, 1);
    color: #fff;
}

footer .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2em;
    display: flex;
    justify-content: space-between;
    gap: 2em;
}

.brand {
    font-size: 1.8em;
    font-weight: 600;
    margin-bottom: 1em;
}

.media-icons a {
    font-size: 1.1em;
    width: 2em;
    height: 2em;
    border: 1px #fff solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    color: #fff;
    text-decoration: none;
}

.media-icons a:hover {
    background: #fff;
    color: #111;
}

.services-icons a {
    font-size: 1.6em;
}

.services-icons a:hover {
    color: #94fbab;
}

.footer-bottom {
    display: flex;
    justify-content: center;
    border-top: 1px solid rgba(138, 208, 153, 0.36);
    padding: 2em;
}

.footer .menu {
    margin-bottom: 1em;
}

.footer .menu li {
    display: inline-block;
    margin: 0 0.7em 0.7em 0;
    text-align: center;
}

.footer .menu a {
    transition: 0.3s;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
}

.footer .menu a:hover {
    color: #94fbab;
}

.input-wrap {
    margin: 1em 0;
    display: flex;
}

.input-wrap input {
    padding: 0.5em;
    border: none;
    background: #20232a;
    color: #ccc;
}

.input-wrap input:focus {
    outline: none;
}

.input-wrap button {
    padding: 0.8em;
    background: #94fbab;
    border: none;
    color: #217634;
    transition: 0.3s;
}

.input-wrap button:hover {
    background: #fff;
    color: #111;
}

/* == responsive == */
@media screen and (max-width: 900px) {
    .footer .container {
        flex-direction: column;
    }
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Poppins", sans-serif;
    background: #333;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

h1 {
    color: #fff;
    text-align: center;
    margin: 3em 0;
    font-size: 3em;
}

main {
    flex: 1;
    padding-bottom: 20px; /* Ajusta este valor según el espacio deseado */
}

footer {
    width: 100%;
    background: rgba(37, 94, 142, 1);
    color: #fff;
}

footer .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2em;
    display: flex;
    justify-content: space-between;
    gap: 2em;
}

.brand {
    font-size: 1.8em;
    font-weight: 600;
    margin-bottom: 1em;
}

.media-icons a {
    font-size: 1.1em;
    width: 2em;
    height: 2em;
    border: 1px #fff solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    color: #fff;
    text-decoration: none;
}

.media-icons a:hover {
    background: #fff;
    color: #111;
}

.services-icons a {
    font-size: 1.6em;
}

.services-icons a:hover {
    color: #94fbab;
}

.footer-bottom {
    display: flex;
    justify-content: center;
    border-top: 1px solid rgba(138, 208, 153, 0.36);
    padding: 2em;
}

.footer .menu {
    margin-bottom: 1em;
}

.footer .menu li {
    display: inline-block;
    margin: 0 0.7em 0.7em 0;
    text-align: center;
}

.footer .menu a {
    transition: 0.3s;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
}

.footer .menu a:hover {
    color: #94fbab;
}

.input-wrap {
    margin: 1em 0;
    display: flex;
}

.input-wrap input {
    padding: 0.5em;
    border: none;
    background: #20232a;
    color: #ccc;
}

.input-wrap input:focus {
    outline: none;
}

.input-wrap button {
    padding: 0.8em;
    background: #94fbab;
    border: none;
    color: #217634;
    transition: 0.3s;
}

.input-wrap button:hover {
    background: #fff;
    color: #111;
}

/* == responsive == */
@media screen and (max-width: 900px) {
    .footer .container {
        flex-direction: column;
    }
}
               
            `}</style>
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
                        <ul className="menu">
                            <li><a href="#">Principal</a></li>
                            <li><a href="#">Reportes</a></li>
                            <li><a href="#">Usuarios</a></li>
                            <li><a href="#">Sensores</a></li>
                        </ul>
                        <p>El monitoreo constante de CO2, temperatura y humedad en los espacios de la UNL no solo asegura un entorno óptimo, sino que también promueve un ambiente seguro y productivo para todos.</p>
                    </div>
                    <div className="col3">
                        <p>¿Dudas? Escribenos</p>
                        <form>
                            <div className="input-wrap">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="https://cdn.icon-icons.com/icons2/1826/PNG/512/4202011emailgmaillogomailsocialsocialmedia-115677_115624.png" alt="Correo" width="20" height="20" style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                                    <p style={{ margin: '0' }}>ecocontrol@gmail.com</p>
                                </div>
                            </div>
                        </form>
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
