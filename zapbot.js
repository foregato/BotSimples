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

// Armazena os contatos que solicitaram atendimento humano
const atendimentoHumano = new Set();

client.on('message', async msg => {
    // Responde apenas conversas individuais
    if (!msg.from.endsWith('@c.us')) return;

    // Se o usuário já solicitou atendimento humano, o bot não responde mais
    if (atendimentoHumano.has(msg.from)) {
        return;
    }

    const chat = await msg.getChat();
    const name = msg._data.notifyName || "cliente";
    const firstName = name.split(" ")[0];

    // Menu Principal
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola|inicio|Inicio|começar|Começar)/i)) {
        await delay(1000);
        await chat.sendStateTyping();
        await delay(1500);
        
        await client.sendMessage(msg.from, 
            `Olá! ${firstName} 👋\n\n` +
            `Sou o assistente virtual. Como posso ajudá-lo hoje?\n\n` +
            `Digite uma opção:\n\n` +
            `*1* - Espaço Imperial\n` +
            `*2* - Dunlop Eventos\n` +
            `*3* - Chác. Palmeira Real\n` +
            `*4* - Datas Disponíveis\n` +
            `*5* - Outras perguntas\n` +
            `*6* - Falar com atendente humano\n\n` +
            `_Digite *0* para voltar ao menu a qualquer momento_`
        );
        return;
    }

    // Opção 0 - Voltar ao Menu
    if (msg.body === '0') {
        await chat.sendStateTyping();
        await delay(1000);
        
        await client.sendMessage(msg.from, 
            `📋 *MENU PRINCIPAL*\n\n` +
            `Digite uma opção:\n\n` +
            `*1* - Espaço Imperial\n` +
            `*2* - Dunlop Eventos\n` +
            `*3* - Chác. Palmeira Real\n` +
            `*4* - Datas Disponíveis\n` +
            `*5* - Outras perguntas\n` +
            `*6* - Falar com atendente humano`
        );
        return;
    }

    // Opção 1 - Espaço Imperial
    if (msg.body === '1') {
        await chat.sendStateTyping();
        await delay(1500);
        
        await client.sendMessage(msg.from, 
            `🏛️ *ESPAÇO IMPERIAL*\n\n` +
            `📍 *Localização:*\n` +
            `Rua Natale Geraldo 290\n` +
            `Jardim Uruguai\n\n` +
            `💰 *Valores:*\n` +
            `• Segunda a Quinta: R$ 300,00\n` +
            `• Sexta-feira: R$ 350,00\n` +
            `• Sábado/Domingo: R$ 550,00\n` +
            `  _(Horário: 9h às 21h)_\n\n` +
            `_Digite *0* para voltar ao menu_\n` +
            `_Digite *6* para falar com atendente_`
        );
        return;
    }

    // Opção 2 - Dunlop Eventos
    if (msg.body === '2') {
        await chat.sendStateTyping();
        await delay(1500);
        
        await client.sendMessage(msg.from, 
            `🎉 *DUNLOP EVENTOS*\n\n` +
            `📍 *Localização:*\n` +
            `Rua Dr Carlos Macia 388\n` +
            `Satélite Iris 1\n\n` +
            `💰 *Valores:*\n` +
            `• Segunda a Quinta: R$ 350,00\n` +
            `• Sexta-feira: R$ 400,00\n` +
            `• Sábado/Domingo: R$ 600,00\n\n` +
            `_Digite *0* para voltar ao menu_\n` +
            `_Digite *6* para falar com atendente_`
        );
        return;
    }

    // Opção 3 - Palmeira Real
    if (msg.body === '3') {
        await chat.sendStateTyping();
        await delay(1500);
        
        await client.sendMessage(msg.from, 
            `🌴 *CHÁCARA PALMEIRA REAL*\n\n` +
            `📍 *Localização:*\n` +
            `Rua Dezesseis, 401\n` +
            `Monte Mor\n\n` +
            `💰 *Valores:*\n` +
            `• Sábado OU Domingo: R$ 650,00\n` +
            `• Dois dias (Sáb + Dom): R$ 1.200,00\n\n` +
            `_Digite *0* para voltar ao menu_\n` +
            `_Digite *6* para falar com atendente_`
        );
        return;
    }

    // Opção 4 - Datas Disponíveis
    if (msg.body === '4') {
        await chat.sendStateTyping();
        await delay(1500);
        
        await client.sendMessage(msg.from, 
            `📅 *CONSULTAR DISPONIBILIDADE*\n\n` +
            `Para verificar datas disponíveis e fazer sua reserva, ` +
            `você será direcionado para nossa atendente.\n\n` +
            `Aguarde o retorno! Em breve entraremos em contato. 😊\n\n` +
            `_Digite *0* para voltar ao menu_`
        );
        return;
    }

    // Opção 5 - Outras Perguntas
    if (msg.body === '5') {
        await chat.sendStateTyping();
        await delay(1000);
        
        await client.sendMessage(msg.from, 
            `❓ *OUTRAS PERGUNTAS*\n\n` +
            `Fique à vontade para fazer sua pergunta!\n` +
            `Vou fazer o possível para ajudá-lo. 😊\n\n` +
            `Se preferir falar diretamente com nossa equipe, ` +
            `digite *6* para atendimento humano.\n\n` +
            `_Digite *0* para voltar ao menu_`
        );
        return;
    }

    // Opção 6 - Falar com Atendente Humano
    if (msg.body === '6') {
        await chat.sendStateTyping();
        await delay(1500);
        
        // Adiciona o contato à lista de atendimento humano
        atendimentoHumano.add(msg.from);
        
        await client.sendMessage(msg.from, 
            `👤 *ATENDIMENTO HUMANO SOLICITADO*\n\n` +
            `${firstName}, você será atendido(a) por um membro ` +
            `da nossa equipe em breve.\n\n` +
            `Aguarde, logo alguém estará com você! 😊\n\n` +
            `_O atendimento automático foi encerrado para este chat._`
        );
        
        console.log(`[${new Date().toLocaleString()}] Atendimento humano solicitado por: ${msg.from}`);
        return;
    }

    // Mensagens não reconhecidas (apenas se não estiver em atendimento humano)
    if (!msg.body.match(/^[0-6]$/)) {
        await delay(800);
        await client.sendMessage(msg.from, 
            `Desculpe, não entendi sua mensagem. 😅\n\n` +
            `Digite *0* para ver o menu principal\n` +
            `ou *6* para falar com atendente.`
        );
    }
});

// Função para remover um contato da lista de atendimento humano (caso necessário)
// Pode ser chamada manualmente ou através de algum comando administrativo
function liberarAtendimentoAutomatico(numeroContato) {
    atendimentoHumano.delete(numeroContato);
    console.log(`[${new Date().toLocaleString()}] Atendimento automático liberado para: ${numeroContato}`);
}

// Exporta a função caso precise usar em outro módulo
module.exports = { liberarAtendimentoAutomatico };
