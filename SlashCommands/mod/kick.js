const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "kick",
    description: "Kick un membre",
    options: [
        {
            name: "membre",
            description: "Mentionne le membre à bannir",
            type: "USER",
            required: true
        },
        {
            name: "raison",
            description: "Raison pour l'expulsion",
            type: "STRING",
            required: false
        }
    ],
    /**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (bot, interaction, args) => {
        if(!interaction.member.permissions.has("KICK_MEMBERS")){
            const PermError = new MessageEmbed({
                title: "test",
                description: "pas les perms",
                color: "#fe0000"
            })
            return interaction.followUp({embeds: [PermError]})
        }

        const membres = interaction.options.getMember("membre")
        const raison = interaction.options.getString("raison") || "Aucune raison donnée"

        if(membres.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({embeds : [
            new MessageEmbed({
                title: "Erreur",
                description: "Tu ne peux pas expulser un membre étant plus haut que toi !",
                color: "#fe0000"
            })
        ]})

        membres.kick({ raison })

        interaction.followUp({embeds: [
            new MessageEmbed({
                title: "succès",
                description: `${membres.user.tag} à été expulsé pour la raison : ${raison}`
            })
        ]})
    }
}