const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "uptime",
    description: "Pour voir quand le bot s'est connecté",
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setColor("WHITE")
            .setDescription(`Je me suis connecté <t:${(client.readyTimestamp / 1000).toFixed()}:R> !`);
        
        interaction.followUp({ embeds: [embed] });
    }
}