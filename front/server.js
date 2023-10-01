const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
	// Obtén la URL solicitada por el cliente
	const requestUrl = req.url;

	// Mapea la URL a la ruta del sistema de archivos
	const filePath = path.join(__dirname, 'client', requestUrl);

	// Verifica si el archivo existe
	fs.exists(filePath, (exists) => {
		if (exists) {
			// Lee el archivo y lo sirve
			fs.readFile(filePath, (error, content) => {
				if (error) {
					res.writeHead(500);
					res.end('Error interno del servidor');
				} else {
					// Establece el tipo de contenido adecuado según la extensión del archivo
					const extname = path.extname(filePath);
					let contentType = 'text/html';

					switch (extname) {
						case '.js':
							contentType = 'text/javascript';
							break;
						case '.css':
							contentType = 'text/css';
							break;
						// Puedes agregar más tipos de contenido según tus necesidades
					}

					res.writeHead(200, { 'Content-Type': contentType });
					res.end(content, 'utf-8');
				}
			});
		} else {
			// El archivo no existe
			res.writeHead(404);
			res.end('Archivo no encontrado');
		}
	});
});

const puerto = 8000; // Cambia el puerto si lo deseas

server.listen(puerto, () => {
	console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});
