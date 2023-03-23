const mapSongToModel = ({
  // eslint-disable-next-line camelcase
  song_id,
  title,
  performer
}) => ({
  // eslint-disable-next-line camelcase
  id: song_id,
  title,
  performer
})

module.exports = { mapSongToModel }
