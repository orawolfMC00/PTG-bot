const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, Message } = require('discord.js')

module.exports = {
    name: "ban",
    description: "ban un membre",
    options: [
        {
            name: "membre",
            description: "Mentionne le membre à bannir",
            type: "USER",
            required: true
        },
        {
            name: "raison",
            description: "Raison pour le bannissement",
            type: "STRING",
            required: false
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        if(!interaction.member.permissions.has("BAN_MEMBERS")){
            let permError = new MessageEmbed({
                title: "pas de perms",
                description: "test",
                color: "#FE0000"
            })
            return interaction.followUp({embeds: [permError]})
        }
        const membres = interaction.options.getMember("membre")
        const raison = interaction.options.getString("raison")

        if(membres.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({embeds: [
            new MessageEmbed({
                title: "erreur",
                description: "Tu ne peux pas exécuter cette commande a quelqu'un de supérieur à toi !",
                color: "#FE0000"
            })
        ]})
        membres.ban({ raison });
        
        interaction.followUp({embeds: [
            new MessageEmbed({
                title: "ban",
                description: `${membres.user.tag} est banni pour : ${raison}`
            })
        ]})
        
    }
}