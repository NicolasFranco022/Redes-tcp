const net = require('net');

const HOST = 'localhost';
const PORT = 5000;

const server = net.createServer((socket) => {
  console.log(`Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`);
  
  socket.on('data', (data) => {
    const message = data.toString();
    console.log(`Mensagem recebida: ${message}`);
    socket.write(`ACK: ${message}`); // Confirmação
  });

  socket.on('end', () => {
    console.log('Conexão encerrada');
  });

  socket.on('error', (err) => {
    console.error(`Erro: ${err.message}`);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor TCP ouvindo em ${HOST}:${PORT}`);
});

server.on('error', (err) => {
  console.error(`Erro no servidor: ${err.message}`);
});