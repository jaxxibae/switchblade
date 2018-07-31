const { CommandStructures, SwitchbladeEmbed } = require('../../')
const { Command, CommandParameters, StringParameter, NumberParameter } = CommandStructures
const Scrambo = require('scrambo')
const cubeTypes = ['222', '333', '444', '555', '666', '777', 'clock', 'minx', 'pyram', 'sq1', 'skewb']

module.exports = class Scramble extends Command {
  constructor (client) {
    super(client)
    this.name = 'scramble'
    this.aliases = ['scrambo']

    this.parameters = new CommandParameters(this,
      new NumberParameter({required: false}),
      new StringParameter({full: false, required: false, whitelist: cubeTypes,
        missingError: ({ t, prefix }) => {
          return {
            title: t('commands:scramble.invalidType'),
            description: [
              `**${t('commons:usage')}:** \`${prefix}${this.name} ${t('commands:scramble.commandUsage')}\``,
              '',
              `__**${t('commands:scramble.availableTypes')}:**__`,
              `**${cubeTypes.map(l => `\`${l}\``).join(', ')}**`
            ].join('\n')
          }
        }}),
      new StringParameter({full: false, required: false})
    )

  }

  async run ({ t, channel, author }, amount, type, seed) {
    const embed = new SwitchbladeEmbed(author)
    const scrambo = new Scrambo()
    if (type) scrambo.type(type)
    if (seed) scrambo.seed(seed)
    const scrambles = scrambo.get(amount)
    embed
      .setTitle(t('commands:scramble.hereIsYourScramble', {count: scrambles.length}))
      .setDescription(scrambles.map(s => ' `' + s + '`').join('\n\n'))
    channel.send(embed)
  }
}
