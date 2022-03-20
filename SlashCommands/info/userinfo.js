const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "userinfo",
    description: "statistiques d'un utilisateur",
    type: "CHAT_INPUT",
    options: [
        {
            name: "membre",
            description: "Mentionne un membre pour voir ces stats",
            type: "USER",
            required: false
        }
    ],
	run: async (client, interaction) => {
        const membre = interaction.options.getMember("membre") || interaction.member;
        const embed = new MessageEmbed()

        .setTitle(`Statistiques de ${membre}`)
        .addField("Id du mec", `${membre.id}`)
        return interaction.followUp({ embeds: [embed] })
	},
};