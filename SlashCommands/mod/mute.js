const { Client, CommandInteraction, MessageEmbed, Message, User} = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "mute",
    description: "Mute un membre grâce à sa mention",
    options: [
        {
            name: "utilisateur",
            description: "Merci de mentionner un membre",
            type: 6,
            required: true,
        },
        {
            name: "temps",
            description: "Merci d'indiquer une raison",
            type: 4,
            required: true,
        },
        {
            name: "raison",
            description: "Merci d'indiquer une raison",
            type: 3,
            required: false,
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const options = interaction.options._hoistedOptions;

        const utilisateur = options.find((e) => e.name === "utilisateur")
        const temps = options.find((e) => e.name === "temps")
        const raison = options.find((e) => e.name === "raison")?.value || `Mute par ${interaction.member.displayName}`

        const embed = new MessageEmbed().setColor("GREEN")

        let MutedRole = interaction.guild.roles.cache.find(r => r.name === "mute")

        if(!MutedRole) {
            const role = await interaction.guild.roles.create({name: "mute"})

            interaction.guild.channels.cache.map(x => {
                if (!x.isThread()) {
                    x.permissionOverwrites.edit(role, {
                        MANAGE_WEBHOOKS: false,
                        SEND_MESSAGES: false,
                        USE_PUBLIC_THREADS: false,
                        USE_PRIVATE_THREADS: false,
                        ADD_REACTIONS: false,
                        ATTACH_FILES: false,
                        SEND_TTS_MESSAGES: false,
                        MANAGE_THREADS: false,
                        MANAGE_MESSAGES: false,
                        MENTION_EVERYONE: false,
                        CONNECT: false,
                        SPEAK: false,
                    }, raison)
                }

                MutedRole = role
            });
        }
        if (utilisateur.member.roles.cache.find((e) => e.name === "mute")) {
            embed.setColor("RED").setDescription(`:x: Ce membre est déjà mute`)
            return await interaction.followUp({embeds: [embed]})
        }

        await utilisateur.member.roles.add(MutedRole)
        embed.setDescription(`:white_check_mark: ${utilisateur.member.toString()} ***à été mute avec succès***`)
        await interaction.followUp({embeds: [embed]})

        if(temps) {
            setTimeout(async () => {
                await utilisateur.member.roles.remove(MutedRole)
            }, temps.value * 60 * 1000)
        }
    }
}