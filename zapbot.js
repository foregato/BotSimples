const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(), // Isso cria uma pasta 'remote-auth' e salva sua senha lá
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Necessário para rodar em servidores Linux
    }
});

// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on('message', async msg => {

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(1000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá! '+ name.split(" ")[0] + ' Sou o assistente virtual. Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:\n\n1 - Espaço Imperial\n2 - Dunlop Eventos\n3 - chac Palm. Real\n4 - Datas Disponíveis\n5 - Outras perguntas'); //Primeira mensagem de texto
        await delay(1000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 5 segundos
    
        
    }




    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(1000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, '*LOCALIZAÇÃO ESPAÇO IMPERIAL* \n\nRua Natale Geraldo 290 Jd. Uruguai \n\nLink no mapa: \nhttps://maps.google.com/?q=-22.959072,-47.141411 \n\nEspaço imperial Sábado ou Domingo das 9:00 da mãnha até as 21:00 da noite R$550,00. \nPodendo estender até 00:00 por R$100,00 \n\nDe Segunda a Quinta R$300,00 \nSexta-Feira R$350,00 (exceto feriados). \n\nDurante a semana dependendo da quantidade de pessoas o valor poderá ser reduzido.');


        await delay(1000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, 'Link para vizualização das fotos: https://drive.google.com/drive/folders/1bPYLpFpYjXUmfCFXQrXS_-L_UxF7NhAW?usp=sharing');


    }

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, '*LOCALIZAÇÃO DUNLOP EVENTOS*.\n\nRua Dr Carlos Macia 388 - Satélite Iris 1.\n\nlink do mapa https://goo.gl/maps/FjAeUzzmXjTN45At9 \n\nDunlop Sábado ou Domingo das 9:00 da mãnha até as 21:00 da noite R$600.\nPodendo estender até a 00:00 por R$100. \n\nDe Segunda a Quinta R$350. \nSexta-Feira R$400 (exceto feriados).\n\nDurante a semana dependendo da quantidade de pessoas o valor poderá ser reduzido.');

        await delay(1000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, 'Link para vizualização das fotos: https://drive.google.com/drive/folders/1thc7puKD1Q19K62c80sXjT2jglLuUha4?usp=sharing ');
    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, '*LOCALIZAÇÃO PALMEIRA REAL* \n\nRua Dezesseis, 401, Chácaras Planalto Recreio, Monte Mor \nCep:13194-318 \n\nLink no mapa: https://maps.app.goo.gl/xYQ3WxYJj1wmd4Sa7?g_st=com.google.maps.preview.copy \n\nChácara Palmeira Real Sábado ou Domingo das 8:00 da manhã até as 20:00 da noite R$650,00 \nCaso seja os dois dias R$1200,00.');
        
        await delay(1000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, 'Link para vizualização das fotos: https://drive.google.com/drive/folders/1--Epur82NkhY0wdU9TX1sTkKp1u1Pltb?usp=sharing');

    }

    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, 'Aguarde o retorno da atendente para saber sobre reservas e datas disponíveis.');



    }

    if (msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, 'Olá, tudo bem? \nQual seria a sua dúvida?');


    }








});
