const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js')


module.exports = {
    name: "help",
    description: "affiche la commande help",
    type: "CHAT_INPUT",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {
        const embed = new MessageEmbed()
        .setTitle("Help - PTG")
        .addField(":mag_right: ___Informations___ :", "`help`, `ping`, `serverinfo`, `uptime`")
        .addField(":shield: ___Modération___ :", "`ban`, `kick`, `mute`, `unban`, `unmute`")
        interaction.followUp({embeds: [embed]})
    }
}