const client = require("../index");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    if(message.mentions.has(client.user)){
            let aideEmbed = new MessageEmbed()
            .setTitle("Bienvenue")
            .setDescription(`Bonjour / bonsoir ! Depuis le 19.03.2022, j'utilise désormais uniquement les commands slashs ! pour voir les commandes disponibles, fais /help !`)
            .setColor("WHITE")
            .setFooter({text: `Mentionné par ${message.author.username}`})
            await message.reply({embeds: [aideEmbed]})
        }
    
    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
