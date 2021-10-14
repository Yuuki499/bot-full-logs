const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client({partials: ['GUILDS',
'GUILD_MESSAGE_REACTIONS',
'GUILD_MESSAGES',
'GUILD_INVITES',
'GUILD_VOICE_STATES',
'GUILD_MEMBERS',
'GUILD_PRESENCES'], intents: 32767});
const config = require("./config.json");

client.on('ready', () => {
    const cc =  require("./config.json")
	const prefix = cc.prefix
    const chalk = require('chalk')
    console.log(chalk.green.bold("Success!"))
    console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
    console.log(
        
      chalk.white("Watching"),
      chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
      chalk.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users," : "User,"}`),
      chalk.red(`${client.guilds.cache.size}`),
      chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
    )
   
    console.log("")
    console.log(chalk.red.bold("——————————[Status]——————————"))
    console.log(chalk.gray(`Node; ${process.version} em ${process.platform} ${process.arch}`))
    console.log(chalk.gray(`Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`))
    const logs = client.channels.cache.get("898291277265788959");

    logs.send({content: `Estou online`})
})
client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
  
   const args = message.content
       .trim().slice(config.prefix.length)
       .split(/ +/g);
   const command = args.shift().toLowerCase();
  
   try {
       const commandFile = require(`./commands/${command}.js`)
       commandFile.run(client, message, args);
   } catch (err) {



   console.error('Erro:' + err);
   }
})
client.on('channelCreate', (channel) => {
    const set = db.get(`logs_${channel.guild.id}`);
    if(set == null) return;

    const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
    let log = new Discord.MessageEmbed()
    .setTitle("```[ LOGS ] ```")
    .setDescription(" \n\n <:hashtagperigo:894551117466329128>  Canal criado: " + `\`${channel.name}\`//\`${channel.id}\``)
    .setColor("#0060EE")
    logs.send({embeds: [log]})
    
    
    });
    client.on('channelDelete', (channel) => {
        const set = db.get(`logs_${channel.guild.id}`);
        if(set == null) return;
        const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
        let log = new Discord.MessageEmbed()
        .setTitle("```[ LOGS ] ```")
        .setDescription(" \n\n <:hashtagperigo:894551117466329128>  Canal Deletado: " + `\`${channel.name}\`//\`${channel.id}\``)
        .setColor("#0060EE")
        logs.send({embeds: [log]})
        
        
        });
        client.on('channelUpdate', (oldChannel, newChannel) => {
            const set = db.get(`logs_${oldChannel.guild.id}`);
            if(set == null) return;
            const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
            let log = new Discord.MessageEmbed()
            .setTitle("```[ LOGS ] ```")
            .setDescription(" \n\n <:hashtagperigo:894551117466329128>  Canal Antes: " + `\`${oldChannel.name}\`// Position\`${oldChannel.rawPosition}\``+
            "\n\n <:hashtagperigo:894551117466329128>  Canal Depois: " + `\`${newChannel.name}\`//Position \`${newChannel.position}\``)
            .setColor("#0060EE")
            logs.send({embeds: [log]})
            
            
            });

            client.on('emojiCreate', (emoji) => {
                const set = db.get(`logs_${emoji.guild.id}`);
                if(set == null) return;
                const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
          
                let log = new Discord.MessageEmbed()
                .setTitle("```[ LOGS ] ```")
                .setDescription(`\n\n${emoji}`+ " Emoji adicionado: " + `\`${emoji.name}\`//\`${emoji.id}\``)
                .setImage(emoji.url)
                .setColor("#0060EE")
                logs.send({embeds: [log]})
                
                
                });
                client.on('emojiDelete', (emoji) => {
                    const set = db.get(`logs_${emoji.guild.id}`);
                    if(set == null) return;
                    const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                   
                    let log = new Discord.MessageEmbed()
                    .setTitle("```[ LOGS ] ```")
                    .setDescription(`\n\n <:lixo:894549463266390056> `+ " Emoji deletado: " + `\`${emoji.name}\`//\`${emoji.id}\``)
                    .setImage(emoji.url)
                    .setColor("#0060EE")
                    logs.send({embeds: [log]})
                    
                    
                    });
                    client.on('guildBanAdd', (guild, user) => {
                        const set = db.get(`logs_${guild.guild.id}`);
                        if(set == null) return;
                        const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
 
                        let log = new Discord.MessageEmbed()
                        .setTitle("```[ LOGS ] ```")
                        .setDescription(`\n\n <:policia:894546539052171264>  `+ " Membro banido: " + `\`${guild.user.username}\`//\`${guild.user.id}\` \n <:saida:894551220465848351>  Conta criada em: ${guild.user.createdAt}`)
                        .setImage(guild.user.avatarURL())
                        .setColor("#0060EE")
                        logs.send({embeds: [log]})
                        
                        
                        });
                        client.on('guildBanRemove', (guild, user) => {
                            const set = db.get(`logs_${guild.guild.id}`);
                            if(set == null) return;
                            const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
             
                            let log = new Discord.MessageEmbed()
                            .setTitle("```[ LOGS ] ```")
                            .setDescription(`\n\n <:policia:894546539052171264>  `+ " Membro desbanido: " + `\`${guild.user.username}\`//\`${guild.user.id}\` \n <:saida:894551220465848351>  Conta criada em: ${guild.user.createdAt} `)
                            .setThumbnail(guild.user.avatarURL())
                            .setColor("#0060EE")
                            logs.send({embeds: [log]})
                            
                            
                            });

                            client.on('messageUpdate', (oldMessage, newMessage ) => {
                                const set = db.get(`logs_${oldMessage.guild.id}`);
                                if(set == null) return;
                                if (oldMessage.author.bot) return;
                                if (oldMessage.channel.type == 'dm') return;
                                const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                                let log = new Discord.MessageEmbed()
                                .setTitle("```[ LOGS ] ```")
                                .setDescription(" \n\n <:hashtagperigo:894551117466329128>  Mensagem Antes: " + `\`\`\`${oldMessage}\`\`\``+
                                "\n\n <:hashtagperigo:894551117466329128>  Mensagem Depois: " + `\`\`\`${newMessage}\`\`\`
                                \n<:casa:894551321401765928> User: ${newMessage.author}
                               `)
                                .setColor("#0060EE")
                                logs.send({embeds: [log]})
                                
                                
                                });
                                client.on('messageDelete', (message) => {
                                    const set = db.get(`logs_${message.guild.id}`);
                                    if(set == null) return;
                                    if (message.author.bot) return;
                                    if (message.channel.type == 'dm') return;
                                    const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                                    let log = new Discord.MessageEmbed()
                                    .setTitle("```[ LOGS ] ```")
                                    .setDescription(" \n\n <:hashtagperigo:894551117466329128>  Mensagem: " + `\`\`\`${message.content}\`\`\``+
               
                                    `\n<:casa:894551321401765928> User: ${message.author}`)
                                    .setColor("#0060EE")
                                    logs.send({embeds: [log], attachments: [message.attachments.url]})
                                    
                                    
                                    });
                                    client.on('inviteCreate', (invite) => {
                                        const set = db.get(`logs_${invite.guild.id}`);
                                        if(set == null) return;
                                        const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                                        let log = new Discord.MessageEmbed()
                                        .setTitle("```[ LOGS ] ```")
                                        .setDescription(" \n\n <:hashtagperigo:894551117466329128>  Invite criado: " + `${invite}`+
                   
                                        `\n <:Info:882037503022993428> Infos sobre o invite: \`\`\`Limite de users: ${invite.maxUses} \nLimite de tempo: ${invite.maxAge}ms \`\`\`\n<:casa:894551321401765928> User: ${invite.inviter}`)
                                        .setColor("#0060EE")
                                        logs.send({embeds: [log]})
                                        
                                        
                                        });

                                        client.on('inviteDelete', (invite) => {
                                            const set = db.get(`logs_${invite.guild.id}`);
                                            if(set == null) return;
                                            const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                                            let log = new Discord.MessageEmbed()
                                            .setTitle("```[ LOGS ] ```")
                                            .setDescription(" \n\n <:hashtagperigo:894551117466329128>  Invite deletado: " + `${invite}`)
                                            .setColor("#0060EE")
                                            logs.send({embeds: [log]})
                                            
                                        });   
                                        
    

                                        client.on('messageReactionAdd', (messageReaction, user) => {
                                            const set = db.get(`logs_${messageReaction.message.guild.id}`);
                                            if(set == null) return;
                                            const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                                            let log = new Discord.MessageEmbed()
                                            .setTitle("```[ LOGS ] ```")
                                            .setDescription(" \n\n <:hashtagperigo:894551117466329128>  Reação adicionada: " + `${messageReaction.emoji} \n<:casa:894551321401765928> User: ${user}\n <:casa:894551321401765928> Ir para mensagem  [clique aqui](https://discord.com/channels/${messageReaction.message.guild.id}/${messageReaction.message.channel.id}/${messageReaction.message.id})`)

                                            .setThumbnail(messageReaction.emoji.url)
                                            .setImage(user.avatarURL())
                                            .setColor("#0060EE")
                                            logs.send({embeds: [log]})
                                            
                                        });    
                                        client.on('messageReactionRemove', (messageReaction, user) => {
                                            const set = db.get(`logs_${messageReaction.message.guild.id}`);
                                            if(set == null) return;
                                            const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                                            let log = new Discord.MessageEmbed()
                                            .setTitle("```[ LOGS ] ```")
                                            .setDescription(" \n\n <:hashtagperigo:894551117466329128>  Reação removida: " + `${messageReaction.emoji} \n<:casa:894551321401765928> User: ${user}  \n <:casa:894551321401765928> Ir para mensagem  [clique aqui](https://discord.com/channels/${messageReaction.message.guild.id}/${messageReaction.message.channel.id}/${messageReaction.message.id})`)

                                            .setThumbnail(messageReaction.emoji.url)
                                            .setImage(user.avatarURL())
                                            .setColor("#0060EE")
                                            logs.send({embeds: [log]})
                                            
                                        });    
                                        client.on('roleCreate', (role) => {
                                            const set = db.get(`logs_${role.guild.id}`);
                                            if(set == null) return;
                                      
                                            const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                                         
                                            let log = new Discord.MessageEmbed()
                                            .setTitle("```[ LOGS ] ```")
                                            .setDescription(`\n\n${role}`+ " Cargo criado: " + `\`${role.name}\`//\`${role.id}\``)
                                            
                                            .setColor("#0060EE")
                                            logs.send({embeds: [log]})
                                            
                                            
                                            });
                                            client.on('roleDelete', (role) => {
                                                const set = db.get(`logs_${role.guild.id}`);
                                                if(set == null) return;
                                                const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                                             
                                                let log = new Discord.MessageEmbed()
                                                .setTitle("```[ LOGS ] ```")
                                                .setDescription(`\n\n <:lixo:894549463266390056> `+ " Cargo deletado: " + `\`${role.name}\`//\`${role.id}\``)
                                                .setColor("#0060EE")
                                                logs.send({embeds: [log]})
                                                
                                                
                                                });
                                               
                                          
                                                        client.on('userUpdate', (oldUser, newUser, guild) => {
                                                            const set = db.get(`logs_${oldUser.client.guild.id}`);
                                                            if(set == null) return;
                                                            const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                                                         
                                                            let log = new Discord.MessageEmbed()
                                                            .setTitle("```[ LOGS ] ```")
                                                            .setDescription(`\n\n ${oldUser} `+ " Membro antes: " + `\`${oldUser.username}\`// Tag: \`${oldUser.discriminator
                                                        }\`
                                                            \n\n ${newUser} `+ " Membro depois: " + `\`${newUser.username}\`// Tag: \`${newUser.discriminator}\``)
                                                            .setImage(oldUser.avatarURL())
                                                            .setThumbnail(newUser.avatarURL())
                                                            .setColor("#0060EE")
                                                            logs.send({embeds: [log]})
                                                            
                                                            
                                                            });
                                                            client.on('voiceStateUpdate', (oldState, newState) => {
                                                                const set = db.get(`logs_${oldState.guild.id}`);
                                                                if(set == null) return;
                                                                const logs = new Discord.WebhookClient({ id: config.Id_logs, token: config.Web_token });
                                                             
                                                                let log = new Discord.MessageEmbed()
                                                                .setTitle("```[ LOGS ] ```")
                                                                .setDescription(`\n\n ${oldState.member} `+ " Membro antes: " + `\` Mutado geral: ${oldState.selfDeaf}\`// \` Mutado: ${oldState.selfMute
                                                           }\`// \` Vídeo: ${oldState.selfVideo}\`//\`Mutado geral pela guild: ${oldState.serverDeaf}\`//\`Mutado pela guild:  ${oldState.serverMute}\` // \`call:\` ${oldState.channel}
                                                                \n\n ${newState.member} `+ " Membro depois: " + `\` Mutado geral: ${newState.selfDeaf}\`//\`Mutado: ${newState.selfMute
                                                            }\`//\` Vídeo: ${newState.selfVideo}\`//\`Mutado geral pela guild: ${newState.serverDeaf}\`//\`Mutado pela guild: ${newState.serverMute}\` // \`call:\`${newState.channel}`)
                                                          
                                                
                                                                .setColor("#0060EE")
                                                                logs.send({embeds: [log]})
                                                                
                                                                
                                                                });
    

    

client.login(config.Token)
