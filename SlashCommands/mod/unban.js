const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "unban",
    description: "Déban un membre",
    options: [
        {
            name: "userid",
            description: "Donne l'id du membre à unban",
            type: "STRING",
            required: true
        }
    
    ],
/**
 * 
 * @param {Client} bot 
 * @param {CommandInteraction} interaction 
 * @param {String[]} args 
 */
    run: async (bot, interaction, args) => {
        const userid = interaction.options.getString("userid")
        
        interaction.guild.members.unban(userid).then((user) => {
            interaction.followUp({embeds: [
                new MessageEmbed({
                    title: "Unban",
                    description: `${user.tag} à bien été unban`,
                    color: "GREEN"
                })
            ]})
        }).catch(() => {
            interaction.followUp({embeds: [
                new MessageEmbed({
                    title: "Erreur",
                    description: "Merci de spécifier un identifiant d'un membre valide",
                    color: "GREEN"
                })
            ]})
        })
    }
}