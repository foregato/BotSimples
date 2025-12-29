const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Configuração com LocalAuth para não pedir QR Code toda vez
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log('Escaneie o QR Code acima para conectar:');
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado e pronto para uso.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {
    // Responde apenas conversas individuais
    if (!msg.from.endsWith('@c.us')) return;

    const chat = await msg.getChat();

    // Menu Principal
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i)) {
        await delay(1000);
        await chat.sendStateTyping();
        
        // Ajuste para evitar erro de contato: pega nome direto da mensagem
        const name = msg._data.notifyName || "cliente";
        const firstName = name.split(" ")[0];
        
        await client.sendMessage(msg.from, `Olá! ${firstName}. Sou o assistente virtual. Como posso ajudá-lo hoje? Digite uma opção:\n\n1 - Espaço Imperial\n2 - Dunlop Eventos\n3 - chac Palm. Real\n4 - Datas Disponíveis\n5 - Outras perguntas`);
    }

    // Opções de 1 a 5
    if (msg.body === '1') {
        await chat.sendStateTyping();
        await client.sendMessage(msg.from, '*LOCALIZAÇÃO ESPAÇO IMPERIAL*\nRua Natale Geraldo 290 Jd. Uruguai\n\nValores:\nSeg a Qui: R$300\nSex: R$350\nSab/Dom: R$550 (9h às 21h)');
    } else if (msg.body === '2') {
        await chat.sendStateTyping();
        await client.sendMessage(msg.from, '*LOCALIZAÇÃO DUNLOP EVENTOS*\nRua Dr Carlos Macia 388 - Satélite Iris 1\n\nValores:\nSeg a Qui: R$350\nSex: R$400\nSab/Dom: R$600');
    } else if (msg.body === '3') {
        await chat.sendStateTyping();
        await client.sendMessage(msg.from, '*LOCALIZAÇÃO PALMEIRA REAL*\nRua Dezesseis, 401, Monte Mor\n\nValores:\nSábado ou Domingo: R$650\nDois dias: R$1200');
    } else if (msg.body === '4') {
        await client.sendMessage(msg.from, 'Aguarde o retorno da atendente para saber sobre reservas e datas disponíveis.');
    } else if (msg.body === '5') {
        await client.sendMessage(msg.from, 'Olá! Qual seria a sua dúvida?');
    }
});
