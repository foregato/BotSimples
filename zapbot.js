const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

// Configuração do Cliente
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

const delay = ms => new Promise(res => setTimeout(res, ms));
const atendimentoHumano = new Set();

// --- FUNÇÃO PARA ENVIAR FOTOS DE UMA PASTA ---
async function enviarFotosDaPasta(chatId, nomeDaPasta) {
    const pastaPath = path.join(__dirname, 'fotos', nomeDaPasta);
    
    if (!fs.existsSync(pastaPath)) {
        console.log(`Erro: Pasta ${nomeDaPasta} não encontrada.`);
        return;
    }

    const arquivos = fs.readdirSync(pastaPath).filter(arquivo => 
        arquivo.match(/\.(jpg|jpeg|png|gif)$/i)
    );

    const totalFotos = arquivos.length;

    if (totalFotos === 0) {
        await client.sendMessage(chatId, "No momento não temos fotos disponíveis para este local. 😕\n\n_Digite *0* para voltar ao menu._");
        return;
    }

    await client.sendMessage(chatId, `📸 Preparando *${totalFotos}* foto${totalFotos > 1 ? 's' : ''} do local...\n\n_Aguarde um momento, por favor._`);
    await delay(1000);

    for (const arquivo of arquivos) {
        try {
            const media = MessageMedia.fromFilePath(path.join(pastaPath, arquivo));
            await client.sendMessage(chatId, media);
            await delay(1500); 
        } catch (err) {
            console.log(`Erro ao enviar ${arquivo}:`, err);
        }
    }
    
    await delay(800);
    await client.sendMessage(chatId, 
        `✅ Essas foram as fotos de *${nomeDaPasta}*!\n\n` +
        `Gostou? Posso te ajudar com mais alguma coisa?\n\n` +
        `_Digite *0* para voltar ao menu ou *6* para falar com atendente._`
    );
}

// --- FUNÇÃO DO MENU PRINCIPAL ---
async function enviarMenuPrincipal(chatId, firstName) {
    await client.sendMessage(chatId, 
        `📋 *MENU PRINCIPAL*\n\n` +
        `Olá, ${firstName}! 👋\n\n` +
        `Como posso ajudá-lo hoje? Escolha uma opção:\n\n` +
        `*1* - 🏛️ Espaço Imperial\n` +
        `*2* - 🎉 Dunlop Eventos\n` +
        `*3* - 🌴 Chác. Palmeira Real\n` +
        `*4* - 📅 Consultar Datas Disponíveis\n` +
        `*5* - ❓ Outras Perguntas\n` +
        `*6* - 👤 Falar com Atendente Humano\n\n` +
        `_Digite o número da opção desejada._`
    );
}

// --- EVENTOS DO CLIENTE ---

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log('📱 Escaneie o QR Code acima para conectar:');
});

client.on('ready', () => {
    console.log('✅ Tudo certo! WhatsApp conectado e pronto para uso.');
});

client.on('message', async msg => {
    // CORREÇÃO: Ignora mensagens de Status para não postar o menu lá
    if (msg.from === 'status@broadcast') return;

    // Comando para religar o bot manualmente
    if (msg.body === '!voltar') {
        atendimentoHumano.delete(msg.from);
        await client.sendMessage(msg.from, `🤖 *Atendimento Automático Reativado*`);
        return;
    }

    // Se estiver em atendimento humano, o bot não responde
    if (atendimentoHumano.has(msg.from)) return;

    const chat = await msg.getChat();
    const name = msg._data.notifyName || "cliente";
    const firstName = name.split(" ")[0];

    // Gatilhos do Menu
    if (msg.body.match(/(menu|dia|tarde|noite|oi|olá|ola|inicio|começar)/i)) {
        await chat.sendStateTyping();
        await delay(1000);
        await enviarMenuPrincipal(msg.from, firstName);
        return;
    }

    // Opção 0 - Menu
    if (msg.body === '0') {
        await enviarMenuPrincipal(msg.from, firstName);
        return;
    }

    // Opção 1 - Imperial
    if (msg.body === '1') {
        await client.sendMessage(msg.from, 
            `🏛️ *ESPAÇO IMPERIAL*\n\n` +
            `📍 *Localização:*\nRua Natale Geraldo, 290\nJardim Uruguai - Campinas/SP\n\n` +
            `🗺️ *Google Maps:*\n https://maps.google.com/?q=-22.959072,-47.141411 \n\n\n\n` +
            `💰 *Valores:*\n• Segunda a Quinta: R$ 300,00\n• Sexta-feira: R$ 350,00\n• Sábado e Domingo: R$ 550,00\n\n` +
            `_Enviando fotos do local..._`
        );
        await enviarFotosDaPasta(msg.from, 'Imperial');
        return;
    }

    // Opção 2 - Dunlop
    if (msg.body === '2') {
        await client.sendMessage(msg.from, 
            `🎉 *DUNLOP EVENTOS*\n\n` +
            `📍 *Localização:*\nRua Dr. Carlos Macia, 388\nSatélite Iris 1 - Campinas/SP\n\n` +
            `🗺️ *Google Maps:*\n https://goo.gl/maps/FjAeUzzmXjTN45At9 \n\n\n\n` +
            `💰 *Valores:*\n• Segunda a Quinta: R$ 350,00\n• Sexta-feira: R$ 400,00\n• Sábado e Domingo: R$ 600,00\n\n` +
            `_Enviando fotos do local..._`
        );
        await enviarFotosDaPasta(msg.from, 'Dunlop');
        return;
    }

    // Opção 3 - Palmeira
    if (msg.body === '3') {
        await client.sendMessage(msg.from, 
            `🌴 *CHÁCARA PALMEIRA REAL*\n\n` +
            `📍 *Localização:*\nRua Dezesseis, 401\nMonte Mor/SP\n\n` +
            `🗺️ *Google Maps:*\n https://maps.app.goo.gl/xYQ3WxYJj1wmd4Sa7?g_st=com.google.maps.preview.copy \n\n\n\n` +
            `💰 *Valores:*\n• Sábado OU Domingo: R$ 650,00\n• Sábado + Domingo: R$ 1.200,00\n\n` +
            `_Enviando fotos do local..._`
        );
        await enviarFotosDaPasta(msg.from, 'Palmeira');
        return;
    }

    // Opções 4, 5 e 6 - Atendimento Humano
    if (msg.body === '4' || msg.body === '5' || msg.body === '6') {
        atendimentoHumano.add(msg.from);
        await client.sendMessage(msg.from, 
            `⏳ *Aguarde um momento...*\n\n` +
            `${firstName}, vou te conectar com nossa equipe agora mesmo para te ajudar.\n\n` +
            `_O atendimento automático foi pausado. Digite !voltar quando terminar._`
        );
        return;
    }

    // Resposta para opções inválidas
    if (!msg.body.match(/^[0-6]$/) && msg.body.length < 3) {
        await client.sendMessage(msg.from, `Ops, não entendi. 😅\nDigite *0* para ver o menu.`);
    }
});

client.initialize();    
