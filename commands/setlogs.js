const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {


    run: async(client, message, args) => {

   
        let author = message.author;
 

   


        if(args[0] == 'on') {
            db.set(`logs_${message.guild.id}`, 1);
    
        
           return  message.reply(`Sistema de logs on!`);
    };
    if(args[0] == 'off') {
        db.delete(`logs_${message.guild.id}`);

    
       return message.reply(`Sistema de logs OFF!`);

};
message.reply("Caso queira ativar use setlogs on e caso queira desativar use setlogs off")

        
    }
}