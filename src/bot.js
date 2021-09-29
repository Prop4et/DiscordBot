require('dotenv').config(); //loads all the env variables inside .env w/o overriding system env

const { Client, GuildMember } = require('discord.js'); //u can deconstruct the object, there's client, there's message, there are a lot of thing
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] }); //client object instance of the client class of discord

const PREFIX = "-";
client.on('ready', () => {
    console.log(`${client.user.username} logged`);
    /*
    client.channels.fetch('892702132896169998')
  .then(channel => console.log(channel.name))
  .catch(console.error);*/
});
/*controlla se l'utente che fa play è effettivamente in un canale vocale
se il bot è già connesso controlla che l'utente sia nello stesso canale del bot
se sì ritorna il voiceChannelManager per quel canale, se no ritorna null*/
function userInVoice(message){
    const userId = message.author.id;
    const channelMgm = message.guild.members.cache.get(userId).voice.channel;//get the voice channel manager for the user 
    if(channelMgm){
        var botChannelMgm = message.guild.members.cache.get(client.user.id).voice.channel;
        if(botChannelMgm){
            if(botChannelMgm.id != channelMgm.id)  return null;
            else    console.log("errore");
        }
    }
    return channelMgm;
}

function connectToVoice(channelMgm){
    /*devo fare le procedure di connessione daje*/
    
}

function readCmd(message, cmd){
    switch(cmd){
        case 'play':
            /*doplaythings
            se il bot non è connesso ad un canale lo connette al canale
            aggiunge un elemento in coda, se la coda è vuota estrae l'elemento e lo riproduce*/
            var channelMgm = userInVoice(message);
            if(!channelMgm) return; //l'utente non è nel canale
            if(!message.guild.members.cache.get(client.user.id).voice.channel){//il bot non è connesso
                /*connect bot to the voice channel*/
                connectToVoice(channelMgm);
                
            }
          
            break;
        case 'skip':
            /*skippa la canzone corrente e riproduce la successiva in coda*/
            break;
        case 'jump':
            /*salta al brano in posizione n in coda, se la posizione n ha un brano, se no comunica il salto errato*/
            break;
        case 'pause':
            /*mette in pausa la riproduzione corrente*/
            break;
        case 'resume':
            /*se la riproduzione è stata messa in pausa riprende la riproduzione*/
            break;
        case 'stop':
            /*stoppa la riproduzione pulendo la coda*/
            break;
        case 'disconnect':
            /*se il bot è connesso al canale in cui c'è l'utente che fa disconnect allora lo disconnette*/
            break;
        case 'help':
            /*mostra l'helper*/
            break;
        default:
            message.reply("That's an invalid command sadge");    
    }
}
client.on('messageCreate', (message)=>{
    if(message.author.bot)
        return;
    if(!message.content.startsWith(PREFIX)) return;
    const [cmd, ...args] = message.content//... is a spreader operator, 
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
    readCmd(message, cmd);
});

client.login(process.env.TOKEN);