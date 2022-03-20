const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "unmute",
    description: "unmute un membre",
    permission: "MUTE_MEMBERS",
    options: [
        {
            name: "utilisateur",
            description: "Merci de mentionner un membre",
            type: "USER",
            required: true
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
    */

    run: async(client, interaction, args) => {
        const options = interactions.options._hoistedOptions;
        const utilisateur = options.find((e) => e.name === 'user')

        const embed = new MessageEmbed().setColor("GREEN")

        let MutedRole = interaction.guild.roles.cache.find((r) => r.name === "mute")
        
    }
}