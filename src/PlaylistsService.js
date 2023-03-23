const { Pool } = require('pg')
const { mapSongToModel } = require('./utils')

class PlaylistsService {
  constructor () {
    this._pool = new Pool()
  }

  async getPlaylists (playlistId) {
    const query = {
      text: `SELECT playlist_songs.*, songs.*, playlists.* 
        FROM playlist_songs
        LEFT JOIN songs ON songs.id = playlist_songs.song_id
        LEFT JOIN playlists ON playlists.id = playlist_songs.playlist_id
        WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)
    const songs = result.rows.map(mapSongToModel)

    const data = {
      playlist: {
        id: result.rows[0].id,
        name: result.rows[0].name
      }
    }
    data.playlist.songs = songs
    return data
  }
}

module.exports = PlaylistsService
