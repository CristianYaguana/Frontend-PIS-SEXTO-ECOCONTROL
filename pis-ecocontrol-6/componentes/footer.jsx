import Head from 'next/head';

const Footer = () => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                {/* Google Fonts */}
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                    crossOrigin="true"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
                {/* Font Awesome Icons */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
                />
                <title>Responsive Footer</title>
            </Head>
            <footer className="bg-blue-800 text-white" style={{ background: 'rgba(37, 94, 142, 1)' }}>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-between gap-8">
                    <div className="flex flex-col">
                        <img
                            src="https://i.ibb.co/rHQrMSt/logo-pis.png"
                            alt="logo"
                            className="mb-4 w-60"
                        />
                        <p>
                            El monitoreo constante de CO2, temperatura y humedad en los espacios de la UNL no solo asegura un entorno óptimo, sino que también promueve un ambiente seguro y productivo para todos.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <ul className="space-y-4">
                            <li><a href="#" className="text-white hover:text-green-400">Principal</a></li>
                            <li><a href="#" className="text-white hover:text-green-400">Reportes</a></li>
                            <li><a href="#" className="text-white hover:text-green-400">Usuarios</a></li>
                            <li><a href="#" className="text-white hover:text-green-400">Sensores</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <p className="mb-4">¿Dudas? Escríbenos</p>
                        <div className="flex items-center space-x-2">
                            <img
                                src="https://cdn.icon-icons.com/icons2/1826/PNG/512/4202011emailgmaillogomailsocialsocialmedia-115677_115624.png"
                                alt="Correo"
                                className="w-5 h-5"
                            />
                            <p className="text-white">ecocontrol@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-900 py-4 text-center" style={{ background: 'rgba(37, 94, 142, 1)' }}>
                    <p className="text-white">ECOCONTROL 2024 - Derechos Reservados</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
