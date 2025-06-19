const net = require('net');
const readline = require('readline');

const HOST = 'localhost';
const PORT = 5000;

const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect(PORT, HOST, () => {
  console.log(`Conectado ao servidor ${HOST}:${PORT}`);
  promptUser();
});

client.on('data', (data) => {
  console.log(`Resposta do servidor: ${data}`);
  promptUser();
});

client.on('close', () => {
  console.log('Conexão fechada');
  rl.close();
});

client.on('error', (err) => {
  console.error(`Erro: ${err.message}`);
});

function promptUser() {
  rl.question('Digite sua mensagem (ou "exit" para sair): ', (message) => {
    if (message.toLowerCase() === 'exit') {
      client.end();
      return;
    }
    client.write(message);
  });
}